import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwitchAccessShortcutOutlinedIcon from "@mui/icons-material/SwitchAccessShortcutOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { NavBarContainer, StyledStack } from "./GameNavBar.styled";
import { StyledButton, StyledPlainButton } from "../Buttons/Buttons.styled";
import ConfirmationPopup from "../ConfirmationPopup";

export default function GameNavBar({
  onRecall,
  onPlayClick,
  onSwapTilesClick,
  onShuffle,
  onFinishGame,
  currentMove,
  status,
}) {
  return (
    <NavBarContainer>
      <ThemeProvider theme={theme}>
        <StyledStack direction="row" spacing={1}>
          {status !== "finished" && (
            <ConfirmationPopup
              onClick={onFinishGame}
              content="Möchtest du dieses Spiel wirklich beenden?"
              triggerIcon={<CloseIcon />}
              triggerText="beenden"
            />
          )}
          {currentMove.length !== 0 ? (
            <StyledButton
              variant="outlined"
              color="mainColor"
              type="button"
              startIcon={<KeyboardArrowDownIcon />}
              onClick={onRecall}
              disabled={status === "finished"}
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
              disabled={status === "finished"}
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
            disabled={status === "finished"}
          >
            tauschen
          </StyledButton>
          <StyledPlainButton
            variant="contained"
            color="mainColor"
            type="button"
            onClick={onPlayClick}
            disabled={status === "finished"}
          >
            spielen
          </StyledPlainButton>
        </StyledStack>
      </ThemeProvider>
    </NavBarContainer>
  );
}
