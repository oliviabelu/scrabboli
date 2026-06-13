import { StyledBrick, StyledLetter, StyledValue } from "./Brick.styled";

export default function Brick({ category, tileLetter, tileValue, onClick }) {
  return (
    <StyledBrick type="button" onClick={onClick} $category={category}>
      {category === "tile" || category === "boardTile" ? (
        tileLetter === "?" ? (
          ""
        ) : (
          <>
            <StyledValue $category={category}>{tileValue}</StyledValue>
            <StyledLetter $category={category}>{tileLetter}</StyledLetter>
          </>
        )
      ) : (
        category
      )}
    </StyledBrick>
  );
}
