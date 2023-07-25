export interface Punchline {
  id: number;
  unsolved: string[];
  solved: string;
  artist: {
    solved: string;
    solutions: string[];
  };
  song: {
    solved: string;
    solutions: string[];
  };
  album: {
    solved: string;
    solutions: string[];
  };
  year: number;
  solutions: string[];
}
