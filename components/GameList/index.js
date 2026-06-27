import Link from "next/link";

export default function GameList({ title, games }) {
  return (
    <>
      <h3>{title}</h3>
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <Link href={`/games/${game._id}`}>{game.status}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
