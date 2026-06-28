import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwitchAccessShortcutOutlinedIcon from "@mui/icons-material/SwitchAccessShortcutOutlined";
import { NavBarContainer, StyledStack } from "./GameNavBar.styled";
import { StyledButton, StyledPlainButton } from "../Buttons/Buttons.styled";

export default function GameNavBar({
  onRecall,
  onPlayClick,
  onSwapTilesClick,
  onShuffle,
  currentMove,
}) {
  return (
    <NavBarContainer>
      <ThemeProvider theme={theme}>
        <StyledStack direction="row" spacing={1}>
          {currentMove.length !== 0 ? (
            <StyledButton
              variant="outlined"
              color="mainColor"
              type="button"
              startIcon={<KeyboardArrowDownIcon />}
              onClick={onRecall}
              // disabled={currentMove.length === 0}
            >
              zurückziehen
            </StyledButton>
          ) : (
            <StyledButton
              variant="outlined"
              color="mainColor"
              type="button"
              startIcon={<SwitchAccessShortcutOutlinedIcon />}
              onClick={onShuffle}
            >
              mischen
            </StyledButton>
          )}
          <StyledButton
            variant="outlined"
            color="mainColor"
            type="button"
            startIcon={<SwapVertIcon />}
            onClick={onSwapTilesClick}
          >
            tauschen
          </StyledButton>
          <StyledPlainButton
            variant="contained"
            color="mainColor"
            type="button"
            onClick={onPlayClick}
          >
            spielen
          </StyledPlainButton>
        </StyledStack>
      </ThemeProvider>
    </NavBarContainer>
  );
}
