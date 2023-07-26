import { type UseMutationOptions, useMutation, useQuery } from "react-query";
import { type Punchline } from "./punchlines/lines";
import { Song } from "@prisma/client";

const fetchRandomPunchline = async (): Promise<Punchline> => {
  const response = await fetch("/api/punchlines/getRandomPunchline");
  if (!response.ok) {
    throw new Error("Failed to fetch random punchline");
  }
  return response.json() as Promise<Punchline>;
};

export function useRandomPunchline() {
  return useQuery<Punchline>("randomPunchline", fetchRandomPunchline, {});
}

const fetchAllSongs = async (): Promise<Song[]> => {
  const response = await fetch("/api/songs/getSongs");
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  return (await response.json()) as Promise<Song[]>;
};

export function useAllSongs() {
  return useQuery<Song[]>("allSongs", fetchAllSongs, {});
}

const checkAnswer = async (id: number, answer: string): Promise<boolean> => {
  const response = await fetch("/api/punchlines/checkAnswer", {
    method: "POST",
    body: JSON.stringify({ id, answer }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to check answer");
  }
  return (await response.json()) as boolean;
};

export function useCheckAnswer(
  options?: UseMutationOptions<boolean, Error, { id: number; answer: string }>
) {
  return useMutation<boolean, Error, { id: number; answer: string }>(
    ({ id, answer }) => checkAnswer(id, answer),
    options
  );
}
