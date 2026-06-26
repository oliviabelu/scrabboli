import GameList from "../GameList";

export default function GamesOverview({ games }) {
  const activeGames = [];
  const finishedGames = [];

  games.forEach((game) => {
    if (game.status === "active") {
      activeGames.push(game);
      return;
    }
    if (game.status === "finished") {
      finishedGames.push(game);
      return;
    }
  });

  return (
    <>
      <GameList title={"Angefangene Spiele"} games={activeGames} />
      <GameList title={"Beendete Spiele"} games={finishedGames} />
    </>
  );
}
