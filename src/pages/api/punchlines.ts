import { NextApiRequest, NextApiResponse } from "next";
import { Punchline } from "~/punchlines/lines";
import { PrismaClient } from "@prisma/client";
import { prisma } from "~/server/db";
import { z } from "zod";

const AddPunchlineSchema = z.object({
  solutions: z.string(),
  solved: z.string(),
  answer: z.string(),
  artistId: z.number(),
  songId: z.number(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const punchlines = await prisma.punchline.findMany({
        include: {
          album: true,
          artist: true,
          song: true,
        },
      });

      res.status(200).json(punchlines);
    } catch (err) {
      console.error("Error fetching punchlines:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching punchlines." });
    }
  } else if (req.method === "POST") {
    try {
      const validated = AddPunchlineSchema.parse(req.body);

      const song = await prisma.song.findFirst({
        where: {
          id: validated.songId,
        },
      });

      if (!song) {
        res.status(400).json({
          error: "A song with that ID does not exist.",
        });
        return;
      }

      const artist = await prisma.artist.findFirst({
        where: {
          id: validated.artistId,
        },
      });

      if (!artist) {
        res.status(400).json({
          error: "An artist with that ID does not exist.",
        });
        return;
      }

      const newPunchline = await prisma.punchline.create({
        data: {
          solved: validated.solved,
          solutions: validated.solutions.split(",").map((s) => s.trim()),
          answer: validated.answer,
          artist: {
            connect: {
              id: validated.artistId,
            },
          },
          song: {
            connect: {
              id: validated.songId,
            },
          },
          album: {
            connect: {
              id: song.albumId,
            },
          },
        },
      });

      res.status(200).json({
        message: "Punchline created successfully.",
      });
    } catch (err) {
      console.error("Error creating punchline:", err);
      res
        .status(500)
        .json({ error: "An error occurred while creating the punchline." });
    }
  }
}
