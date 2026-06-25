import mongoose from "mongoose";

const { Schema } = mongoose;
const gameSchema = new Schema(
  {
    status: { type: String, required: true },
    players: [
      {
        playerId: { type: Schema.Types.ObjectId, ref: "Player" },
        score: { type: Number },
        tiles: [
          {
            letter: { type: String },
            value: { type: Number },
          },
        ],
        isCurrentTurn: { type: Boolean },
      },
    ],
    cells: [
      {
        position: { type: String, required: true },
        value: { type: String, required: true },
        playedBy: { type: Schema.Types.ObjectId, ref: "Player" },
      },
    ],
    tilebag: [
      {
        letter: { type: String },
        value: { type: Number },
      },
    ],
    moves: [
      {
        playerId: { type: Schema.Types.ObjectId, ref: "Player" },
        word: { type: String },
        tiles: [
          {
            position: { type: String },
            value: { type: String },
          },
        ],
        score: { type: Number },
        timestamp: { type: Date },
      },
    ],
    winnerId: { type: Schema.Types.ObjectId, ref: "Player" },
  },
  { timestamps: true }
);
const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
