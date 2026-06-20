//import useSWR from "swr";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CATEGORIES, SPECIAL_CELL_TYPES } from "@/constants/gameConstants";
import {
  checkConsecutiveNumbers,
  createTilebag,
  drawTilesFromTilebag,
  splitBrickName,
  isPlayedTile,
} from "@/utils/gameLogic";
import Board from "@/components/Board";
import Rack from "@/components/Rack";
import JokerLetter from "@/components/JokerLetter";
import GameNavBar from "@/components/GameNavBar";
import next from "next";

export default function HomePage() {
  const [wordSet, setWordSet] = useState(null);
  const [tilebag, setTilebag] = useState(createTilebag);
  const [cells, setCells] = useState(CATEGORIES);
  const [chosenTile, setChosenTile] = useState(null);
  const [rackTiles, setRackTiles] = useState([]);
  const [currentMove, setCurrentMove] = useState([]);
  const [chosenJokerPosition, setChosenJokerPosition] = useState(null);
  const [isFirstWord, setIsFirstWord] = useState(true);

  //for later, when data is needed
  //const { data: gameData, isLoading, error } = useSWR("/api/games");

  useEffect(() => {
    async function loadWords() {
      try {
        const response = await fetch("/words.json");
        if (!response.ok) {
          throw new Error(`Failed to load words: ${response.status}`);
        }

        const wordArray = await response.json();

        const set = new Set(wordArray.map((entry) => entry.word));
        setWordSet(set);
      } catch (error) {
        console.error(error);
      }
    }

    loadWords();
  }, []);

  useEffect(() => {
    const { drawnTiles, currentTilebag } = drawTilesFromTilebag(
      undefined,
      tilebag
    );
    setRackTiles(drawnTiles);
    setTilebag(currentTilebag);
  }, []);

  function handleTileClick(tile, index) {
    index === chosenTile?.index
      ? setChosenTile(null)
      : setChosenTile({ ...tile, index });
  }

  function handleCellClick(row, column) {
    const cellIndex = `${row}-${column}`;
    const isTile = cellIndex in cells && typeof cells[cellIndex] === "object";

    if (isPlayedTile(cellIndex, cells)) return;

    if (!chosenTile && !isTile) return;

    if (isTile) {
      cellIndex === chosenTile
        ? setChosenTile(null)
        : setChosenTile(`${row}-${column}`);
      return;
    }

    if (chosenTile.isPlayed) return;

    const isChosenTileFromBoard = typeof chosenTile === "string";

    if (isChosenTileFromBoard) {
      const currentCells = { ...cells };
      currentCells[cellIndex] = currentCells[chosenTile];
      delete currentCells[chosenTile];

      if (chosenTile in CATEGORIES) {
        currentCells[chosenTile] = CATEGORIES[chosenTile];
      }

      setCells(currentCells);
      setCurrentMove(
        currentMove.map((move) => (move === chosenTile ? cellIndex : move))
      );
      setChosenTile(null);

      return;
    }

    if (chosenTile) {
      if (chosenTile.letter === "?") {
        setChosenJokerPosition(cellIndex);
        return;
      }
      setCells({ ...cells, [`${row}-${column}`]: chosenTile });
      setRackTiles(
        rackTiles.map((rackTile, index) =>
          chosenTile.index === index
            ? { ...rackTile, isPlayed: true }
            : rackTile
        )
      );
      setChosenTile(null);
      setCurrentMove([...currentMove, `${row}-${column}`]);
    }
  }

  function handleRecall() {
    setRackTiles(
      rackTiles.map((rackTile) =>
        rackTile.isPlayed ? { ...rackTile, isPlayed: false } : rackTile
      )
    );
    const recallCells = { ...cells };
    currentMove.forEach((move) => {
      if (move in CATEGORIES) {
        recallCells[move] = CATEGORIES[move];
      } else {
        delete recallCells[move];
      }
    });
    setCells(recallCells);
    setCurrentMove([]);
    setChosenTile(null);
  }

  function handleJokerLetterClick(letter) {
    setCells({
      ...cells,
      [chosenJokerPosition]: { ...chosenTile, letter: letter },
    });
    setRackTiles(
      rackTiles.map((rackTile, index) =>
        chosenTile.index === index ? { ...rackTile, isPlayed: true } : rackTile
      )
    );
    setChosenTile(null);
    setCurrentMove([...currentMove, chosenJokerPosition]);
    setChosenJokerPosition(null);
  }

  function handlePlayClick() {
    if (currentMove.length === 0) {
      toast.error("Lege zuerst Steine.");
      return;
    }

    if (isFirstWord && currentMove.length < 2) {
      toast.error("Lege mindestens zwei Steine.");
      return;
    }

    if (isFirstWord && !currentMove.includes("8-8")) {
      toast.error('1. Wort muss "Start"-Feld kreuzen');
      return;
    }

    const rows = [];
    const columns = [];
    const neighbors = new Set();

    currentMove.forEach((move) => {
      const [row, column] = splitBrickName(move);
      rows.push(row);
      columns.push(column);

      if (!isFirstWord) {
        const left = `${row - 1}-${column}`;
        const right = `${row + 1}-${column}`;
        const up = `${row}-${column - 1}`;
        const down = `${row}-${column + 1}`;

        neighbors.add(left);
        neighbors.add(right);
        neighbors.add(up);
        neighbors.add(down);
      }
    });
    console.log("neighbors: ", neighbors);
    currentMove.forEach((move) => {
      neighbors.delete(move);
    });
    console.log(neighbors);
    const dockingTiles = Array.from(neighbors).filter((neighbor) =>
      isPlayedTile(neighbor, cells)
    );
    console.log("dockingTiles: ", dockingTiles);
    if (dockingTiles.length === 0 && !isFirstWord) {
      toast.error("Das neue Wort muss an ein bestehendes angelegt werden.");
      return;
    }

    const rowSet = new Set(rows);
    const columnSet = new Set(columns);

    if (rowSet.size > 1 && columnSet.size > 1) {
      toast.error("Wort muss in einer Reihe/Spalte stehen.");
      return;
    }

    let alignment;

    if (rowSet.size === 1) {
      alignment = "row";
      if (!checkConsecutiveNumbers(columns)) {
        if (isFirstWord) {
          toast.error("Das Wort muss zusammenhängend sein.");
          return;
        }
        const theOnlyRow = [...rowSet][0];

        dockingTiles.forEach((tile) => {
          const [row, column] = splitBrickName(tile);
          if (row === theOnlyRow) {
            columns.push(column);
          }
        });

        if (!checkConsecutiveNumbers(columns)) {
          const framingNumbers = dockingTiles
            .filter((tile) => splitBrickName(tile)[0] === theOnlyRow)
            .map((tile) => splitBrickName(tile)[1]);

          framingNumbers.sort((a, b) => a - b);
          let betweenNumber = framingNumbers[0] + 1;

          const missingNumbers = [];

          while (betweenNumber < framingNumbers[framingNumbers.length - 1]) {
            missingNumbers.push(`${theOnlyRow}-${betweenNumber}`);
            betweenNumber++;
          }

          missingNumbers.forEach((entry) => {
            if (isPlayedTile(entry, cells)) {
              const [, column] = splitBrickName(entry);
              if (!columns.includes(column)) {
                columns.push(column);
              }
            }
          });

          if (!checkConsecutiveNumbers(columns)) {
            toast.error("Das Wort muss zusammenhängend sein.");
            return;
          }
        }
      }
    }

    if (columnSet.size === 1) {
      alignment = "column";
      if (!checkConsecutiveNumbers(rows)) {
        if (isFirstWord) {
          toast.error("Das Wort muss zusammenhängend sein.");
          return;
        }
        const theOnlyColumn = [...columnSet][0];

        dockingTiles.forEach((tile) => {
          const [row, column] = splitBrickName(tile);
          if (column === theOnlyColumn) {
            rows.push(row);
          }
        });
        if (!checkConsecutiveNumbers(rows)) {
          const framingNumbers = dockingTiles
            .filter((tile) => splitBrickName(tile)[1] === theOnlyColumn)
            .map((tile) => splitBrickName(tile)[0]);

          framingNumbers.sort((a, b) => a - b);
          let betweenNumber = framingNumbers[0] + 1;

          const missingNumbers = [];

          while (betweenNumber < framingNumbers[framingNumbers.length - 1]) {
            missingNumbers.push(`${betweenNumber}-${theOnlyColumn}`);
            betweenNumber++;
          }

          missingNumbers.forEach((entry) => {
            if (isPlayedTile(entry, cells)) {
              const [row] = splitBrickName(entry);
              if (!rows.includes(row)) {
                rows.push(row);
              }
            }
          });

          if (!checkConsecutiveNumbers(rows)) {
            toast.error("Das Wort muss zusammenhängend sein.");
            return;
          }
        }
      }
    }
    console.log("currentMove: ", currentMove);
    console.log("rows: ", rows);
    console.log("columns: ", columns);
    console.log(cells);
    const words = buildWords(rows, columns, dockingTiles, alignment);
    words.map((word) => {
      if (!checkWordExists(word)) {
        toast.error(`${word} existiert nicht.`);
        return;
      }
    });
    toast.success("Wort gespielt.");

    finalizeMove();
  }

  function buildWords(rows, columns, dockingTiles, alignment) {
    let letters = [];
    const lettersArray = [];
    console.log(alignment);

    //---ROW---
    if (alignment === "row") {
      const row = [...rows][0];

      columns.sort((a, b) => a - b);

      let nextTile = `${row}-${columns[0] - 1}`;
      while (isPlayedTile(nextTile, cells)) {
        const [, newColumn] = splitBrickName(nextTile);
        columns.unshift(newColumn);
        nextTile = `${row}-${columns[0] - 1}`;
      }

      nextTile = `${row}-${columns[columns.length - 1] + 1}`;
      while (isPlayedTile(nextTile, cells)) {
        const [, newColumn] = splitBrickName(nextTile);
        columns.push(newColumn);
        nextTile = `${row}-${columns[columns.length - 1] + 1}`;
      }

      console.log("columns: ", columns);
      letters = columns.map((column) => {
        const key = `${row}-${column}`;

        const tile = cells[key];

        return typeof tile === "string" ? tile.slice(0, 1) : tile.letter;
      });

      lettersArray.push(letters);
    }

    //---COLUMN---
    if (alignment === "column") {
      const column = [...columns][0];

      rows.sort((a, b) => a - b);
      //check up
      let nextTile = `${rows[0] - 1}-${column}`;
      while (isPlayedTile(nextTile, cells)) {
        const [newRow] = splitBrickName(nextTile);
        rows.unshift(newRow);
        nextTile = `${rows[0] - 1}-${column}`;
      }
      //check down
      nextTile = `${rows[rows.length - 1] + 1}-${column}`;
      while (isPlayedTile(nextTile, cells)) {
        const [newRow] = splitBrickName(nextTile);
        rows.push(newRow);
        nextTile = `${rows[rows.length - 1] + 1}-${column}`;
      }

      letters = rows.map((row) => {
        const key = `${row}-${column}`;

        const tile = cells[key];

        return typeof tile === "string" ? tile.slice(0, 1) : tile.letter;
      });

      lettersArray.push(letters);
      letters = [];
      // --check dockingTiles for docking letters that are not in the column

      const lastDockings = dockingTiles.filter(
        (tile) => splitBrickName(tile)[1] !== column
      );
      console.log("lastDockings: ", lastDockings);

      const newColumns = [];
      let row = 0;

      lastDockings.forEach((tile, index) => {
        const [tileRow, tileColumn] = splitBrickName(tile);
        if (tileRow !== row) {
          if (index !== 0) {
            letters = newColumns.map((column) => {
              const key = `${row}-${column}`;

              const tile = cells[key];

              return typeof tile === "string" ? tile.slice(0, 1) : tile.letter;
            });

            lettersArray.push(letters);
          }
          newColumns.length = 0;
          newColumns.push(column);
          row = tileRow;
        }

        nextTile = tile;
        if (tileColumn < column) {
          while (isPlayedTile(nextTile, cells)) {
            const [, newColumn] = splitBrickName(nextTile);

            newColumns.unshift(newColumn);
            nextTile = `${row}-${newColumns[0] - 1}`;
          }
        }

        if (tileColumn > column) {
          while (isPlayedTile(nextTile, cells)) {
            const [, newColumn] = splitBrickName(nextTile);
            console.log("nreColumn: ", newColumn);
            newColumns.push(newColumn);
            nextTile = `${row}-${newColumns[newColumns.length - 1] + 1}`;
          }
        }

        if (index === lastDockings.length - 1) {
          letters = newColumns.map((column) => {
            const key = `${row}-${column}`;

            const tile = cells[key];

            return typeof tile === "string" ? tile.slice(0, 1) : tile.letter;
          });

          lettersArray.push(letters);
        }
      });
    }

    console.log("lettersArray: ", lettersArray);

    const words = lettersArray.map((letters) => letters.join(""));

    console.log(words);

    return words;
  }

  function checkWordExists(word) {
    return wordSet.has(word);
  }

  function finalizeMove() {
    setIsFirstWord(false);
    const newCells = { ...cells };
    currentMove.forEach((move) => {
      const cellValue = `${newCells[move].letter}-${newCells[move].value}`;

      newCells[move] = cellValue;
    });

    setCurrentMove([]);
    setCells(newCells);
    setChosenTile(null);

    const { drawnTiles, currentTilebag } = drawTilesFromTilebag(
      rackTiles,
      tilebag
    );

    setRackTiles(drawnTiles);
    setTilebag(currentTilebag);
  }

  //for later
  // if (isLoading) return <p>Loading...</p>;

  // if (error) {
  //   return <h1>Oops… something went wrong.</h1>;
  // }
  // if (!gameData) {
  //   return <h1>No games.</h1>;
  // }
  //console.log(wordSet);
  return (
    <>
      <h1>Scrabboli</h1>

      {chosenJokerPosition && <JokerLetter onClick={handleJokerLetterClick} />}
      <Board
        //wordSet={wordSet}
        //gameData={gameData}
        cells={cells}
        chosenTile={chosenTile}
        handleClick={handleCellClick}
      />
      <Rack
        rackTiles={rackTiles}
        chosenTile={chosenTile}
        handleClick={handleTileClick}
      />

      <GameNavBar onRecall={handleRecall} onPlayClick={handlePlayClick} />
    </>
  );
}
