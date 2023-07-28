import {
  AlbumModel,
  ArtistModel,
  PunchlineModel,
  SongModel,
  randomPunchlineModel,
} from "prisma/zod";
import { z } from "zod";

const AddItemReturnSchema = z.object({
  message: z.string(),
});

const CheckAnswerSchema = z.object({
  correct: z.boolean(),
  answer: z.string().optional(),
});

export async function addSong({
  solutions,
  solved,
  artistId,
  albumId,
}: {
  solutions: string;
  solved: string;
  artistId: number;
  albumId: number;
}) {
  const res = await fetch("/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      solutions,
      solved,
      artistId,
      albumId,
    }),
  });

  if (!res.ok) {
    throw new Error("Error creating album.");
  }

  return AddItemReturnSchema.parse(await res.json());
}

export async function getSongs(): Promise<z.infer<typeof SongModel>[]> {
  const res = await fetch("/api/songs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return z.array(SongModel).parse(await res.json());
}

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
  artistId,
}: {
  solutions: string;
  solved: string;
  artistId: number;
}) {
  const res = await fetch("/api/albums", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      solutions,
      solved,
      artist: artistId,
    }),
  });

  if (!res.ok) {
    throw new Error("Error creating album.");
  }

  return AddItemReturnSchema.parse(await res.json());
}

export async function getAlbums(): Promise<z.infer<typeof AlbumModel>[]> {
  const res = await fetch("/api/albums", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return z.array(AlbumModel).parse(await res.json());
}

export async function addPunchline({
  solutions,
  solved,
  answer,
  artistId,
  songId,
}: {
  solutions: string;
  solved: string;
  answer: string;
  artistId: number;
  songId: number;
}) {
  const res = await fetch("/api/punchlines", {
    method: "POST",
    body: JSON.stringify({
      solutions,
      solved,
      answer,
      artistId,
      songId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error creating punchline.");
  }

  return AddItemReturnSchema.parse(await res.json());
}

export async function getRandomPunchline(): Promise<
  z.infer<typeof randomPunchlineModel>
> {
  const res = await fetch("/api/punchlines/random", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return randomPunchlineModel.parse(await res.json());
}

export async function checkPunchline({
  punchlineId,
  answer,
}: {
  punchlineId: number;
  answer: string;
}): Promise<z.infer<typeof CheckAnswerSchema>> {
  const res = await fetch("/api/punchlines/checkAnswer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      punchlineId,
      answer,
    }),
  });

  return CheckAnswerSchema.parse(await res.json());
}
