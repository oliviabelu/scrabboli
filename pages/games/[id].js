import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PlayGame from "@/components/PlayGame";
import { CATEGORIES } from "@/constants/gameConstants";
import toast from "react-hot-toast";

export default function GamePage() {
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    setPlayerId(localStorage.getItem("playerId"));
  }, []);

  const router = useRouter();
  const { id } = router.query;

  const {
    data: game,
    isLoading,
    mutate,
  } = useSWR(id ? `/api/games/${id}` : null);

  if (!game || isLoading) return <p>Laden...</p>;

  const cells = { ...CATEGORIES };

  if (game.cells.length !== 0) {
    game.cells.forEach((cell) => {
      cells[cell.position] = cell.value;
    });
  }

  const isFirstWord = game.cells.length === 0;

  const score =
    game.moves.length !== 0
      ? game.moves
          .map((move) => (move.playerId === playerId ? move.score : 0))
          .reduce((accumulator, currentValue) => accumulator + currentValue)
      : 0;

  async function saveGame(gameUpdate) {
    try {
      const response = await fetch(`/api/games/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameUpdate),
      });
      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.error(error);
      toast.error("Spielstand konnte nicht gespeichert werden.");
    }
  }

  return (
    <PlayGame
      gameData={{
        gameId: game._id,
        tilebag: game.tilebag,
        rackTiles: game.players[0].tiles,
        cells: cells,
        isFirstWord: isFirstWord,
        score: score,
      }}
      onSaveGame={saveGame}
    />
  );
}
