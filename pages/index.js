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
  const { data: gameData, isLoading, error } = useSWR("/api/games");

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
    const drawnTiles = tileNumbers.map((tileNumber) => {
      const randomIndex = Math.floor(Math.random() * tilebag.length);
      return { ...tilebag[randomIndex], isPlayed: false };
    });
    setRackTiles(drawnTiles);
    updateTilebag(drawnTiles);
  }, []);

  function updateTilebag(drawnTiles) {
    let updatedTilebag = tilebag;

    drawnTiles.forEach((drawnTile) => {
      const index = updatedTilebag.findIndex(
        (tile) => tile.letter === drawnTile.letter
      );
      if (index !== -1) {
        updatedTilebag = updatedTilebag.toSpliced(index, 1);
      }
    });

    setTilebag(updatedTilebag);
  }

  function handleTileClick(tile, index) {
    setChosenTile({ ...tile, index });
  }

  function handleCellClick(row, column) {
    if (chosenTile) {
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
    console.log("recall");

    setRackTiles(
      rackTiles.map((rackTile) =>
        rackTile.isPlayed === true ? { ...rackTile, isPlayed: false } : rackTile
      )
    );
    let recallCells = cells;
    currentMove.forEach((move) =>
      move in CATEGORIES
        ? (recallCells = { ...recallCells, [move]: CATEGORIES[move] })
        : delete recallCells[move]
    );
    setCells(recallCells);
    setCurrentMove([]);
  }

  //for later
  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return <h1>Oops… something went wrong.</h1>;
  }
  if (!gameData) {
    return <h1>No games.</h1>;
  }

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
