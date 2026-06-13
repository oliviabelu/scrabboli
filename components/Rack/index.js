import { handleClientScriptLoad } from "next/script";
import Brick from "../Brick";
import { StyledTileList } from "./Rack.styled";
import { useEffect, useState } from "react";

const tileNumbers = [1, 2, 3, 4, 5, 6, 7];

export default function Rack({ tilebag, onUpdateTilebag, handleClick }) {
  const [rackTiles, setRackTiles] = useState([]);

  useEffect(() => {
    const chosenTiles = tileNumbers.map(() => {
      const randomIndex = Math.floor(Math.random() * tilebag.length);
      return tilebag[randomIndex];
    });
    setRackTiles(chosenTiles);
    updateTilebag(chosenTiles);
  }, []);

  function updateTilebag(tiles) {
    onUpdateTilebag(tiles);
  }

  // function handleTileClick(letter) {
  //   handleClick(letter, index);
  // }

  return (
    <StyledTileList>
      {rackTiles.map((rackTile, index) => (
        <li key={index}>
          <Brick
            category={"tile"}
            tileLetter={rackTile.letter}
            tileValue={rackTile.value}
            onClick={() => handleClick(rackTile.letter, index)}
          />
        </li>
      ))}
    </StyledTileList>
  );
}
