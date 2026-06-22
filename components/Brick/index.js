import { StyledBrick, StyledLetter, StyledValue } from "./Brick.styled";

export default function Brick({
  category,
  tileLetter,
  tileValue,
  isChosenTile,
  onClick,
}) {
  const isTile = ["tile", "boardTile", "emptyTile"].includes(category);
  const isJokerLetter = category === "jokerLetter";
  const isJoker = tileLetter === "?";
  return (
    <StyledBrick
      type="button"
      onClick={onClick}
      $category={category}
      $isChosenTile={isChosenTile}
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck={false}
    >
      {!isTile ? (
        isJokerLetter ? (
          tileLetter
        ) : (
          category
        )
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
