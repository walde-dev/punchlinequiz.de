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

export interface Song {
  id: number;
  solved: string;
  solutions: string[];
  artist: Artist[];
}

export interface Album {
  id: number;
  solved: string;
  solutions: string[];
  artist: Artist[];
}

export interface Artist {
  id: number;
  solved: string;
  solutions: string[];
}
