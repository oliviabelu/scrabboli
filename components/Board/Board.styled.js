import styled from "styled-components";

export const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  align-self: center;
  padding: 0.5rem;
  background: radial-gradient(
    /* 360deg, */ var(--off-white) 0%,
    var(--cell-triple-letter) 100%
  ); //var(--cell);
  border-radius: var(--brick-border-radius) 0.2rem 0.2rem 0.2rem;
  box-shadow: 2px 2px 8px var(--secondary);
`;
