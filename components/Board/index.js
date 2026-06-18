import Brick from "../Brick";
import { CELLNUMBERS } from "@/constants/gameConstants";
import { StyledBoard } from "./Board.styled";

export default function Board({ cells, chosenTile, handleClick }) {
  const validations = ["2B", "3B", "2W", "3W", "start"];
  return (
    <StyledBoard>
      {CELLNUMBERS.map((cellRow) =>
        CELLNUMBERS.map((cellColumn) => {
          const key = `${cellRow}-${cellColumn}`;
          const cellValue = cells[key];
          console.log(cellValue);
          const isBoardTile = typeof cells[key] === "object";

          const isSpecialCell = key in cells;
          const isPlayedBoardTile =
            isSpecialCell &&
            typeof cells[key] === "string" &&
            (!validations.includes(cellValue) ?? false);

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
