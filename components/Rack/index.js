import Brick from "../Brick";
import { StyledTileList } from "./Rack.styled";

export default function Rack({ rackTiles, handleClick }) {
  return (
    <StyledTileList>
      {rackTiles.map((rackTile, index) => (
        <li key={index}>
          <Brick
            category={rackTile.letter === "" ? "emptyTile" : "tile"}
            tileLetter={rackTile.letter}
            tileValue={rackTile.value}
            onClick={() => handleClick(rackTile, index)}
          />
        </li>
      ))}
    </StyledTileList>
  );
}
