import dbConnect from "@/db/connect";
import Player from "@/db/models/Player";

export default async function handler(request, response) {
  await dbConnect();
  try {
    if (request.method === "GET") {
      const players = await Player.find();
      return response.status(200).json(players);
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error." });
  }
  return response.status(405).json({ status: "Method not allowed." });
}
