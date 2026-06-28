import DeleteConfirmation from "../DeleteConfirmation";
import {
  StyledTopic,
  StyledList,
  StyledListItem,
  StyledLink,
  ListWrapper,
  GameInfoWrapper,
  GameHeaderWrapper,
} from "./GameList.styled";

export default function GameList({ title, games, onDelete }) {
  function getLongestWord(moves) {
    let longestWord = "";

    moves.forEach((move) =>
      move.word.length > longestWord.length ? (longestWord = move.word) : null
    );
    return longestWord;
  }

  return (
    <ListWrapper>
      <StyledTopic>{title}</StyledTopic>
      <StyledList>
        {games.map((game) => (
          <StyledListItem key={game._id}>
            <GameHeaderWrapper>
              <StyledLink href={`/games/${game._id}`}>
                Spiel vom {new Date(game.createdAt).toLocaleDateString("de-DE")}
              </StyledLink>
              <DeleteConfirmation onDelete={() => onDelete(game._id)} />
            </GameHeaderWrapper>
            <GameInfoWrapper>
              <span>
                Anzahl gespielter Wörter:
                {game.moves.length === 0 ? 0 : game.moves.length}
              </span>
              {game.moves.length !== 0 && (
                <>
                  <span>Punkte: {game.players[0].score}</span>

                  <span>Erstes Wort: {game.moves[0].word}</span>
                  {game.moves.length > 1 && (
                    <span>Längstes Wort: {getLongestWord(game.moves)}</span>
                  )}
                </>
              )}
            </GameInfoWrapper>
          </StyledListItem>
        ))}
      </StyledList>
    </ListWrapper>
  );
}
