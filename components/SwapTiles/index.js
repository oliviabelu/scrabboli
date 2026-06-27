import {
  StyledContainer,
  StyledExitButton,
  InfoText,
} from "./SwapTiles.styled";
import { StyledButton } from "../Buttons/Buttons.styled";
import { ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import Rack from "../Rack";
import { useState } from "react";
import { theme } from "@/styles";

export default function SwapTiles({
  rackTiles,
  maxSwappingNumber,
  onExitSwap,
  onButtonSwap,
}) {
  const [rackTilesForSwap, setRackTilesForSwap] = useState([...rackTiles]);
  const initialSwappingTiles = Array.from(
    { length: Math.min(7, maxSwappingNumber) },
    (_, i) => i + 1
  );
  const [swappingTiles, setSwappingTiles] = useState(initialSwappingTiles);

  function handleTileClick(tile, index) {
    const swapIndex = swappingTiles.findIndex(
      (swappingTile) => typeof swappingTile === "number"
    );
    if (swapIndex === -1) return;

    setSwappingTiles((prevSwappingTiles) => {
      const updated = [...prevSwappingTiles];
      updated[swapIndex] = tile;
      return updated;
    });

    setRackTilesForSwap((prevRackTiles) => {
      const updated = [...prevRackTiles];
      updated[index] = { ...updated[index], isPlayed: true };
      return updated;
    });
  }

  function handleSwapTileClick(tile, index) {
    if (typeof tile === "number") return;

    setRackTilesForSwap((prevRackTiles) => {
      const updated = [...prevRackTiles];
      const tileIndex = updated.findIndex(
        (update) =>
          update.letter === tile.letter &&
          update.value === tile.value &&
          update.isPlayed === true
      );
      if (tileIndex === -1) return updated;
      updated[tileIndex] = { ...updated[tileIndex], isPlayed: false };
      return updated;
    });

    setSwappingTiles((prevSwappingTiles) => {
      const updated = [...prevSwappingTiles];
      const updatedFiltered = updated.filter(
        (update, updateIndex) => updateIndex !== index
      );
      return initialSwappingTiles.map((number, index) =>
        typeof updatedFiltered[index] === "object"
          ? updatedFiltered[index]
          : number
      );
    });
  }

  return (
    <StyledContainer
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <StyledExitButton type="button" onClick={onExitSwap}>
        <CloseIcon />
      </StyledExitButton>
      <InfoText>
        Klicke auf die Buchstaben, die du austauschen möchtest.
      </InfoText>
      <Rack rackTiles={rackTilesForSwap} handleClick={handleTileClick} />
      <Rack rackTiles={swappingTiles} handleClick={handleSwapTileClick} />

      <ThemeProvider theme={theme}>
        <Stack direction="row" sx={{ justifyContent: "center" }}>
          <StyledButton
            variant="outlined"
            type="button"
            color="mainColor"
            onClick={() => onButtonSwap(rackTilesForSwap)}
          >
            Tauschen
          </StyledButton>
        </Stack>
      </ThemeProvider>
    </StyledContainer>
  );
}
