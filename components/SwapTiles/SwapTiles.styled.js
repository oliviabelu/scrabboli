import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled(motion.div)`
  width: 100vw;
  height: 40vh;
  position: fixed;
  bottom: 0px;
  border-top: solid 2px var(--tile);
  border-top-left-radius: 15px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(25px);
  background-color: var(--off-white-less);
`;
export const StyledExitButton = styled.button`
  align-self: flex-end;
  margin: 0.7rem;
  padding: 0;
  background: none;
  border: none;
`;
