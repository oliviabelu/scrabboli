import { createGlobalStyle } from "styled-components";
import { createTheme } from "@mui/material/styles";

const TILE_COLOR = "#45867d";

export const theme = createTheme({
  palette: {
    mainColor: {
      main: TILE_COLOR,
      contrastText: "#fdfaf6",
    },
  },
});

export default createGlobalStyle`


:root {

//variables
--cell-size: 5.5vw;
--tile-size: 10vw;
--brick-border-radius: 0.8rem;

--cell:  #fff1e4;
--cell-margin: 0.05rem;;

--tile: ${TILE_COLOR};
--tile-margin: 0.2rem;

--tile-empty : var(--off-white); 

--cell-start:  #6ddacb;
--cell-start-color:  #2d5a54;

--cell-double-letter: #faf4c1;
--cell-double-letter-color: #463b00;

--cell-triple-letter: #ddfff8;
--cell-triple-letter-color: #003121; 

--cell-double-word: #bfdcec;
--cell-double-word-color: #002b44; 

--cell-triple-word: #fcd3dd;
--cell-triple-word-color: #38000e;

--off-white: hsl(30, 67%, 98%);
--off-white-less: hsla(30, 60%, 98%, 0.25);

--secondary:  #464646;
}
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 1rem 0.5rem;
    padding: 0;
    font-family: system-ui; // var(--font-rubik);
    background-color: var(--off-white);
  }

  html {
    margin:0;
  }
`;
