export default function GameNavBar({ onRecall, onPlay }) {
  return (
    <>
      <button type="button" onClick={onRecall}>
        zurückziehen
      </button>
      <button type="button" onClick={onPlay}>
        Spielen
      </button>
    </>
  );
}
