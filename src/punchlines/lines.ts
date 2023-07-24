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
      "Mit dem Aufreißer hochzugehen",
    ],
    solved: "wie 'ne Briefbombe",
    artist: "Kollegah",
    song: "Alarmanlage",
    album: "Chronik III",
    year: 2015,
    solutions: [
      "wie ne briefbombe",
      "wie eine briefbombe",
      "eine briefbombe",
      "ne briefbombe",
    ],
  },
  {
    unsolved: [
      "Shoppt die Designermarken",
      "Für die Schuhe wurden so einige Alligatore geschossen",
    ],
    solved: "wie für die Meisterschale",
    artist: "Kollegah",
    song: "Business Paris",
    album: "Bossaura",
    year: 2010,
    solutions: [
      "wie für die meisterschale",
      "wie die meisterschale",
      "meisterschale",
      "für die meisterschale",
    ],
  },
];
