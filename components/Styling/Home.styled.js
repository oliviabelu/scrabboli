import styled from "styled-components";

export const StyledTitle = styled.h1`
  text-align: center;
  text-transform: uppercase;
  color: var(--tile);
  font-size: var(--title-size);
  line-height: var(--title-line-height);
  margin: 0;
  padding: var(--title-padding);

  position: absolute;
  inset: 0;
  height: 200%;
  background: linear-gradient(
    to bottom,
    var(--cell-triple-letter) 0%,
    transparent 50%
  );
  backdrop-filter: blur(16px);
  mask-image: linear-gradient(to bottom, black 0% 50%, transparent 50% 100%);
  /*---damit die Fläche unter dem Blur klickbar ist */
  pointer-events: none;
  -webkit-backdrop-filter: blur(16px);
  -webkit-mask-image: linear-gradient(
    to bottom,
    black 0% 50%,
    transparent 50% 100%
  );
`;

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 2;
  width: 100%;
  padding: 2rem;
  height: var(--title-height);
`;

export const StyledIntroduction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledMain = styled.main`
  margin-top: var(--title-height);

  /* top: var(--title-height); */

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: 1.25rem;
  margin-right: 1.25rem;
`;
