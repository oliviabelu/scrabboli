import { Root, Trigger, Portal } from "@radix-ui/react-popover";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledContent,
  StyledClose,
  StyledText,
} from "./ConfirmationPopup.styled";
import { StyledButton } from "../Buttons/Buttons.styled";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles";

export default function ConfirmationPopup({
  onClick,
  content,
  triggerIcon,
  triggerText,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Trigger asChild>
          <StyledButton
            variant="outlined"
            color="cautionColor"
            type="button"
            startIcon={triggerIcon}
          >
            {triggerText}
          </StyledButton>
        </Trigger>
        <Portal>
          <StyledContent
            side="top"
            align="center"
            sideOffset={5}
            avoidCollisions
            collisionPadding={16}
          >
            <StyledClose aria-label="schliessen">
              <CloseIcon />
            </StyledClose>
            <StyledText>{content}</StyledText>
            <StyledButton
              variant="contained"
              color="cautionColor"
              type="button"
              onClick={onClick}
            >
              {triggerText}
            </StyledButton>
          </StyledContent>
        </Portal>
      </Root>
    </ThemeProvider>
  );
}
