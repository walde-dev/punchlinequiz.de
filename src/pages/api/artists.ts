import { NextApiRequest, NextApiResponse } from "next";
import { Punchline } from "~/punchlines/lines";
import { PrismaClient } from "@prisma/client";
import { prisma } from "~/server/db";
import { z } from "zod";

const AddArtistSchema = z.object({
  solutions: z.string(),
  solved: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const artists = await prisma.artist.findMany({
        include: {
          Album: true,
          Song: true,
          Punchline: true,
        },
      });
      res.status(200).json(artists);
    } catch (err) {
      console.error("Error fetching songs:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching songs." });
    }
  }

  if (req.method === "POST") {
    try {
      const validated = AddArtistSchema.parse(req.body);

      const solutions = validated.solutions.split(",").map((s) => s.trim());

      const artist = await prisma.artist.findFirst({
        where: {
          solutions: {
            hasSome: solutions,
          },
        },
      });

      if (artist) {
        res.status(400).json({
          error: "An artist with that name already exists.",
        });
        return;
      }

      const solutionsArray = validated.solutions
        .split(",")
        .map((s) => s.trim());
        
      const newArtist = await prisma.artist.create({
        data: {
          solved: validated.solved,
          solutions: solutionsArray,
        },
      });
      res.status(200).json({
        message: "Artist created successfully.",
      });
    } catch (err) {
      console.error("Error creating artist:", err);
      res
        .status(500)
        .json({ error: "An error occurred while creating an artist." });
    }
  }
}
