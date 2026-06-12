import Board from "@/components/Tile/Board";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [wordSet, setWordSet] = useState();

  async function loadWords() {
    try {
      const response = await fetch("./words.json");
      const wordArray = await response.json();

      const set = new Set(wordArray);
      setWordSet(set);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadWords();
  }, []);

  console.log(wordSet);
  return (
    <>
      <h1>Scrabboli</h1>

      <Board />
    </>
  );
}
