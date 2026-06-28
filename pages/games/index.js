import {
  getRandomGreeting,
  createTilebag,
  drawTilesFromTilebag,
} from "@/utils/gameLogic";
import {
  StyledCircularProgress,
  StyledGreeting,
  StyledLogoutButton,
  StyledDivider,
  StyledName,
  StyledButtonWrapper,
  StyledNewGameButton,
} from "../../components/Styling/Games.styled";
import {
  StyledTitle,
  StyledHeader,
  StyledMain,
} from "@/components/Styling/Home.styled";
import GamesOverview from "@/components/GamesOverview";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import {
  StyledButton,
  StyledPlainButton,
} from "@/components/Buttons/Buttons.styled";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import Backdrop from "@mui/material/Backdrop";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles";
import AddIcon from "@mui/icons-material/Add";
import Brick from "@/components/Brick";
import { TILES } from "@/constants/gameConstants";

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

  const {
    data: games,
    isLoading: isLoadingGames,
    mutate,
  } = useSWR(playerId ? `/api/games?playerId=${playerId}` : null);

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
  const playerName = player
    ? player.name
        .toUpperCase()
        .split("")
        .filter((letter) => TILES[letter] !== undefined)
        .map((letter) => {
          const value = TILES[letter].value;
          return { letter: letter, value: value };
        })
    : [];

  async function handleDelete(id) {
    const response = await fetch(`/api/games/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate();
      toast.success("Spiel gelöscht.");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledHeader>
        <StyledTitle>Scrabboli</StyledTitle>
      </StyledHeader>
      <StyledMain>
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
          <span>{greeting}</span>
          <StyledName>
            {playerName.map((letter, index) => {
              return (
                <Brick
                  key={index}
                  category={"tile"}
                  tileLetter={letter.letter}
                  tileValue={letter.value}
                />
              );
            })}
          </StyledName>
        </StyledGreeting>
        <StyledButtonWrapper>
          <StyledNewGameButton
            type="button"
            variant="contained"
            color="mainColor"
            startIcon={<AddIcon />}
            onClick={handleNewGame}
          >
            Neues Spiel
          </StyledNewGameButton>
        </StyledButtonWrapper>
        {games.length !== 0 && (
          <>
            <StyledDivider />
            <GamesOverview games={games} handleDelete={handleDelete} />
          </>
        )}
      </StyledMain>
    </ThemeProvider>
  );
}
