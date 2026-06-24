import { StyledContainer, StyledExitButton } from "./SwapTiles.styled";
import { CircleX } from "lucide-react";
import Rack from "../Rack";
import { TILENUMBERS } from "@/constants/gameConstants";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function SwapTiles({ rackTiles, onExitSwap, onButtonSwap }) {
  const [rackTilesForSwap, setRackTilesForSwap] = useState([...rackTiles]);
  const [swappingTiles, setSwappingTiles] = useState([...TILENUMBERS]);

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
      updated[index] = { ...updated[index], isEmpty: true };
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
          update.isEmpty === true
      );
      if (tileIndex === -1) return updated;
      updated[tileIndex] = { ...updated[tileIndex], isEmpty: false };
      return updated;
    });

    setSwappingTiles((prevSwappingTiles) => {
      const updated = [...prevSwappingTiles];
      const updatedFiltered = updated.filter(
        (update, updateIndex) => updateIndex !== index
      );
      return TILENUMBERS.map((number, index) =>
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
        onClick={() => onButtonSwap(swappingTiles)}
      >
        Tauschen
      </Button>
    </StyledContainer>
  );
}
