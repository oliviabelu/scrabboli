import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`


:root {

//variables
--cell-size: 6vw;
--tile-size: 10vw;
--brick-border-radius: 0.5rem;

--cell:  #fff1e4;// #f1f1f1;
--cell-margin: 0.05rem;;

--tile: #45867d;// #528645;
--tile-margin: 0.2rem;

--tile-empty : var(--off-white); // #ffffff;

--cell-start: #fff4b3;
--cell-start-color: #3b3200;

--cell-double-letter: #faf4c1;
--cell-double-letter-color: #463b00; //#ccae03;

--cell-triple-letter: #ddfff8;
--cell-triple-letter-color: #003121; // #009e69;

--cell-double-word: #bfdcec;
--cell-double-word-color: #002b44; //#0065a0;

--cell-triple-word: #fcd3dd;
--cell-triple-word-color: #38000e; //#b1445f;

--off-white: #fdf9f5;
}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: system-ui; // var(--font-rubik);
    background-color: var(--off-white);
  }
`;
