import Divider from "@mui/material/Divider";
import styled from "styled-components";

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const StyledDivider = styled(Divider)`
  && {
    margin: -0.5rem;
  }
`;
