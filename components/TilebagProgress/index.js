import "react-circular-progressbar/dist/styles.css";
import { StyledCircularProgressbar } from "./TilebagProgress.styled";
import { buildStyles } from "react-circular-progressbar";

export default function TilebagProgress({ tilebag }) {
  return (
    <StyledCircularProgressbar
      value={tilebag.length}
      maxValue={102}
      text={`${tilebag.length}`}
      styles={buildStyles({
        pathColor: "var(--tile)",
        trailColor: "var(--cell)",
        textColor: "var(--tile)",
        textSize: "2.5rem",
        strokeLinecap: "round",
      })}
    ></StyledCircularProgressbar>
  );
}
