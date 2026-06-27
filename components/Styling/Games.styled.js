import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import Divider from "@mui/material/Divider";
import { StyledButton } from "../Buttons/Buttons.styled";

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
  //justify-self: center;
`;
export const StyledLogoutButton = styled(StyledButton)`
  align-self: flex-end;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: 1.25rem;
  margin-right: 1.25rem;
`;

export const StyledDivider = styled(Divider)`
  && {
    width: 100%;
    border-color: var(--secondary);
    margin-top: 1.5rem;
    opacity: 0.5;
  }
`;
