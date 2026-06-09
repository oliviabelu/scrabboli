import styled, { css } from "styled-components";

export default function Tile({ category }) {
  return (
    <StyledTile $category={category}>
      {category === "player" ? "A" : category}
    </StyledTile>
  );
}

const StyledTile = styled.div`
  width: var(--tile-size);
  height: var(--tile-size);
  border-radius: var(--tile-border-radius) 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;

  background-color: var(--tile-board);

  ${(props) =>
    props.$category === "player" &&
    css`
      background-color: var(--tile-player);
      color: white;
    `}

  ${(props) =>
    props.$category === "2B" &&
    css`
      background-color: var(--tile-double-letter);
      color: var(--tile-double-letter-color);
    `}

    ${(props) =>
    props.$category === "3B" &&
    css`
      background-color: var(--tile-triple-letter);
      color: var(--tile-triple-letter-color);
    `}

    ${(props) =>
    props.$category === "2W" &&
    css`
      background-color: var(--tile-double-word);
      color: var(--tile-double-word-color);
    `}
    ${(props) =>
    props.$category === "3W" &&
    css`
      background-color: var(--tile-triple-word);
      color: var(--tile-triple-word-color);
    `}
`;
