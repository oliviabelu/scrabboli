import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {

//variables
--tile-size: 6vw;

--tile-player: #5bb644;
--tile-board: #d8d8d8;

--tile-start: #ffe138;
--tile-start-color: #8b7700;

--tile-double-letter: #fffacb;
--tile-double-letter-color: #c9b500;

--tile-triple-letter: #cfffdd;
--tile-triple-letter-color: #009e2f;

--tile-double-word: #bee4fa;
--tile-double-word-color: #0065a0;

--tile-triple-word: #e8c6fc;
--tile-triple-word-color: #6600a1;

--tile-border-radius: 0.2rem;

--board-gap: 1px;
}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
  }
`;
