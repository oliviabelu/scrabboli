import Brick from "../Brick";
import { StyledTileList } from "./Rack.styled";

export default function Rack({ rackTiles, chosenTile, handleClick }) {
  return (
    <StyledTileList>
      {rackTiles.map((rackTile, index) => {
        const emptyTile = rackTile.isPlayed || rackTile.isEmpty;
        const swapField = typeof rackTile === "number";
        const category = emptyTile
          ? "emptyTile"
          : swapField
            ? "swapField"
            : "tile";
        const letter = category === "tile" ? rackTile.letter : "";
        const value = category === "tile" ? rackTile.value : "";
        const isChosenTile = index === chosenTile?.index;
        return (
          <li key={index}>
            <Brick
              category={category}
              tileLetter={letter}
              tileValue={value}
              isChosenTile={isChosenTile}
              onClick={() => handleClick(rackTile, index)}
            />
          </li>
        );
      })}
    </StyledTileList>
  );
}
