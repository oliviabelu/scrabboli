import {
  getRandomGreeting,
  createTilebag,
  drawTilesFromTilebag,
} from "@/utils/gameLogic";
import { StyledIntroduction } from "../../components/Styling/Games.styled";
import GamesOverview from "@/components/GamesOverview";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Games() {
  const [playerId, setPlayerId] = useState(null);
  const greeting = getRandomGreeting();
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("playerId");
    setPlayerId(id);
  }, []);

  const { data: player, isLoading: isLoadingPlayer } = useSWR(
    playerId ? `/api/players/${playerId}` : null
  );

  const { data: games, isLoading: isLoadingGames } = useSWR(
    playerId ? `/api/games?playerId=${playerId}` : null
  );

  async function handleNewGame() {
    try {
      const initialTilebag = createTilebag();
      const { drawnTiles, currentTilebag } = drawTilesFromTilebag(
        null,
        initialTilebag
      );

      const playerId = localStorage.getItem("playerId");

      const gameData = {
        status: "active",
        players: [
          {
            playerId: playerId,
            score: 0,
            tiles: drawnTiles,
            isCurrentTurn: true,
          },
        ],
        cells: [],
        tilebag: currentTilebag,
        moves: [],
      };

      const response = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        toast.error("Spiel konnte nicht erstellt werden.");
        return;
      }

      const newGame = await response.json();
      router.push(`/games/${newGame._id}`);
    } catch (error) {
      console.error(error);
      toast.error("Spiel konnte nicht erstellt werden.");
    }
  }

  if (!playerId || !games || isLoadingPlayer || isLoadingGames)
    return <p>Laden...</p>;

  return (
    <>
      <StyledIntroduction>
        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            localStorage.clear();
            Router.push("/");
          }}
        >
          Logout
        </Button>
        <h2>
          {greeting} {player?.name}
        </h2>
        <Button type="button" variant="outlined" onClick={handleNewGame}>
          Neues Spiel
        </Button>
      </StyledIntroduction>
      <GamesOverview games={games} />
    </>
  );
}
