import styled from "styled-components";

export const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  padding: 0.5rem;
  background-color: var(--cell);
  border-top-left-radius: var(--brick-border-radius);
`;
