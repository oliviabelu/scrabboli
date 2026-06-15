import styled, { css } from "styled-components";

export const StyledLetter = styled.div`
  grid-column: 1;
  grid-row: 2;

  ${(props) =>
    props.$category === "tile" &&
    css`
      font-size: 1.3rem;
    `}
`;

export const StyledValue = styled.div`
  grid-column: 2;
  grid-row: 1;

  ${(props) =>
    props.$category === "boardTile" &&
    css`
      font-size: 0.5rem;
    `}
`;

export const StyledBrick = styled.button`
  width: var(--cell-size);
  height: var(--cell-size);
  border-radius: var(--brick-border-radius) 0;
  margin: var(--cell-margin);

  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;

  background-color: var(--cell);

  ${(props) =>
    props.$category === "tile" &&
    css`
      background-color: var(--tile);
      color: white;

      width: var(--tile-size);
      height: var(--tile-size);

      margin: var(--tile-margin);

      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr 2fr;
    `}

  ${(props) =>
    props.$category === "emptyTile" &&
    css`
      background-color: var(--tile-empty);

      width: var(--tile-size);
      height: var(--tile-size);

      margin: var(--tile-margin);
    `}

  ${(props) =>
    props.$category === "boardTile" &&
    css`
      background-color: var(--tile);
      color: white;

      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr 2fr;
    `}

  ${(props) =>
    props.$category === "start" &&
    css`
      background-color: var(--cell-start);
      color: var(--cell-start-color);
      font-size: 10px;
    `}

  ${(props) =>
    props.$category === "2B" &&
    css`
      background-color: var(--cell-double-letter);
      color: var(--cell-double-letter-color);
    `}

    ${(props) =>
    props.$category === "3B" &&
    css`
      background-color: var(--cell-triple-letter);
      color: var(--cell-triple-letter-color);
    `}

    ${(props) =>
    props.$category === "2W" &&
    css`
      background-color: var(--cell-double-word);
      color: var(--cell-double-word-color);
    `}
    ${(props) =>
    props.$category === "3W" &&
    css`
      background-color: var(--cell-triple-word);
      color: var(--cell-triple-word-color);
    `}
`;
