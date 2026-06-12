import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {

//variables
--brick-size: 6vw;
--brick-border-radius: 0.2rem;

--cell: #d8d8d8;

--tile: #5bb644;



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
