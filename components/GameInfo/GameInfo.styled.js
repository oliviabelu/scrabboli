import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const StyledGameInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0;
`;

export const StyledArrowBack = styled(ArrowBackIcon)`
  color: var(--secondary);
`;

export const StyledPoints = styled.div`
  color: var(--secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledScore = styled.span`
  font-weight: 700;
`;
