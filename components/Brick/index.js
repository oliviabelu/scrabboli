import { StyledBrick } from "./Brick.styled";

export default function Brick({ category, tileLetter, tileValue }) {
  return (
    <StyledBrick $category={category}>
      {category === "tile" ? (
        tileLetter === "?" ? (
          ""
        ) : (
          <>
            <div>{tileLetter}</div>
            <div>{tileValue}</div>
          </>
        )
      ) : (
        category
      )}
    </StyledBrick>
  );
}
