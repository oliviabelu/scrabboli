import styled, { css } from "styled-components";

export const StyledLetter = styled.div`
  grid-column: 2;
  grid-row: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  color: var(--off-white);

  ${(props) =>
    props.$category === "tile" &&
    css`
      font-size: 1.3rem;
    `}

  ${(props) =>
    (props.$category === "boardTile" ||
      props.$category === "playedBoardTile") &&
    css`
      font-size: 0.75rem;
    `}
`;

export const StyledValue = styled.div`
  grid-column: 3;
  grid-row: 2;

  color: var(--off-white);

  ${(props) =>
    (props.$category === "boardTile" ||
      props.$category === "playedBoardTile") &&
    css`
      font-size: 0.5rem;
    `}
`;

export const StyledBrick = styled.button`
  width: var(--cell-size);
  height: var(--cell-size);
  border-radius: var(--brick-border-radius) 0.2rem 0.2rem 0.2rem;
  margin: var(--cell-margin);

  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 0.6rem;

  background-color: var(--off-white);

  box-shadow: 1px 1px 3px var(--secondary);

  padding: 0;

  -webkit-text-size-adjust: none; /* verhindert automatische Textgrößenanpassung */

  ${(props) =>
    props.$category === "tile" &&
    css`
      background-color: var(--tile);
      color: white;

      width: var(--tile-size);
      height: var(--tile-size);

      margin: var(--tile-margin);

      display: grid;
      grid-template-columns: 10% 50% 25% 15%;
      grid-template-rows: 10% 25% 50% 15%;
    `}

  ${(props) =>
    props.$isChosenTile &&
    css`
      border: solid 0.1rem var(--cell-double-letter);
    `}

  ${(props) =>
    props.$category === "emptyTile" &&
    css`
      background: none;

      backdrop-filter: blur(10px);
      box-shadow: none;

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
      grid-template-columns: 10% 50% 25% 15%;
      grid-template-rows: 10% 25% 50% 15%;
    `}

  ${(props) =>
    props.$category === "playedBoardTile" &&
    css`
      background-color: var(--tile);
      color: white;

      display: grid;
      grid-template-columns: 10% 50% 25% 15%;
      grid-template-rows: 10% 25% 50% 15%;

      transform: scale(1.15);
      z-index: 1;
      box-shadow: none;
      border-radius: 0.2rem;
    `}

    ${(props) =>
    props.$category === "swapField" &&
    css`
      background-color: var(--cell);
      border: inset 2px var(--off-white);

      width: var(--tile-size);
      height: var(--tile-size);

      margin: var(--tile-margin);
    `}

  ${(props) =>
    props.$category === "start" &&
    css`
      background-color: var(--cell-start);
      color: var(--cell-start-color);
      font-size: 8px;
      font-weight: 400;
      text-transform: uppercase;
      overflow: hidden;
    `}

  ${(props) =>
    props.$category === "2B" &&
    css`
      background-color: var(--cell-double-letter);
      color: var(--cell-double-letter-color);
      font-weight: 400;
    `}

    ${(props) =>
    props.$category === "3B" &&
    css`
      background-color: var(--cell-triple-letter);
      color: var(--cell-triple-letter-color);
      font-weight: 400;
    `}

    ${(props) =>
    props.$category === "2W" &&
    css`
      background-color: var(--cell-double-word);
      color: var(--cell-double-word-color);
      font-weight: 400;
    `}

    ${(props) =>
    props.$category === "3W" &&
    css`
      background-color: var(--cell-triple-word);
      color: var(--cell-triple-word-color);
      font-weight: 400;
    `}

    ${(props) =>
    props.$category === "jokerLetter" &&
    css`
      background-color: var(--tile);
      color: white;
    `}
`;
