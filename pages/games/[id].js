import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";
import PlayGame from "@/components/PlayGame";
import { CATEGORIES } from "@/constants/gameConstants";

export default function GamePage() {
  const [playerId] = useState(() => localStorage.getItem("playerId"));

  const router = useRouter();
  const { id } = router.query;

  const { data: game } = useSWR(`/api/games/${id}`);

  if (!game) return <p>Laden...</p>;

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
    />
  );
}
