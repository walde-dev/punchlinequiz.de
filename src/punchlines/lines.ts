export interface Punchline {
  unsolved: string[];
  solved: string;
  artist: string;
  song: string;
  album: string;
  year: number;
  solutions: string[];
}

export const punchlines: Punchline[] = [
  {
    unsolved: [
      "Kollegah der Profi zieht die Springfield Rifle",
      "Und färbt ein ganzes Viertel rot",
    ],
    solved: "wie bei'm Windows-Zeichen",
    artist: "Kollegah",
    song: "Intro",
    album: "Zuhältertape Vol. 4",
    year: 2015,
    solutions: ["wie beim windows zeichen"],
  },
  {
    unsolved: [
      "Aufreizende Damen vorm Hotel warten auf die Chance",
      "Mit dem Aufreißer hochzugehen wie",
    ],
    solved: "'ne Briefbombe",
    artist: "Kollegah",
    song: "Alarmanlage",
    album: "Chronik III",
    year: 2015,
    solutions: ["ne briefbombe", "eine briefbombe"],
  },
  {
    unsolved: [
      "Shoppt die Designermarken",
      "Für die Schuhe wurden so einige Alligatore geschossen wie",
    ],
    solved: "für die Meisterschale",
    artist: "Kollegah",
    song: "Business Paris",
    album: "Bossaura",
    year: 2010,
    solutions: ["für die meisterschale", "die meisterschale", "meisterschale"],
  },
];
