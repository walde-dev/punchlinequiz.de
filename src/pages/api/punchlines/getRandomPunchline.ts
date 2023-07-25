import { Client, createClient } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { Punchline } from "~/punchlines/lines";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createClient();

  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    await client.connect();

    const queryText = `
        SELECT * FROM punchline
        ORDER BY random()
        LIMIT 1;
      `;

    const result = await client.query<Punchline>(queryText);

    const randomPunchline = result.rows[0];

    if (!randomPunchline) {
      return res.status(404).end();
    }

    res.status(200).json({
      unsolved: randomPunchline.unsolved,
      id: randomPunchline.id,
    });
  } catch (err) {
    console.error("Error fetching random punchline:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching random punchline." });
  } finally {
    await client.end();
  }
}
