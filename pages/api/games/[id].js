import dbConnect from "@/db/connect";
import Game from "@/db/models/Game";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const game = await Game.findById(id);
      if (!game) {
        return response.status(404).json({ status: "Not found!" });
      }
      return response.status(200).json(game);
    }
    if (request.method === "PATCH") {
      const gameData = request.body;
      const updatedGame = await Game.findByIdAndUpdate(id, gameData, {
        new: true,
      });
      if (!updatedGame) {
        return response.status(404).json({ status: "Not found!" });
      }
      return response.status(200).json(updatedGame);
    }
    if (request.method === "DELETE") {
      await Game.findByIdAndDelete(id);
      return response.status(200).json({ status: "Success!" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error." });
  }
  return response.status(405).json({ status: "Method not allowed." });
}
