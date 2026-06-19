export default function GameNavBar({ onRecall, onPlayClick }) {
  return (
    <>
      <button type="button" onClick={onRecall}>
        zurückziehen
      </button>
      <button type="button" onClick={onPlayClick}>
        Spielen
      </button>
    </>
  );
}
