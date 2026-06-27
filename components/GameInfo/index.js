import Link from "next/link";
import TilebagProgress from "../TilebagProgress";
import {
  StyledGameInfo,
  StyledArrowBack,
  StyledPoints,
  StyledScore,
} from "./GameInfo.styled";

export default function GameInfo({ score, lastMove, tilebag }) {
  return (
    <StyledGameInfo>
      <Link href="/games">
        <StyledArrowBack />
      </Link>
      <StyledPoints>
        <span>Punkte</span>
        <StyledScore>{score}</StyledScore>
      </StyledPoints>
      <StyledPoints>
        <span>Letztes gelegtes Wort</span>
        <StyledScore>
          {lastMove.word} ({lastMove.score})
        </StyledScore>
      </StyledPoints>
      <TilebagProgress tilebag={tilebag} />
    </StyledGameInfo>
  );
}
