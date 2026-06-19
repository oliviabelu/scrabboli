import Brick from "../Brick";
import { CELLNUMBERS, SPECIAL_CELL_TYPES } from "@/constants/gameConstants";
import { StyledBoard } from "./Board.styled";

export default function Board({ cells, chosenTile, handleClick }) {
  return (
    <StyledBoard>
      {CELLNUMBERS.map((cellRow) =>
        CELLNUMBERS.map((cellColumn) => {
          const key = `${cellRow}-${cellColumn}`;
          const cellValue = cells[key];
          const isBoardTile = typeof cells[key] === "object";

          const isSpecialCell = key in cells;
          const isPlayedBoardTile =
            isSpecialCell &&
            typeof cells[key] === "string" &&
            !SPECIAL_CELL_TYPES.includes(cellValue);

          const isChosenTile = key === chosenTile;

          const category =
            isBoardTile || isPlayedBoardTile
              ? "boardTile"
              : (cellValue ?? null);

          const [tileLetter, tileValue] = isPlayedBoardTile
            ? cellValue.split("-")
            : [null, null];

          const letter = isBoardTile
            ? cellValue.letter
            : isPlayedBoardTile
              ? tileLetter
              : "";

          const value = isBoardTile
            ? cellValue.value
            : isPlayedBoardTile
              ? tileValue
              : "";

          return (
            <Brick
              key={key}
              category={category}
              tileLetter={letter}
              tileValue={value}
              isChosenTile={isChosenTile}
              onClick={() => handleClick(cellRow, cellColumn)}
            />
          );
        })
      )}
    </StyledBoard>
  );
}
