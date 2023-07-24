export interface Punchline {
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

export const punchlines: Punchline[] = [
  {
    unsolved: [
      "Kollegah der Profi zieht die Springfield Rifle",
      "Und färbt ein ganzes Viertel rot",
    ],
    solved: "wie bei'm Windows-Zeichen",
    artist: {
      solved: "Kollegah",
      solutions: ["kollegah", "kolle", "T.O.N.I", "T.o.n.i."],
    },
    song: {
      solved: "Intro",
      solutions: ["intro"],
    },
    album: {
      solved: "Zuhältertape Vol. 4",
      solutions: [
        "zht4",
        "zuhältertape 4",
        "zuhältertape vol. 4",
        "zht vol. 4",
        "zht 4",
      ],
    },
    year: 2015,
    solutions: ["wie beim windows zeichen"],
  },
  {
    unsolved: [
      "Aufreizende Damen vorm Hotel warten auf die Chance",
      "Mit dem Aufreißer hochzugehen",
    ],
    solved: "wie 'ne Briefbombe",
    artist: {
      solved: "Kollegah",
      solutions: ["kollegah", "kolle", "T.O.N.I", "T.o.n.i."],
    },
    song: {
      solved: "Alarmanlage",
      solutions: ["alarmanlage"],
    },
    album: {
      solved: "Chronik III",
      solutions: [
        "chronik 3",
        "chronik iii",
        "chronik vol. 3",
        "chronik vol. iii",
      ],
    },
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
    artist: {
      solved: "Kollegah",
      solutions: ["kollegah", "kolle", "T.O.N.I", "T.o.n.i."],
    },
    song: {
      solved: "Business Paris",
      solutions: ["business paris", "bisiness paris"],
    },
    album: {
      solved: "Bossaura",
      solutions: ["bossaura"],
    },
    year: 2010,
    solutions: [
      "wie für die meisterschale",
      "wie die meisterschale",
      "meisterschale",
      "für die meisterschale",
    ],
  },
];
