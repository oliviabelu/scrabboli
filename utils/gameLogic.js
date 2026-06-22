import {
  TILES,
  TILENUMBERS,
  SPECIAL_CELL_TYPES,
  CATEGORIES,
} from "@/constants/gameConstants";

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

export function isPlayedTile(key, cells) {
  return (
    key in cells &&
    typeof cells[key] === "string" &&
    !SPECIAL_CELL_TYPES.includes(cells[key])
  );
}

export function getLettersFromCell(positions, cells, getKey) {
  return positions.map((position) => {
    const key = getKey(position);
    const tile = cells[key];
    return typeof tile === "string" ? tile.slice(0, 1) : tile.letter;
  });
}

export function calculateWordScore(positions, cells, getKey) {
  let multiply = [];

  const values = positions.map((position) => {
    const key = getKey(position);
    const tile = cells[key];

    let value = 0;

    if (typeof tile === "string") {
      [, value] = splitBrickName(tile);
      value = Number(value);
    }
    if (typeof tile === "object") {
      value = tile.value;

      if (key in CATEGORIES) {
        switch (CATEGORIES[key]) {
          case "2B":
            value = 2 * value;
            break;
          case "3B":
            value = 3 * value;
            break;
          case "2W":
            multiply.push(2);
            break;
          case "3W":
            multiply.push(3);
            break;
          case "start":
            multiply.push(2);
            break;
        }
      }
    }
    return value;
  });

  const sum = values.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  const wordMultiplier = multiply.reduce(
    (accumulator, currentValue) => accumulator * currentValue,
    1
  );
  return sum * wordMultiplier;
}
