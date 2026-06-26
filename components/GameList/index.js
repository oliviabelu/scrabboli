import { useRouter } from "next/router";

export default function GameList({ title, games }) {
  const router = useRouter();

  function handleOpenGame(id) {
    router.push(`/games/${id}`);
  }

  return (
    <>
      <h3>{title}</h3>
      <ul>
        {games.map((game) => (
          <li key={game._id} onClick={() => handleOpenGame(game._id)}>
            {game.status}
          </li>
        ))}
      </ul>
    </>
  );
}
