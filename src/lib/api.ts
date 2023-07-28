import { ArtistModel, SongModel } from "prisma/zod";
import { z } from "zod";

export async function getSongs(): Promise<z.infer<typeof SongModel>[]> {
  const res = await fetch("/api/songs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return z.array(SongModel).parse(await res.json());
}

const AddItemReturnSchema = z.object({
  message: z.string(),
});

export async function getArtists(): Promise<z.infer<typeof ArtistModel>[]> {
  const res = await fetch("/api/artists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return z.array(ArtistModel).parse(await res.json());
}

export async function addArtist({
  solutions,
  solved,
}: {
  solutions: string;
  solved: string;
}) {
  const res = await fetch("/api/artists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      solutions,
      solved,
    }),
  });

  if (!res.ok) {
    throw new Error("Error creating artist.");
  }

  return AddItemReturnSchema.parse(await res.json());
}

export async function addAlbum({
  solutions,
  solved,
  artist,
}: {
  solutions: string;
  solved: string;
  artist: string;
}) {
  const res = await fetch("/api/albums", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      solutions,
      solved,
      artist,
    }),
  });

  if (!res.ok) {
    throw new Error("Error creating album.");
  }

  return AddItemReturnSchema.parse(await res.json());
}
