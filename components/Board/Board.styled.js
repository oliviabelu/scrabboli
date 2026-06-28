import styled from "styled-components";

export const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  align-self: center;
  padding: 0.5rem;
  background-color: var(--cell);
  border-radius: var(--brick-border-radius) 0.2rem 0.2rem 0.2rem;
`;
