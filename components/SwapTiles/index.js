import { StyledContainer, StyledExitButton } from "./SwapTiles.styled";
import { CircleX } from "lucide-react";
import Rack from "../Rack";
import Button from "@mui/material/Button";
import { useState } from "react";

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
    <StyledContainer>
      <StyledExitButton type="button" onClick={onExitSwap}>
        <CircleX />
      </StyledExitButton>
      <Rack rackTiles={rackTilesForSwap} handleClick={handleTileClick} />
      <Rack rackTiles={swappingTiles} handleClick={handleSwapTileClick} />
      <Button
        variant="outlined"
        type="button"
        color={`$var(--tile)`}
        onClick={() => onButtonSwap(rackTilesForSwap)}
      >
        Tauschen
      </Button>
    </StyledContainer>
  );
}
