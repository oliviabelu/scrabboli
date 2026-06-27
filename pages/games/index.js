import {
  getRandomGreeting,
  createTilebag,
  drawTilesFromTilebag,
} from "@/utils/gameLogic";
import {
  Wrapper,
  StyledCircularProgress,
  StyledGreeting,
  StyledLogoutButton,
  StyledDivider,
} from "../../components/Styling/Games.styled";
import { StyledTitle } from "@/components/Styling/Home.styled";
import GamesOverview from "@/components/GamesOverview";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { StyledButton } from "@/components/Buttons/Buttons.styled";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import Backdrop from "@mui/material/Backdrop";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles";
import AddIcon from "@mui/icons-material/Add";
import Brick from "@/components/Brick";

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

  if (!playerId || !games || isLoadingPlayer || isLoadingGames) {
    return (
      <Backdrop open={true}>
        <StyledCircularProgress />
      </Backdrop>
    );
  }
  const title = ["S", "C", "R", "A", "B", "B", "O", "L", "I"];
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        {/* <StyledTitle>Scrabboli</StyledTitle> */}
        <StyledTitle>
          {title.map((letter) => {
            return <Brick category={"title"} tileLetter={letter} />;
          })}
        </StyledTitle>
        <StyledLogoutButton
          type="button"
          variant="outlined"
          color="mainColor"
          onClick={() => {
            localStorage.clear();
            Router.push("/");
          }}
        >
          Logout
        </StyledLogoutButton>

        <StyledGreeting>
          {greeting} {player?.name}
        </StyledGreeting>
        <StyledButton
          type="button"
          variant="contained"
          color="mainColor"
          startIcon={<AddIcon />}
          onClick={handleNewGame}
        >
          Neues Spiel
        </StyledButton>
        <StyledDivider />
        <GamesOverview games={games} />
      </ThemeProvider>
    </Wrapper>
  );
}
