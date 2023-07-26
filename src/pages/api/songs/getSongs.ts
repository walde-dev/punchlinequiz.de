/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient, Song } from "@prisma/client";
import { Client, createClient } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { Punchline } from "~/punchlines/lines";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const songs = await prisma.song.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        solved: true,
        Artist: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            solved: true,
          },
        },
      },
    });
    res.status(200).json(songs);
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).json({ error: "An error occurred while fetching songs." });
  }
}
