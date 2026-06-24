import dbConnect from "@/db/connect";
import Player from "@/db/models/Player";

export default async function handler(request, response) {
  await dbConnect();
  try {
    if (request.method === "GET") {
      const { name } = request.query;
      const player = await Player.findOne({ name });
      if (!player) {
        return response.status(404).json({ status: "Player not found." });
      }
      return response.status(200).json(player);
    }

    if (request.method === "POST") {
      const { name } = request.body;
      const existingPlayer = await Player.findOne({ name });
      if (existingPlayer) {
        return response.status(409).json({ status: "Name already taken." });
      }

      const newPlayer = await Player.create({ name });
      return response.status(201).json(newPlayer);
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error." });
  }
  return response.status(405).json({ status: "Method not allowed." });
}
