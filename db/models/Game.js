import mongoose from "mongoose";

const { Schema } = mongoose;
const gameSchema = new Schema({
  status: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  players: {
    playerId: { type: [Schema.Types.ObjectId], ref: "Player" },
    score: { type: Number },
    tiles: [{ type: String }],
    isCurrentTurn: { type: Boolean },
  },
  board: {
    cells: [
      {
        row: { type: String },
        column: { type: String },
        letter: { type: String },
        playedBy: {},
      },
    ],
  },
  tilebag: [{ types: String }],
  moves: [
    {
      playerId: { type: [Schema.Types.ObjectId], ref: "Player" },
      word: { type: String },
      tiles: [
        {
          row: { type: String },
          column: { type: String },
          letter: { type: String },
        },
      ],
      score: { type: Number },
      timestamp: { type: Date },
    },
  ],
  winnerId: { type: [Schema.Types.ObjectId], ref: "Player" },
});
const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
