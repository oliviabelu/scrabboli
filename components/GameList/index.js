import Link from "next/link";
import {
  StyledTopic,
  StyledList,
  StyledListItem,
  StyledLink,
  ListWrapper,
  GameWrapper,
} from "./GameList.styled";

export default function GameList({ title, games }) {
  console.log(games);
  return (
    <ListWrapper>
      <StyledTopic>{title}</StyledTopic>
      <StyledList>
        {games.map((game, index) => (
          <StyledListItem key={game._id}>
            {console.log(game)}
            <StyledLink href={`/games/${game._id}`}>
              Spiel {index + 1}
            </StyledLink>{" "}
            <GameWrapper>
              <span>
                Anzahl gespielter Wörter:{" "}
                {game.moves.length === 0 ? 0 : game.moves.length}
              </span>
              {game.moves.length !== 0 && (
                <>
                  <span>Punkte: {game.players[0].score}</span>

                  <span>Erstes Wort: {game.moves[0].word}</span>
                </>
              )}
            </GameWrapper>
          </StyledListItem>
        ))}
      </StyledList>
    </ListWrapper>
  );
}
