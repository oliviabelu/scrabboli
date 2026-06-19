import { TILES, TILENUMBERS } from "@/constants/gameConstants";

export function drawTilesFromTilebag(tiles, tilebag) {
  const rack = !tiles ? TILENUMBERS : tiles;

  let currentTilebag = [...tilebag];

  const drawnTiles = rack.map((rackTile) => {
    if (typeof rackTile === "number" || rackTile.isPlayed) {
      const randomIndex = Math.floor(Math.random() * currentTilebag.length);
      const drawnTile = currentTilebag[randomIndex];
      currentTilebag = currentTilebag.toSpliced(randomIndex, 1);

      return { ...drawnTile, isPlayed: false };
    }
    return rackTile;
  });
  return { drawnTiles, currentTilebag };
}

export function checkConsecutiveNumbers(numbers) {
  const sortedNumbers = [...numbers].map(Number).sort((a, b) => a - b);
  for (let index = 1; index < sortedNumbers.length; index++) {
    if (sortedNumbers[index] - sortedNumbers[index - 1] !== 1) {
      return false;
    }
  }
  return true;
}

export function createTilebag() {
  return Object.entries(TILES).flatMap(([letter, { count, value }]) =>
    Array(count).fill({ letter, value })
  );
}

export function splitBrickName(name) {
  return name.split("-").map(Number);
}
