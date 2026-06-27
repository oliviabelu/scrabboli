import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CATEGORIES } from "@/constants/gameConstants";
import {
  checkConsecutiveNumbers,
  drawTilesFromTilebag,
  splitBrickName,
  isPlayedTile,
  getLettersFromCell,
  calculateWordScore,
} from "@/utils/gameLogic";
import {
  StyledGameInfo,
  StyledPoints,
  StyledScore,
  GameWrapper,
  StyledDivider,
  StyledArrowBack,
} from "./PlayGame.styled";
import Board from "@/components/Board";
import Rack from "@/components/Rack";
import JokerLetter from "@/components/JokerLetter";
import GameNavBar from "@/components/GameNavBar";
import TilebagProgress from "@/components/TilebagProgress";
import SwapTiles from "@/components/SwapTiles";
import { AnimatePresence } from "framer-motion";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import GameInfo from "../GameInfo";

export default function PlayGame({ gameData, onSaveGame }) {
  const [tilebag, setTilebag] = useState(gameData.tilebag);
  const [rackTiles, setRackTiles] = useState(gameData.rackTiles);
  const [cells, setCells] = useState(gameData.cells);
  const [gameId, setGameId] = useState(gameData.gameId);
  const [isFirstWord, setIsFirstWord] = useState(gameData.isFirstWord);
  const [score, setScore] = useState(gameData.score);
  const [wordSet, setWordSet] = useState(null);
  const [chosenTile, setChosenTile] = useState(null);
  const [currentMove, setCurrentMove] = useState([]);
  const [chosenJokerPosition, setChosenJokerPosition] = useState(null);
  const [isSwapTilesClick, setIsSwapTilesClick] = useState(false);

  useEffect(() => {
    async function loadWords() {
      try {
        const response = await fetch("/wordsList.json");
        if (!response.ok) {
          throw new Error(`Failed to load words: ${response.status}`);
        }

        const wordArray = await response.json();

        const set = new Set(wordArray);
        setWordSet(set);
      } catch (error) {
        console.error(error);
      }
    }

    loadWords();
  }, []);

  function handleTileClick(tile, index) {
    if (chosenTile && typeof chosenTile === "string") {
      const boardTile = cells[chosenTile];
      const originalLetter = boardTile.value === 0 ? "?" : boardTile.letter;

      const newRackTiles = [...rackTiles];
      if (
        newRackTiles[index].letter === originalLetter &&
        newRackTiles[index].value === boardTile.value &&
        newRackTiles[index].isPlayed === true
      ) {
        newRackTiles[index] = {
          ...newRackTiles[index],
          isPlayed: false,
        };
      } else {
        const newIndex = newRackTiles.findIndex(
          (newRackTile) =>
            newRackTile.letter === originalLetter &&
            newRackTile.value === boardTile.value &&
            newRackTile.isPlayed === true
        );
        [newRackTiles[newIndex], newRackTiles[index]] = [
          newRackTiles[index],
          newRackTiles[newIndex],
        ];
        newRackTiles[index] = {
          ...newRackTiles[index],
          isPlayed: false,
        };
      }
      setRackTiles(newRackTiles);

      const newCells = { ...cells };
      chosenTile in CATEGORIES
        ? (newCells[chosenTile] = CATEGORIES[chosenTile])
        : delete newCells[chosenTile];
      setCells(newCells);
      setCurrentMove(currentMove.filter((move) => move !== chosenTile));
      setChosenTile(null);

      return;
    }

    if (
      chosenTile &&
      typeof chosenTile === "object" &&
      chosenTile.index !== index
    ) {
      const newRackTiles = [...rackTiles];
      [newRackTiles[chosenTile.index], newRackTiles[index]] = [
        newRackTiles[index],
        newRackTiles[chosenTile.index],
      ];
      setRackTiles(newRackTiles);
      setChosenTile(null);
      onSaveGame({ "players.0.tiles": newRackTiles });
      return;
    }

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
      setCells({
        ...cells,
        [`${row}-${column}`]: { ...chosenTile, isPlayed: true },
      });
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
        rackTile.isPlayed && !rackTile.isEmpty
          ? { ...rackTile, isPlayed: false }
          : rackTile
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
      [chosenJokerPosition]: { ...chosenTile, letter: letter, isPlayed: true },
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

  async function handlePlayClick() {
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
    currentMove.forEach((move) => {
      neighbors.delete(move);
    });

    const dockingTiles = Array.from(neighbors).filter((neighbor) =>
      isPlayedTile(neighbor, cells)
    );

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

    if (currentMove.length === 1) {
      const [moveRow] = splitBrickName(currentMove[0]);

      const isHorizontalDocking = dockingTiles.some((tile) => {
        const [tileRow] = splitBrickName(tile);
        return tileRow === moveRow;
      });

      alignment = isHorizontalDocking ? "row" : "column";
    }
    const wordResults = buildWords(rows, columns, dockingTiles, alignment);
    const allWordsExist = wordResults.every(({ word }) =>
      checkWordExists(word)
    );

    if (!allWordsExist) {
      const invalidWord = wordResults.find(
        ({ word }) => !checkWordExists(word)
      );
      toast.error(`${invalidWord.word} existiert nicht.`);
      return;
    }

    const roundScore = wordResults.reduce((sum, { score }) => sum + score, 0);
    const wordList = wordResults
      .map(({ word, score }) => `${word} (${score})`)
      .join(", ");

    toast.success(`${wordList} - ${roundScore} Punkte`);

    await finalizeMove(roundScore, wordResults);
  }

  function buildWords(rows, columns, dockingTiles, alignment) {
    let letters = [];
    const wordResults = [];

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

      letters = getLettersFromCell(
        columns,
        cells,
        (column) => `${row}-${column}`
      );

      wordResults.push({
        word: letters.join(""),
        score: calculateWordScore(
          columns,
          cells,
          (column) => `${row}-${column}`
        ),
      });

      letters = [];

      const lastDockings = dockingTiles.filter(
        (tile) => splitBrickName(tile)[0] !== row
      );

      const newRows = [];
      const dockingsByColumn = {};

      lastDockings.forEach((tile) => {
        const [, tileColumn] = splitBrickName(tile);
        if (!dockingsByColumn[tileColumn]) dockingsByColumn[tileColumn] = [];
        dockingsByColumn[tileColumn].push(tile);
      });

      Object.entries(dockingsByColumn).forEach(([column, tiles]) => {
        newRows.length = 0;
        newRows.push(row);

        tiles.forEach((tile) => {
          const [tileRow] = splitBrickName(tile);

          nextTile = tile;
          if (tileRow < row) {
            while (isPlayedTile(nextTile, cells)) {
              const [newRow] = splitBrickName(nextTile);
              newRows.unshift(newRow);
              nextTile = `${newRows[0] - 1}-${column}`;
            }
          }

          if (tileRow > row) {
            while (isPlayedTile(nextTile, cells)) {
              const [newRow] = splitBrickName(nextTile);
              newRows.push(newRow);
              nextTile = `${newRows[newRows.length - 1] + 1}-${column}`;
            }
          }
        });

        letters = getLettersFromCell(
          newRows,
          cells,
          (row) => `${row}-${column}`
        );
        wordResults.push({
          word: letters.join(""),
          score: calculateWordScore(
            newRows,
            cells,
            (row) => `${row}-${column}`
          ),
        });
      });
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

      letters = getLettersFromCell(rows, cells, (row) => `${row}-${column}`);

      wordResults.push({
        word: letters.join(""),
        score: calculateWordScore(rows, cells, (row) => `${row}-${column}`),
      });

      letters = [];

      const lastDockings = dockingTiles.filter(
        (tile) => splitBrickName(tile)[1] !== column
      );

      const newColumns = [];
      const dockingsByRow = {};

      lastDockings.forEach((tile) => {
        const [tileRow] = splitBrickName(tile);
        if (!dockingsByRow[tileRow]) dockingsByRow[tileRow] = [];
        dockingsByRow[tileRow].push(tile);
      });

      Object.entries(dockingsByRow).forEach(([row, tiles]) => {
        newColumns.length = 0;
        newColumns.push(column);

        tiles.forEach((tile) => {
          const [, tileColumn] = splitBrickName(tile);

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
              newColumns.push(newColumn);
              nextTile = `${row}-${newColumns[newColumns.length - 1] + 1}`;
            }
          }
        });

        letters = getLettersFromCell(
          newColumns,
          cells,
          (column) => `${row}-${column}`
        );

        wordResults.push({
          word: letters.join(""),
          score: calculateWordScore(
            newColumns,
            cells,
            (column) => `${row}-${column}`
          ),
        });
      });
    }

    return wordResults;
  }

  function checkWordExists(word) {
    return wordSet.has(word);
  }

  async function finalizeMove(roundScore, wordResults) {
    setScore(score + roundScore);
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

    const isGameOver =
      currentTilebag.length === 0 && drawnTiles.every((tile) => tile.isEmpty);

    await saveGame(
      newCells,
      drawnTiles,
      currentTilebag,
      roundScore,
      wordResults,
      isGameOver ? "finished" : undefined
    );

    if (isGameOver) {
      toast.success(
        `Spiel beendet! Dein Endstand: ${score + roundScore} Punkte`
      );
    }
  }

  function handleButtonSwap(rackTilesForSwap) {
    const { drawnTiles, currentTilebag } = drawTilesFromTilebag(
      rackTilesForSwap,
      tilebag
    );

    rackTilesForSwap.forEach(
      (tile) =>
        tile.isPlayed === true &&
        currentTilebag.push({ letter: tile.letter, value: tile.value })
    );

    setRackTiles(drawnTiles);
    setTilebag(currentTilebag);
    setIsSwapTilesClick(false);
    onSaveGame({ tilebag: currentTilebag, "players.0.tiles": drawnTiles });
  }

  function handleSwapTilesClick() {
    if (currentMove.length !== 0) {
      toast.error("Ziehe erst alle Steine zurück.");
      return;
    }
    setIsSwapTilesClick(true);
  }

  async function saveGame(
    newCells,
    newRackTiles,
    newTilebag,
    roundScore,
    wordResults,
    status
  ) {
    const playerId = localStorage.getItem("playerId");

    const gameUpdate = {
      cells: Object.entries(newCells)
        .filter(([, value]) => typeof value === "string" && value.includes("-"))
        .map(([position, value]) => ({
          position,
          value,
          playedBy: playerId,
        })),
      tilebag: newTilebag,
      "players.0.score": score + roundScore,
      "players.0.tiles": newRackTiles,
      $push: {
        moves: {
          playerId: playerId,
          word: wordResults.map((result) => result.word).join(", "),
          tiles: currentMove.map((position) => ({
            position: position,
            value: newCells[position],
          })),
          score: roundScore,
          timestamp: new Date(),
        },
      },
      ...(status && { status }), //status nur aktualisieren, wenn er übergeben wurde
    };
    onSaveGame(gameUpdate);
  }

  return (
    <GameWrapper>
      <GameInfo score={score} lastMove={gameData.lastMove} tilebag={tilebag} />
      {/* <StyledGameInfo>
        <Link href="/games">
          <StyledArrowBack />
        </Link>
        <StyledPoints>
          <span>Punkte</span>
          <StyledScore>{score}</StyledScore>
        </StyledPoints>
        <StyledPoints>
          <span>Letztes gelegtes Wort</span>
          <StyledScore>
            {gameData.lastMove.word} ({gameData.lastMove.score})
          </StyledScore>
        </StyledPoints>
        <TilebagProgress tilebag={tilebag} />
      </StyledGameInfo> */}
      <StyledDivider />
      {chosenJokerPosition && <JokerLetter onClick={handleJokerLetterClick} />}

      <Board
        cells={cells}
        chosenTile={chosenTile}
        handleClick={handleCellClick}
      />
      <StyledDivider />
      <Rack
        rackTiles={rackTiles}
        chosenTile={chosenTile}
        handleClick={handleTileClick}
      />
      <GameNavBar
        onRecall={handleRecall}
        onPlayClick={handlePlayClick}
        onSwapTilesClick={handleSwapTilesClick}
        currentMove={currentMove}
      />
      <AnimatePresence>
        {isSwapTilesClick && (
          <SwapTiles
            rackTiles={rackTiles}
            maxSwappingNumber={tilebag.length}
            onExitSwap={() => setIsSwapTilesClick(false)}
            onButtonSwap={handleButtonSwap}
          />
        )}
      </AnimatePresence>
    </GameWrapper>
  );
}
