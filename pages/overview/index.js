import { getRandomGreeting } from "@/utils/gameLogic";
import { StyledIntroduction } from "./Overview.styled";
import Link from "next/link";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Router, { useRouter } from "next/router";

export default function Overview() {
  const [playerId, setPlayerId] = useState(null);
  const greeting = getRandomGreeting();
  const router = useRouter;

  useEffect(() => {
    const id = localStorage.getItem("playerId");
    setPlayerId(id);
  }, []);

  const { data: player, isLoading } = useSWR(
    playerId ? `/api/players/${playerId}` : null
  );

  if (!playerId || isLoading) return <p>Laden...</p>;

  return (
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
      <Link href="/games/new">Neues Spiel</Link>
    </StyledIntroduction>
  );
}
