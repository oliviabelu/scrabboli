import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import styled from "styled-components";

export const StyledCircularProgressbarWithChildren = styled(
  CircularProgressbarWithChildren
)`
  width: 60px;
`;

export const StyledTilebagWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTilebagNumber = styled.span`
  position: absolute;
  bottom: -0.02rem;
  left: 0.45rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--secondary);
`;
