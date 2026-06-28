import GameList from "../GameList";

export default function GamesOverview({ games, handleDelete }) {
  const activeGames = games.filter((game) => game.status === "active");
  const finishedGames = games.filter((game) => game.status === "finished");

  return (
    <>
      <GameList
        title={"Angefangene Spiele"}
        games={activeGames}
        onDelete={handleDelete}
      />
      {finishedGames.length !== 0 && (
        <GameList
          title={"Beendete Spiele"}
          games={finishedGames}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
