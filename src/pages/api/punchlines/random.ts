import { NextApiRequest, NextApiResponse } from "next";
import { Punchline } from "~/punchlines/lines";
import { PrismaClient } from "@prisma/client";
import { prisma } from "~/server/db";
import { z } from "zod";

const AddPunchlineSchema = z.object({
  solutions: z.string(),
  solved: z.string(),
  unsolved: z.string(),
  artistId: z.number(),
  songId: z.number(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      //get a random punchline
      const punchlines = await prisma.punchline.findMany();

      const punchline =
        punchlines[Math.floor(Math.random() * punchlines.length)];

      if (!punchline) {
        res.status(404).json({ error: "No punchlines found." });
        return;
      }

      res.status(200).json({
        id: punchline.id,
        text: punchline.solved.replace(punchline.answer, "_____"),
      });
    } catch (err) {
      console.error("Error fetching punchlines:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching punchlines." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
