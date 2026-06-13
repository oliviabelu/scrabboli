import Brick from "../Brick";
import { CELLNUMBERS } from "@/constants/gameConstants";
import { StyledBoard } from "./Board.styled";

export default function Board({ wordSet, handleClick, cells }) {
  return (
    <StyledBoard>
      {CELLNUMBERS.map((cellRow) =>
        CELLNUMBERS.map((cellColumn) => {
          const key = `${cellRow}-${cellColumn}`;
          const cellValue = cells[key];
          const isBoardTile = typeof cells[key] === "object";

          const category = isBoardTile ? "boardTile" : (cellValue ?? null);

          const letter = isBoardTile ? cellValue.letter : "";
          const value = isBoardTile ? cellValue.value : "";

          return (
            <Brick
              key={key}
              category={category}
              tileLetter={letter}
              tileValue={value}
              onClick={() => handleClick(cellRow, cellColumn)}
            />
          );
        })
      )}
    </StyledBoard>
  );
}
