import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  StyledTitle,
  StyledIntroduction,
} from "@/components/Styling/Home.styled";
import toast from "react-hot-toast";

export default function HomePage() {
  const [user, setUser] = useState("initial"); //"initial" | "known" | "unknown"
  const [userName, setUserName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const playerId = localStorage.getItem("playerId");
    if (playerId) {
      router.push("/games");
    }
  }, []);

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
    <>
      <StyledTitle>Scrabboli</StyledTitle>
      {user === "initial" ? (
        <StyledIntroduction>
          <p>Warst du schon mal hier?</p>
          <Stack direction="row" spacing={2}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setUser("known")}
            >
              Ja
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setUser("unknown")}
            >
              Nein
            </Button>
          </Stack>
        </StyledIntroduction>
      ) : (
        <>
          <StyledIntroduction>
            <label htmlFor="userName">Dein Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleCheckUser()}
            ></input>
            <Stack direction="row" spacing={1}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => setUser("initial")}
              >
                Zurück
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={handleCheckUser}
              >
                Weiter
              </Button>
            </Stack>
          </StyledIntroduction>
        </>
      )}
    </>
  );
}
