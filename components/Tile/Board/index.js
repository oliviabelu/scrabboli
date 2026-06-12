import Tile from "..";
import styled from "styled-components";

const tiles = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
];

const categories = {
  ah: "2B",
  ce: "2B",
  ck: "2B",
  dd: "2B",
  dl: "2B",
  ec: "2B",
  em: "2B",
  fh: "2B",
  ha: "2B",
  hf: "2B",
  hj: "2B",
  ho: "2B",
  jh: "2B",
  kc: "2B",
  km: "2B",
  ld: "2B",
  ll: "2B",
  me: "2B",
  mk: "2B",
  oh: "2B",
  aa: "3B",
  ao: "3B",
  bg: "3B",
  bi: "3B",
  ef: "3B",
  ej: "3B",
  fe: "3B",
  fk: "3B",
  gb: "3B",
  gn: "3B",
  hh: "start",
  ib: "3B",
  in: "3B",
  je: "3B",
  jk: "3B",
  kf: "3B",
  kj: "3B",
  ng: "3B",
  ni: "3B",
  oa: "3B",
  oo: "3B",
  bb: "2W",
  bn: "2W",
  dh: "2W",
  hd: "2W",
  hl: "2W",
  lh: "2W",
  nb: "2W",
  nn: "2W",
  ad: "3W",
  al: "3W",
  da: "3W",
  do: "3W",
  la: "3W",
  lo: "3W",
  od: "3W",
  ol: "3W",
};

export default function Board({ wordSet }) {
  return (
    <StyledBoard>
      {tiles.map((tileRow) =>
        tiles.map((tileColumn) => {
          const key = tileRow.concat(tileColumn);
          const category = key in categories ? categories[key] : "";

          return <Tile key={key} category={category} />;
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
