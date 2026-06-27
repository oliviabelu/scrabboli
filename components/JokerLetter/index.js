import { Root, Portal, Content, Anchor } from "@radix-ui/react-popover";

import CloseIcon from "@mui/icons-material/Close";
import Brick from "../Brick";
import {
  StyledContent,
  StyledLetterList,
  StyledClose,
  StyledText,
  StyledAnchor,
} from "./JokerLetter.styled";
import { ALPHABET } from "@/constants/gameConstants";
import { useState } from "react";

export default function JokerLetter({ onClick, onClose }) {
  const [popoverOpen, setPopoverOpen] = useState(true);

  function handleLetterClick(letter) {
    setPopoverOpen(false);
    onClick(letter);
  }

  function handleOpenChange(open) {
    setPopoverOpen(open);
    if (!open) onClose();
  }

  return (
    <Root open={popoverOpen} onOpenChange={handleOpenChange}>
      <StyledAnchor />
      <Portal>
        <StyledContent>
          <StyledText>Buchstabe wählen</StyledText>
          <StyledLetterList>
            {ALPHABET.map((letter) => (
              <li key={letter}>
                <Brick
                  category={"jokerLetter"}
                  tileLetter={letter}
                  onClick={() => handleLetterClick(letter)}
                />
              </li>
            ))}
          </StyledLetterList>

          <StyledClose aria-label="schliessen">
            <CloseIcon />
          </StyledClose>
        </StyledContent>
      </Portal>
    </Root>
  );
}
