import { z } from "zod";

export const AlbumModel = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  solved: z.string(),
  solutions: z.array(z.string()),
  Artist: z
    .array(
      z.object({
        id: z.number(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        solved: z.string(),
        solutions: z.array(z.string()),
      })
    )
    .nullable(),
  Song: z
    .array(
      z.object({
        id: z.number(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        solved: z.string(),
        solutions: z.string().array(),
      })
    )
    .nullable(),
});

export const SongModel = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  solved: z.string(),
  solutions: z.string().array(),
  Artist: z
    .array(
      z.object({
        id: z.number(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        solved: z.string(),
        solutions: z.array(z.string()),
      })
    )
    .nullable(),
});

export const PunchlineModel = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  solved: z.string(),
  solutions: z.string().array(),
  answer: z.string(),
});

export const randomPunchlineModel = z.object({
  id: z.number(),
  text: z.string(),
});

export const ArtistModel = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  solved: z.string(),
  solutions: z.array(z.string()),
  Album: z
    .array(
      z.object({
        id: z.number(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        solved: z.string(),
        solutions: z.array(z.string()),
      })
    )
    .nullable(),
  Song: z
    .array(
      z.object({
        id: z.number(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        solved: z.string(),
        solutions: z.string().array(),
        albumId: z.number(),
      })
    )
    .nullable(),
  Punchline: z
    .array(
      z.object({
        id: z.number(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
        solved: z.string(),
        solutions: z.string().array(),
      })
    )
    .nullable(),
});
