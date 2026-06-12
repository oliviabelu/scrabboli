import Board from "@/components/Tile/Board";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [wordSet, setWordSet] = useState(null);

  useEffect(() => {
    async function loadWords() {
      try {
        const response = await fetch("/words.json");
        if (!response.ok) {
          throw new Error(`Failed to load words: ${response.status}`);
        }

        const wordArray = await response.json();

        const set = new Set(wordArray.map((entry) => entry.word));
        console.log(set);
        setWordSet(set);
      } catch (error) {
        console.error(error);
      }
    }

    loadWords();
  }, []);

  return (
    <>
      <h1>Scrabboli</h1>

      <Board wordSet={wordSet} />
    </>
  );
}
