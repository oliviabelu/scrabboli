import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100vw;
  height: 40vh;
  background-color: var(--off-white);
  position: fixed;
  bottom: 0px;
  border-top: solid 2px var(--tile);
  border-top-left-radius: 15px;
  display: flex;
  flex-direction: column;
`;
export const StyledExitButton = styled.button`
  align-self: flex-end;
  margin: 0.7rem;
  padding: 0;
  background: none;
  border: none;
`;
