import useSWR from "swr";
import { useState, useEffect } from "react";
import Board from "@/components/Board";
import { TILES } from "@/constants/gameConstants";
import Rack from "@/components/Rack";

function createTilebag() {
  return Object.entries(TILES).flatMap(([letter, { count, value }]) =>
    Array(count).fill({ letter, value })
  );
}

export default function HomePage() {
  const [wordSet, setWordSet] = useState(null);
  const [tilebag, setTilebag] = useState(createTilebag);
  const [chosenTile, setChosenTile] = useState(null);

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

  function handleUpdateTilebag(chosenTiles) {
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

  function handleTileClick(letter) {
    setChosenTile(letter);
  }

  function handleCellClick(row, column) {
    console.log("row: ", row, "column: ", column);
  }

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
        wordSet={wordSet}
        gameData={gameData}
        handleClick={handleCellClick}
      />
      <Rack
        tilebag={tilebag}
        onUpdateTilebag={handleUpdateTilebag}
        handleClick={handleTileClick}
      />
    </>
  );
}
