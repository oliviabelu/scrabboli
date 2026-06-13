import Brick from "../Brick";
import { CELLS, CATEGORIES } from "@/constants/gameConstants";
import { StyledBoard } from "./Board.styled";

export default function Board({ wordSet, handleClick }) {
  return (
    <StyledBoard>
      {CELLS.map((cellRow) =>
        CELLS.map((cellColumn) => {
          const key = `${cellRow}-${cellColumn}`;
          const category = key in CATEGORIES ? CATEGORIES[key] : null;

          return (
            <Brick
              key={key}
              category={category}
              onClick={() => handleClick(cellRow, cellColumn)}
            />
          );
        })
      )}
    </StyledBoard>
  );
}
