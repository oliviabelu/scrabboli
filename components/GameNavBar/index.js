import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function GameNavBar({
  onRecall,
  onPlayClick,
  onSwapTilesClick,
  currentMove,
}) {
  return (
    <>
      <Stack direction="column" spacing={1}>
        <Button
          variant="outlined"
          color={`$var(--tile)`}
          type="button"
          onClick={onRecall}
          disabled={currentMove.length === 0}
        >
          zurückziehen
        </Button>
        <Button
          variant="outlined"
          color={`$var(--tile)`}
          type="button"
          onClick={onSwapTilesClick}
        >
          Tauschen
        </Button>
        <Button
          variant="outlined"
          color="var(--cell-start)"
          type="button"
          onClick={onPlayClick}
        >
          Spielen
        </Button>
      </Stack>
    </>
  );
}
