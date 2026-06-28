import styled from "styled-components";
import { Anchor, Close, Content } from "@radix-ui/react-popover";

export const StyledContent = styled(Content)`
  z-index: 10;
  border-radius: var(--brick-border-radius) 0.2rem 0.2rem 0.2rem;
  border: solid 0.01rem var(--cell);
  backdrop-filter: blur(25px);
  background-color: var(--off-white-less);

  box-shadow: 1px 1px 3px var(--secondary);

  max-width: 70vw;
  height: auto;

  padding: 0.45rem;

  overflow: hidden;
`;
export const StyledLetterList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.2rem;
`;

export const StyledClose = styled(Close)`
  all: unset;
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary);
`;

export const StyledText = styled.p`
  text-align: center;
`;

export const StyledAnchor = styled(Anchor)`
  position: fixed;
  top: 20%;
  left: 50%;
`;
