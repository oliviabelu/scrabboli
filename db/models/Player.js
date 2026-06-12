import mongoose from "mongoose";

const { Schema } = mongoose;
const playerSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date },
  statistics: {
    gamesPlayed: { type: Number },
    gamesWon: { type: Number },
    highscore: { type: Number },
    bestWord: {
      word: { type: String },
      score: { type: Number },
    },
    averageScore: { type: Number },
  },
});
const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
