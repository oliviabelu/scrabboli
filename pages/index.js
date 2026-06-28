import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  StyledTitle,
  StyledIntroduction,
  StyledMain,
  StyledHeader,
  StyledText,
  StyledInput,
} from "@/components/Styling/Home.styled";
import toast from "react-hot-toast";
import { StyledButton } from "@/components/Buttons/Buttons.styled";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles";

export default function HomePage() {
  const [user, setUser] = useState("initial"); //"initial" | "known" | "unknown"
  const [userName, setUserName] = useState("");

  const router = useRouter();

  const inputRef = useRef(null);

  useEffect(() => {
    const playerId = localStorage.getItem("playerId");
    if (playerId) {
      router.push("/games");
    }
  }, []);

  useEffect(() => {
    if (user !== "initia") {
      inputRef.current?.focus();
    }
  }, [user]);

  async function handleCheckUser() {
    try {
      if (!userName.trim()) return;

      if (user === "unknown") {
        const playerResponse = await fetch("/api/players", {
          method: "POST",
          body: JSON.stringify({ name: userName }),
          headers: { "Content-Type": "application/json" },
        });
        if (playerResponse.status === 409) {
          toast.error(
            "Der Name ist bereits vergeben. Wähle einen anderen oder eine Variation."
          );
          return;
        }
        if (!playerResponse.ok) {
          toast.error("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
          return;
        }

        const newPlayer = await playerResponse.json();
        localStorage.setItem("playerId", newPlayer._id);
      } else {
        const playerResult = await fetch(
          `/api/players?name=${encodeURIComponent(userName)}`
        );

        if (!playerResult.ok) {
          toast.error("Name nicht gefunden.");

          return;
        }
        const player = await playerResult.json();
        localStorage.setItem("playerId", player._id);
      }
      router.push("/games");
    } catch (error) {
      toast.error("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledHeader>
        <StyledTitle>Scrabboli</StyledTitle>
      </StyledHeader>
      <StyledMain>
        {user === "initial" ? (
          <StyledIntroduction>
            <StyledText>Warst du schon mal hier?</StyledText>

            <Stack direction="row" spacing={2}>
              <StyledButton
                type="button"
                variant="outlined"
                color="mainColor"
                onClick={() => setUser("known")}
              >
                Ja
              </StyledButton>
              <StyledButton
                type="button"
                variant="outlined"
                color="mainColor"
                onClick={() => setUser("unknown")}
              >
                Nein
              </StyledButton>
            </Stack>
          </StyledIntroduction>
        ) : (
          <>
            <StyledIntroduction>
              <label htmlFor="userName">Dein Name:</label>
              <StyledInput
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" && handleCheckUser()
                }
                ref={inputRef}
              ></StyledInput>
              <Stack direction="row" spacing={1}>
                <StyledButton
                  type="button"
                  variant="outlined"
                  color="mainColor"
                  onClick={() => setUser("initial")}
                >
                  Zurück
                </StyledButton>
                <StyledButton
                  type="button"
                  variant="contained"
                  color="mainColor"
                  onClick={handleCheckUser}
                >
                  Weiter
                </StyledButton>
              </Stack>
            </StyledIntroduction>
          </>
        )}
      </StyledMain>
    </ThemeProvider>
  );
}
