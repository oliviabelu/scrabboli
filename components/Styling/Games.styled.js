import styled from "styled-components";
import { CircularProgress } from "@mui/material";

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
