import mongoose from "mongoose";

const { Schema } = mongoose;
const gameSchema = new Schema(
  {
    status: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    players: [
      {
        playerId: { type: Schema.Types.ObjectId, ref: "Player" },
        score: { type: Number },
        tiles: [{ type: String }],
        isCurrentTurn: { type: Boolean },
      },
    ],
    board: {
      cells: [
        {
          row: { type: Number },
          column: { type: Number },
          letter: { type: String },
          playedBy: { type: Schema.Types.ObjectId, ref: "Player" },
        },
      ],
    },
    tilebag: [{ type: String }],
    moves: [
      {
        playerId: { type: Schema.Types.ObjectId, ref: "Player" },
        word: { type: String },
        tiles: [
          {
            row: { type: Number },
            column: { type: Number },
            letter: { type: String },
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
