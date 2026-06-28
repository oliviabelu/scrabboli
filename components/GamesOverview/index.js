import GameList from "../GameList";

export default function GamesOverview({ games }) {
  const activeGames = games.filter((game) => game.status === "active");
  const finishedGames = games.filter((game) => game.status === "finished");

  return (
    <>
      <GameList title={"Angefangene Spiele"} games={activeGames} />
      {finishedGames.length !== 0 && (
        <GameList title={"Beendete Spiele"} games={finishedGames} />
      )}
    </>
  );
}
