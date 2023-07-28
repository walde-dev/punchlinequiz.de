import { NextApiRequest, NextApiResponse } from "next";
import { Punchline } from "~/punchlines/lines";
import { PrismaClient } from "@prisma/client";
import { prisma } from "~/server/db";
import { z } from "zod";
import { sanitizeString } from "~/lib/helpers";

const CheckAnswerSchema = z.object({
  punchlineId: z.number(),
  answer: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const validated = CheckAnswerSchema.parse(req.body);

    try {
      const punchline = await prisma.punchline.findUnique({
        where: {
          id: validated.punchlineId,
        },
      });
      if (!punchline) {
        res.status(404).json({ error: "Punchline not found." });
        return;
      }

      const answer = sanitizeString(validated.answer);
      const solutions = punchline.solutions.map((s) => sanitizeString(s));

      if (solutions.includes(answer)) {
        res.status(200).json({ correct: true, answer: punchline.answer });
      } else {
        res.status(200).json({ correct: false });
      }
    } catch (err) {
      console.error("Error checking answer:", err);
      res
        .status(500)
        .json({ error: "An error occurred while checking answer." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
