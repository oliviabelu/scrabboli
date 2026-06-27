import styled from "styled-components";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)`
  && {
    border-top-left-radius: var(--brick-border-radius);
    box-shadow: 1px 1px 3px var(--secondary);
  }
  max-width: fit-content;
`;
