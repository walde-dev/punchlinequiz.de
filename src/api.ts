import { type UseMutationOptions, useMutation, useQuery } from "react-query";
import { type Punchline } from "./punchlines/lines";

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
