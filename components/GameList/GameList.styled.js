import styled from "styled-components";
import Link from "next/link";

export const StyledTopic = styled.h3`
  margin-top: 0;
`;

export const StyledList = styled.ul`
  list-style: none;
  margin: 0;
`;

export const StyledListItem = styled.li``;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--secondary);
  font-weight: 600;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  background: linear-gradient(
    to bottom,
    var(--cell-triple-letter) 0%,
    transparent 100%
  );
  width: 90%;
  height: auto;

  border-radius: var(--brick-border-radius) 0.2rem 0.2rem 0.2rem;
  box-shadow: 2px 2px 10px var(--secondary);

  margin: 1rem;
  padding: 1rem;
  overflow: hidden;
`;

export const GameInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  font-size: 0.7rem;
`;

export const GameHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
