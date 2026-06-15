import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {

//variables
--cell-size: 6vw;
--tile-size: 10vw;
--brick-border-radius: 0.5rem;

--cell: #d8d8d8;
--cell-margin: 0.05rem;;

--tile: #5bb644;
--tile-margin: 0.2rem;

--tile-empty : #ffffff;

--cell-start: #ffe138;
--cell-start-color: #8b7700;

--cell-double-letter: #fffacb;
--cell-double-letter-color: #c9b500;

--cell-triple-letter: #cfffdd;
--cell-triple-letter-color: #009e2f;

--cell-double-word: #bee4fa;
--cell-double-word-color: #0065a0;

--cell-triple-word: #e8c6fc;
--cell-triple-word-color: #6600a1;

}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: system-ui;
  }
`;
