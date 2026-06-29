import styled from "styled-components";
import { Close, Content } from "@radix-ui/react-popover";

export const StyledContent = styled(Content)`
  z-index: 11;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: var(--off-white);
  border-radius: var(--border-radius);
  border: solid 0.01rem var(--cell);
  backdrop-filter: blur(25px);
  background-color: var(--off-white-less);
  padding: 0.7rem;
  max-width: 70vw;
  box-shadow: 1px 1px 3px var(--secondary);
  overflow: hidden;
`;

export const StyledClose = styled(Close)`
  align-self: flex-end;
  background: none;
  border: none;
  color: var(--secondary);
`;

export const StyledText = styled.p`
  color: var(--secondary);
  margin-top: 0;
  text-align: center;
`;

export const StyledDeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--secondary);
`;
