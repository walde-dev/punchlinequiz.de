import { NextApiRequest, NextApiResponse } from "next";
import { Punchline } from "~/punchlines/lines";
import { PrismaClient } from "@prisma/client";
import { prisma } from "~/server/db";
import { z } from "zod";

const AddSongSchema = z.object({
  solutions: z.string(),
  solved: z.string(),
  artistId: z.number(),
  albumId: z.number(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const songs = await prisma.song.findMany({
        include: {
          Artist: true,
          Album: true,
        },
      });

      res.status(200).json(songs);
    } catch (err) {
      console.error("Error fetching songs:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching songs." });
    }
  } else if (req.method === "POST") {
    try {
      const validated = AddSongSchema.parse(req.body);

      const song = await prisma.song.findFirst({
        where: {
          solutions: {
            hasSome: validated.solutions.split(",").map((s) => s.trim()),
          },
        },
      });

      if (song) {
        res.status(400).json({
          error: "A song with that name already exists.",
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

      const album = await prisma.album.findFirst({
        where: {
          id: validated.albumId,
        },
      });

      if (!album) {
        res.status(400).json({
          error: "An album with that ID does not exist.",
        });
        return;
      }

      const newSong = await prisma.song.create({
        data: {
          solved: validated.solved,
          solutions: validated.solutions.split(",").map((s) => s.trim()),
          Artist: {
            connect: {
              id: validated.artistId,
            },
          },
          Album: {
            connect: {
              id: validated.albumId,
            },
          },
        },
      });

      res.status(200).json({
        message: "Song created successfully.",
      });
    } catch (err) {
      console.error("Error creating song:", err);
      res
        .status(500)
        .json({ error: "An error occurred while creating a song." });
    }
  }
}
