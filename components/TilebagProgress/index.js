import "react-circular-progressbar/dist/styles.css";
import {
  StyledCircularProgressbarWithChildren,
  StyledTilebagWrapper,
  StyledTilebagNumber,
} from "./TilebagProgress.styled";
import { buildStyles } from "react-circular-progressbar";
import Image from "next/image";

export default function TilebagProgress({ tilebag }) {
  return (
    <StyledCircularProgressbarWithChildren
      value={tilebag.length}
      maxValue={102}
      styles={buildStyles({
        pathColor: "var(--tile)",
        trailColor: "var(--cell)",
        textColor: "var(--tile)",
        textSize: "1.5rem",
        strokeLinecap: "round",
      })}
    >
      <StyledTilebagWrapper>
        <Image src="/poly-bag.png" alt="tilebag" width={30} height={30} />
        <StyledTilebagNumber>{tilebag.length}</StyledTilebagNumber>
      </StyledTilebagWrapper>
    </StyledCircularProgressbarWithChildren>
  );
}
