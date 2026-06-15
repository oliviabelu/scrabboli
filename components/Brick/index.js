import { StyledBrick, StyledLetter, StyledValue } from "./Brick.styled";

export default function Brick({ category, tileLetter, tileValue, onClick }) {
  const isTile = ["tile", "boardTile", "emptyTile"].includes(category);
  const isJoker = tileLetter === "?";
  return (
    <StyledBrick type="button" onClick={onClick} $category={category}>
      {!isTile ? (
        category
      ) : isJoker ? (
        ""
      ) : (
        <>
          <StyledValue $category={category}>{tileValue}</StyledValue>
          <StyledLetter $category={category}>{tileLetter}</StyledLetter>
        </>
      )}
    </StyledBrick>
  );
}
