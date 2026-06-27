import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";

export const StyledContainer = styled(motion.div)`
  width: 100vw;
  height: 40vh;
  position: fixed;
  bottom: 0px;
  border-top: solid 2px var(--off-white);
  border-top-left-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  backdrop-filter: blur(25px);
  background-color: var(--off-white-less);
`;
export const StyledExitButton = styled.button`
  align-self: flex-end;
  margin: 0.7rem 0.7rem 0 0;
  padding: 0;
  background: none;
  border: none;
  color: var(--secondary);
`;

export const InfoText = styled.p`
  font-size: x-small;
  text-align: center;
  color: var(--secondary);
  margin: 0;
`;
