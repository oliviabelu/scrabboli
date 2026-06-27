import styled from "styled-components";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)`
  && {
    border-top-left-radius: var(--brick-border-radius);
    box-shadow: 1px 1px 3px var(--secondary);
    max-width: fit-content;
    white-space: nowrap; // verhindert Umbruch
    min-width: 0; // erlaubt Button kleiner als MUI-Standard zu werden
    font-size: clamp(
      0.6rem,
      2vw,
      0.875rem
    ); // Schriftgröße passt sich ans Gerät an
  }
`;
