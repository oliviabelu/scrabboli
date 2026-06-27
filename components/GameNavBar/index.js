import { ThemeProvider } from "@mui/material/styles";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { theme } from "@/styles";
import { NavBarContainer, StyledStack } from "./GameNavBar.styled";
import { StyledButton } from "../Buttons/Buttons.styled";

export default function GameNavBar({
  onRecall,
  onPlayClick,
  onSwapTilesClick,
  currentMove,
}) {
  return (
    <NavBarContainer>
      <ThemeProvider theme={theme}>
        <StyledStack direction="row" spacing={1}>
          <StyledButton
            variant="outlined"
            color="mainColor"
            type="button"
            startIcon={<KeyboardArrowDownIcon />}
            onClick={onRecall}
            disabled={currentMove.length === 0}
          >
            zurückziehen
          </StyledButton>
          <StyledButton
            variant="outlined"
            color="mainColor"
            type="button"
            startIcon={<SwapVertIcon />}
            onClick={onSwapTilesClick}
          >
            tauschen
          </StyledButton>
          <StyledButton
            variant="contained"
            color="mainColor"
            type="button"
            onClick={onPlayClick}
          >
            spielen
          </StyledButton>
        </StyledStack>
      </ThemeProvider>
    </NavBarContainer>
  );
}
