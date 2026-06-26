import dbConnect from "@/db/connect";
import Game from "@/db/models/Game";

export default async function handler(request, response) {
  await dbConnect();
  try {
    if (request.method === "GET") {
      const { playerId } = request.query;
      const games = await Game.find({ "players.playerId": playerId });
      return response.status(200).json(games);
    }

    if (request.method === "POST") {
      const game = request.body;
      const newGame = await Game.create(game);
      return response.status(201).json(newGame);
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error." });
  }
  return response.status(405).json({ status: "Method not allowed." });
}
