import useSWR from "swr";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { TILES, CATEGORIES, TILENUMBERS } from "@/constants/gameConstants";
import Board from "@/components/Board";
import Rack from "@/components/Rack";
import JokerLetter from "@/components/JokerLetter";
import GameNavBar from "@/components/GameNavBar";

function createTilebag() {
  return Object.entries(TILES).flatMap(([letter, { count, value }]) =>
    Array(count).fill({ letter, value })
  );
}

export default function HomePage() {
  const [wordSet, setWordSet] = useState(null);
  const [tilebag, setTilebag] = useState(createTilebag);
  const [cells, setCells] = useState(CATEGORIES);
  const [chosenTile, setChosenTile] = useState(null);
  const [rackTiles, setRackTiles] = useState([]);
  const [currentMove, setCurrentMove] = useState([]);
  const [chosenJokerPosition, setChosenJokerPosition] = useState(null);

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
    let currentTilebag = [...tilebag];

    const drawnTiles = TILENUMBERS.map(() => {
      const randomIndex = Math.floor(Math.random() * currentTilebag.length);
      const drawnTile = currentTilebag[randomIndex];
      currentTilebag = currentTilebag.toSpliced(randomIndex, 1);
      return { ...drawnTile, isPlayed: false };
    });
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

  //function that checks everything before saving move finally on board
  // and enabeling next move
  function handlePlay() {
    console.log(currentMove);
    //word must have at least 2 letters
    //(for now currentMove length check, for later words,
    // currentMove length can be 1, bc word need to "cross" another word on the board)
    if (currentMove.length < 2) {
      console.log("zu kurz");
      toast.error("Wort zu kurz");
    }
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
      <Toaster />
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
