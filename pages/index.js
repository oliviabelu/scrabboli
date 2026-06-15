import useSWR from "swr";
import { useState, useEffect } from "react";
import { TILES, CATEGORIES } from "@/constants/gameConstants";
import Board from "@/components/Board";
import Rack from "@/components/Rack";
import GameNavBar from "@/components/GameNavBar";

function createTilebag() {
  return Object.entries(TILES).flatMap(([letter, { count, value }]) =>
    Array(count).fill({ letter, value })
  );
}

const tileNumbers = [1, 2, 3, 4, 5, 6, 7];

export default function HomePage() {
  const [wordSet, setWordSet] = useState(null);
  const [tilebag, setTilebag] = useState(createTilebag);
  const [cells, setCells] = useState(CATEGORIES);
  const [chosenTile, setChosenTile] = useState(null);
  const [rackTiles, setRackTiles] = useState([]);
  const [currentMove, setCurrentMove] = useState([]);

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

    const drawnTiles = tileNumbers.map(() => {
      const randomIndex = Math.floor(Math.random() * currentTilebag.length);
      const drawnTile = currentTilebag[randomIndex];
      currentTilebag = currentTilebag.toSpliced(randomIndex, 1);
      return { ...drawnTile, isPlayed: false };
    });
    setRackTiles(drawnTiles);
    setTilebag();
  }, []);

  function handleTileClick(tile, index) {
    setChosenTile({ ...tile, index });
  }

  function handleCellClick(row, column) {
    if (chosenTile) {
      if (chosenTile.isPlayed) {
        return;
      }
      if (typeof cells[`${row}-${column}`] === "object") {
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

      <Board
        //wordSet={wordSet}
        //gameData={gameData}
        cells={cells}
        handleClick={handleCellClick}
      />
      <Rack rackTiles={rackTiles} handleClick={handleTileClick} />
      <GameNavBar onClick={handleRecall} />
    </>
  );
}
