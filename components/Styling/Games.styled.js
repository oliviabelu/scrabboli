import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import Divider from "@mui/material/Divider";
import { StyledButton, StyledPlainButton } from "../Buttons/Buttons.styled";

export const StyledIntroduction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledCircularProgress = styled(CircularProgress)`
  && {
    color: var(--tile);
  }
`;

export const StyledHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledGreeting = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledLogoutButton = styled(StyledButton)`
  align-self: flex-start;
  position: relative;
`;

export const StyledButtonWrapper = styled.div`
  position: sticky;
  top: calc(var(--title-height) + 1rem);
  align-self: flex-end;
  z-index: 10;
`;

export const StyledDivider = styled(Divider)`
  && {
    width: 100%;
    border-color: var(--secondary);
    margin-top: 1.5rem;
    opacity: 0.5;
  }
`;

export const StyledName = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledNewGameButton = styled(StyledPlainButton)`
  && {
    font-size: 1rem;
  }
`;
