import { z } from "zod";

export const AlbumModel = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  solved: z.string(),
  solutions: z.array(z.string()),
});

export const SongModel = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  solved: z.string(),
  solutions: z.string().array(),
});

export const PunchlineModel = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  solved: z.string(),
  solutions: z.string().array(),
});

export const ArtistModel = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  solved: z.string(),
  solutions: z.array(z.string()),
  Album: z.array(AlbumModel).nullable(),
  Song: z.array(SongModel).nullable(),
  Punchline: z.array(PunchlineModel).nullable().optional(),
});
