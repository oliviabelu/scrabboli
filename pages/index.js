import useSWR from "swr";
import { useState, useEffect } from "react";
import Board from "@/components/Board";
import { TILES, CATEGORIES } from "@/constants/gameConstants";
import Rack from "@/components/Rack";

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
    const chosenTiles = tileNumbers.map((tileNumber) => {
      const randomIndex = Math.floor(Math.random() * tilebag.length);
      return tilebag[randomIndex];
    });
    setRackTiles(chosenTiles);
    updateTilebag(chosenTiles);
  }, []);

  function updateTilebag(chosenTiles) {
    let updatedTilebag = tilebag;

    chosenTiles.forEach((chosenTile) => {
      const index = updatedTilebag.findIndex(
        (tile) => tile.letter === chosenTile.letter
      );
      if (index !== -1) {
        updatedTilebag = updatedTilebag.toSpliced(index, 1);
      }
    });

    setTilebag(updatedTilebag);
  }

  function handleTileClick(letter, index) {
    setChosenTile({ letter: letter, index: index });
  }

  function handleCellClick(row, column) {
    console.log("row: ", row, "column: ", column);
    if (chosenTile) {
      console.log(
        "chosen Tile: ",
        chosenTile.letter,
        "chosen Cell: ",
        row,
        column
      );
      console.log("chosenTile: ", chosenTile);
      console.log("racktile: ", rackTiles);
      setCells({ ...cells, [`${row}-${column}`]: chosenTile });
      setRackTiles(
        rackTiles.map((rackTile, index) =>
          chosenTile.index === index ? { letter: "", value: "" } : rackTile
        )
      );
      setChosenTile(null);
      // setRackTiles()
    }
  }

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return <h1>Oops… something went wrong.</h1>;
  }
  if (!gameData) {
    return <h1>No games.</h1>;
  }
  console.log(rackTiles);
  return (
    <>
      <h1>Scrabboli</h1>

      <Board
        wordSet={wordSet}
        gameData={gameData}
        cells={cells}
        handleClick={handleCellClick}
      />
      <Rack rackTiles={rackTiles} handleClick={handleTileClick} />
    </>
  );
}
