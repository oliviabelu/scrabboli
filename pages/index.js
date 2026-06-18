import useSWR from "swr";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CATEGORIES, SPECIAL_CELL_TYPES } from "@/constants/gameConstants";
import {
  checkConsecutiveNumbers,
  createTilebag,
  drawTilesFromTilebag,
} from "@/utils/gameLogic";
import Board from "@/components/Board";
import Rack from "@/components/Rack";
import JokerLetter from "@/components/JokerLetter";
import GameNavBar from "@/components/GameNavBar";

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
    const isPlayedTile =
      cellIndex in cells &&
      typeof cells[cellIndex] === "string" &&
      !SPECIAL_CELL_TYPES.includes(cells[cellIndex]);

    if (isPlayedTile) return;

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

  function handlePlay() {
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

    currentMove.forEach((move) => {
      const [row, column] = move.split("-");
      rows.push(row);
      columns.push(column);
    });

    const rowSet = new Set(rows);
    const columnSet = new Set(columns);

    if (rowSet.size > 1 && columnSet.size > 1) {
      toast.error("Wort muss in einer Reihe/Spalte stehen.");
      return;
    }

    if (rowSet.size === 1) {
      if (!checkConsecutiveNumbers(columns)) {
        toast.error("Das Wort muss zusammenhängend sein.");
        return;
      }
    }
    if (columnSet.size === 1) {
      if (!checkConsecutiveNumbers(rows)) {
        toast.error("Das Wort muss zusammenhängend sein.");
        return;
      }
    }

    toast.success("Wort gespielt.");
    //update everything for next round
    setIsFirstWord(false);

    console.log(cells);
    console.log(currentMove);

    const newCells = { ...cells };
    currentMove.forEach((move) => {
      const cellValue = `${newCells[move].letter}-${newCells[move].value}`;

      newCells[move] = cellValue;
    });
    console.log(newCells);

    setCurrentMove([]);
    setCells(newCells);
    setChosenTile(null);

    //update tilebag and rack
    console.log("rack: ", rackTiles, "tilebag: ", tilebag);
    const { drawnTiles, currentTilebag } = drawTilesFromTilebag(
      rackTiles,
      tilebag
    );
    console.log(drawnTiles, currentTilebag);

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

      <GameNavBar onRecall={handleRecall} onPlay={handlePlay} />
    </>
  );
}
