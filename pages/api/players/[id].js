import dbConnect from "@/db/connect";
import Player from "@/db/models/Player";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  try {
    if (request.method === "GET") {
      const player = await Player.findById(id);
      if (!player) {
        return response.status(404).json({ status: "Not found!" });
      }
      return response.status(200).json(player);
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error." });
  }
  return response.status(405).json({ status: "Method not allowed." });
}
