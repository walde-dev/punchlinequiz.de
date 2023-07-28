import { z } from "zod";

export const ArtistModel = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  solved: z.string(),
  solutions: z.array(z.string()),
  songId: z.string().array().nullable(),
  albumId: z.string().array().nullable(),
  punchlineId: z.string().array().nullable(),
});

export const SongModel = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  solved: z.string(),
  solutions: z.string().array(),
  artistId: z.string(),
});
