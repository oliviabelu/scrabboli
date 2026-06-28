import { Root, Trigger, Portal, Close } from "@radix-ui/react-popover";
import CloseIcon from "@mui/icons-material/Close";

import { Trash2 } from "lucide-react";
import {
  StyledContent,
  StyledClose,
  StyledText,
  StyledDeleteButton,
} from "./DeleteConfirmation.styled";
import { StyledPlainButton } from "../Buttons/Buttons.styled";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles";

export default function DeleteConfirmation({ onDelete }) {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Trigger asChild>
          <StyledDeleteButton type="button">
            <Trash2 />
          </StyledDeleteButton>
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
            <StyledText>Möchtest du dieses Spiel wirklich löschen?</StyledText>
            <StyledPlainButton
              variant="contained"
              color="mainColor"
              type="button"
              startIcon={<Trash2 />}
              onClick={onDelete}
            >
              Löschen
            </StyledPlainButton>
          </StyledContent>
        </Portal>
      </Root>
    </ThemeProvider>
  );
}
