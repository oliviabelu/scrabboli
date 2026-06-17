import {
  Root,
  Trigger,
  Portal,
  Content,
  Anchor,
} from "@radix-ui/react-popover";
import { CircleX } from "lucide-react";
import Brick from "../Brick";
import {
  StyledContent,
  StyledLetterList,
  StyledClose,
  StyledAnchor,
} from "./JokerLetter.styled";
import { ALPHABET } from "@/constants/gameConstants";
import { useState } from "react";

export default function JokerLetter({ onClick }) {
  const [popoverOpen, setPopoverOpen] = useState(true);

  function handleLetterClick(letter) {
    setPopoverOpen(false);
    onClick(letter);
  }
  return (
    <Root open={popoverOpen} onOpenChange={setPopoverOpen}>
      <Anchor>
        <StyledAnchor />
      </Anchor>
      <Portal>
        <Content>
          <StyledContent>
            <p>Buchstabe wählen</p>
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
              <CircleX />
            </StyledClose>
          </StyledContent>
        </Content>
      </Portal>
    </Root>
  );
}
