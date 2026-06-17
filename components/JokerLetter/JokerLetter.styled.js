import styled from "styled-components";
import { Close } from "@radix-ui/react-popover";

export const StyledContent = styled.div`
  border: solid 0.1rem grey;
  backdrop-filter: blur(10px);

  max-width: 50vw;
  height: auto;

  overflow: hidden;
`;
export const StyledLetterList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledClose = styled(Close)`
  all: unset;
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const StyledAnchor = styled.div`
  //position: absolute;
  /* top: 200;
  left: 100; */
`;
