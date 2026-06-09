import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {

//variables
--tile-size: 2rem;

--tile-player: #5bb644;
--tile-board: #d8d8d8;
--tile-double-letter: #fff59b;
--tile-double-letter-color: #c9b500;

--tile-triple-letter: #9cfab8;
--tile-triple-letter-color: #009e2f;

--tile-double-word: #8bd1fa;
--tile-double-word-color: #0065a0;

--tile-triple-word: #dfa7ff;
--tile-triple-word-color: #6600a1;

--tile-border-radius: 0.2rem;
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
