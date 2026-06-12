import Brick from "../Brick";
import styled from "styled-components";

const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const categories = {
  "1-8": "2B",
  "3-5": "2B",
  "3-11": "2B",
  "4-4": "2B",
  "4-12": "2B",
  "5-3": "2B",
  "5-13": "2B",
  "6-8": "2B",
  "8-1": "2B",
  "8-6": "2B",
  "8-10": "2B",
  "8-15": "2B",
  "10-8": "2B",
  "11-3": "2B",
  "11-13": "2B",
  "12-4": "2B",
  "12-12": "2B",
  "13-5": "2B",
  "13-11": "2B",
  "15-8": "2B",
  "1-1": "3B",
  "1-15": "3B",
  "2-7": "3B",
  "2-9": "3B",
  "5-6": "3B",
  "5-10": "3B",
  "6-5": "3B",
  "6-11": "3B",
  "7-2": "3B",
  "7-14": "3B",
  "8-8": "start",
  "9-2": "3B",
  "9-14": "3B",
  "10-5": "3B",
  "10-11": "3B",
  "11-6": "3B",
  "11-10": "3B",
  "14-7": "3B",
  "14-9": "3B",
  "15-1": "3B",
  "15-15": "3B",
  "2-2": "2W",
  "2-14": "2W",
  "4-8": "2W",
  "8-4": "2W",
  "8-12": "2W",
  "12-8": "2W",
  "14-2": "2W",
  "14-14": "2W",
  "1-4": "3W",
  "1-12": "3W",
  "4-1": "3W",
  "4-15": "3W",
  "12-1": "3W",
  "12-15": "3W",
  "15-4": "3W",
  "15-12": "3W",
};

export default function Board({ wordSet }) {
  return (
    <StyledBoard>
      {cells.map((cellRow) =>
        cells.map((cellColumn) => {
          const key = `${cellRow}-${cellColumn}`;
          const category = key in categories ? categories[key] : null;

          return <Brick key={key} category={category} />;
        })
      )}
    </StyledBoard>
  );
}

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  gap: var(--board-gap);
`;
