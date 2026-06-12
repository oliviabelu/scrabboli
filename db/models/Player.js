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

const mockData = [
  {
    name: "Max",
    createdAt: "",
    statistics: {
      gamesPlayed: 2,
      gamesWon: 1,
      highscore: 195,
      bestWord: {
        word: "AUS",
        score: 3,
      },
      averageScore: 2,
    },
  },
  [
    {
      name: "Anna",
      createdAt: "2026-06-12",
      statistics: {
        gamesPlayed: 2,
        gamesWon: 1,
        highscore: 222,
        bestWord: {
          word: "EIS",
          score: 3,
        },
        averageScore: 2,
      },
    },
  ],
];
