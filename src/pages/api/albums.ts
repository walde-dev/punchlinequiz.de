import { NextApiRequest, NextApiResponse } from "next";
import { Punchline } from "~/punchlines/lines";
import { PrismaClient } from "@prisma/client";
import { prisma } from "~/server/db";
import { z } from "zod";

const AddAlbumSchema = z.object({
  solutions: z.string(),
  solved: z.string(),
  artist: z.number(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const albums = await prisma.album.findMany();
      res.status(200).json(albums);
    } catch (err) {
      console.error("Error fetching albums:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching albums." });
    }
  }

  if (req.method === "POST") {
    try {
      console.log(req.body);
      const validated = AddAlbumSchema.parse(req.body);

      const solutions = validated.solutions.split(",").map((s) => s.trim());

      const album = await prisma.album.findFirst({
        where: {
          solutions: {
            hasSome: solutions,
          },
        },
      });

      if (album) {
        res.status(400).json({
          error: "An album with that name already exists.",
        });
        return;
      }

      const artist = await prisma.artist.findFirst({
        where: {
          id: validated.artist,
        },
      });

      if (!artist) {
        res.status(400).json({
          error: "An artist with that id does not exist.",
        });
        return;
      }

      const solutionsArray = validated.solutions
        .split(",")
        .map((s) => s.trim());

      const newAlbum = await prisma.album.create({
        data: {
          solved: validated.solved,
          solutions: solutionsArray,
          Artist: {
            connect: {
              id: artist.id,
            },
          },
        },
      });
      res.status(200).json({
        message: "Album created successfully.",
      });
    } catch (err) {
      console.error("Error creating album:", err);
      res
        .status(500)
        .json({ error: "An error occurred while creating an album." });
    }
  }
}
