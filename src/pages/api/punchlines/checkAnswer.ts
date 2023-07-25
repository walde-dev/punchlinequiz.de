import { Client, createClient } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { Punchline } from "~/punchlines/lines";

// Utility function to strip extra characters and spaces
function stripCharactersAndSpaces(input: string): string {
  return input.toLowerCase().replace(/[^\w]/g, "");
}

const CheckAnswerRequestBodySchema = z.object({
  id: z.number(),
  answer: z.string().nonempty(),
});

type CheckAnswerRequestBody = z.infer<typeof CheckAnswerRequestBodySchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createClient();
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    console.log("LOOOOOL", req.body);
    const { id, answer } = CheckAnswerRequestBodySchema.parse(req.body);

    try {
      await client.connect();

      const queryText = `
            SELECT * FROM punchline
            WHERE id = $1;
        `;

      const result = await client.query<Punchline>(queryText, [id]);

      const punchline = result.rows[0];

      if (!punchline) {
        return res.status(404).end();
      }

      const strippedAnswer = stripCharactersAndSpaces(answer);
      const strippedSolutions = punchline.solutions.map(
        stripCharactersAndSpaces
      );

      const isCorrect = strippedSolutions.includes(strippedAnswer);

      if (!isCorrect) {
        return res.status(200).json({
          isCorrect,
        });
      }

      res.status(200).json({
        isCorrect,
      });
    } catch (err) {
      console.error("Error fetching random punchline:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching random punchline." });
    } finally {
      await client.end();
    }
  } catch (err) {
    //types are not correct
    console.error("Error parsing request body:", err);
    res.status(400).json({ error: "Invalid request body." });
  }
}
