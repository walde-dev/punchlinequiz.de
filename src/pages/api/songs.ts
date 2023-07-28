import { NextApiRequest, NextApiResponse } from "next";
import { Punchline } from "~/punchlines/lines";
import { PrismaClient } from "@prisma/client";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const songs = await prisma.song.findMany();

      res.status(200).json(songs);
    } catch (err) {
      console.error("Error fetching songs:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching songs." });
    }
  }
}
