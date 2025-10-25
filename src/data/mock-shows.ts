export interface MockShow {
  id: number
  title: string
  poster_path: string | null
  overview: string
  release_year: string
  vote_average: number
}

export const MOCK_SHOWS: MockShow[] = [
  {
    id: 101,
    title: "Breaking Bad",
    poster_path: "https://placehold.co/300x450?text=Breaking+Bad",
    overview: "A teacher turns to crime as his world unravels.",
    release_year: "2008-01-20",
    vote_average: 9.5,
  },
  {
    id: 102,
    title: "Game of Thrones",
    poster_path: "https://placehold.co/300x450?text=Game+of+Thrones",
    overview: "Noble houses vie for power in a brutal fantasy realm.",
    release_year: "2011-04-17",
    vote_average: 8.9,
  },
  {
    id: 103,
    title: "Stranger Things",
    poster_path: "https://placehold.co/300x450?text=Stranger+Things",
    overview: "A small town faces supernatural threats and secrets.",
    release_year: "2016-07-15",
    vote_average: 8.6,
  },
  {
    id: 104,
    title: "The Office",
    poster_path: "https://placehold.co/300x450?text=The+Office",
    overview: "A mockumentary about everyday office life.",
    release_year: "2005-03-24",
    vote_average: 8.9,
  },
  {
    id: 105,
    title: "The Mandalorian",
    poster_path: "https://placehold.co/300x450?text=The+Mandalorian",
    overview: "A lone bounty hunter navigates the galaxy’s outer rim.",
    release_year: "2019-11-12",
    vote_average: 8.4,
  },
  {
    id: 106,
    title: "The Crown",
    poster_path: "https://placehold.co/300x450?text=The+Crown",
    overview: "A dramatized look at the reign of Queen Elizabeth II.",
    release_year: "2016-11-04",
    vote_average: 8.6,
  },
  {
    id: 107,
    title: "The Last of Us",
    poster_path: "https://placehold.co/300x450?text=The+Last+of+Us",
    overview: "Two survivors travel across a ravaged America.",
    release_year: "2023-01-15",
    vote_average: 8.8,
  },
  {
    id: 108,
    title: "Dark",
    poster_path: "https://placehold.co/300x450?text=Dark",
    overview: "Time‑twisting mysteries unravel in a German town.",
    release_year: "2017-12-01",
    vote_average: 8.7,
  },
  {
    id: 109,
    title: "Chernobyl",
    poster_path: "https://placehold.co/300x450?text=Chernobyl",
    overview: "A dramatization of the 1986 nuclear disaster.",
    release_year: "2019-05-06",
    vote_average: 9.4,
  },
  {
    id: 110,
    title: "Succession",
    poster_path: "https://placehold.co/300x450?text=Succession",
    overview: "A media dynasty battles for control and legacy.",
    release_year: "2018-06-03",
    vote_average: 8.9,
  },
  {
    id: 111,
    title: "The Witcher",
    poster_path: "https://placehold.co/300x450?text=The+Witcher",
    overview: "A monster hunter wanders a continent of turmoil.",
    release_year: "2019-12-20",
    vote_average: 8.0,
  },
  {
    id: 112,
    title: "Severance",
    poster_path: "https://placehold.co/300x450?text=Severance",
    overview: "Workers with split memories uncover a corporate mystery.",
    release_year: "2022-02-18",
    vote_average: 8.6,
  },
]