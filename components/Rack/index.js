import Brick from "../Brick";
import { StyledTileList } from "./Rack.styled";

export default function Rack({ rackTiles, handleClick }) {
  return (
    <StyledTileList>
      {rackTiles.map((rackTile, index) => {
        const category = rackTile.isPlayed === true ? "emptyTile" : "tile";
        const letter = category === "tile" ? rackTile.letter : "";
        const value = category === "tile" ? rackTile.value : "";
        return (
          <li key={index}>
            <Brick
              category={category}
              tileLetter={letter}
              tileValue={value}
              onClick={() => handleClick(rackTile, index)}
            />
          </li>
        );
      })}
    </StyledTileList>
  );
}
