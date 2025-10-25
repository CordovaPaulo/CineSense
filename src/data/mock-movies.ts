export interface MockMovie {
  id: number
  title: string
  poster_path: string | null
  overview: string
  release_date: string
  vote_average: number
}

export const MOCK_MOVIES: MockMovie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "https://placehold.co/300x450?text=Shawshank",
    overview: "A resilient banker finds hope and friendship while serving a life sentence.",
    release_date: "1994-09-22",
    vote_average: 9.3,
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: "https://placehold.co/300x450?text=Godfather",
    overview: "The aging patriarch of a crime family transfers control to his reluctant son.",
    release_date: "1972-03-24",
    vote_average: 9.2,
  },
  {
    id: 3,
    title: "Inception",
    poster_path: "https://placehold.co/300x450?text=Inception",
    overview: "A thief who steals corporate secrets through dreams attempts one final job.",
    release_date: "2010-07-16",
    vote_average: 8.8,
  },
  {
    id: 4,
    title: "The Dark Knight",
    poster_path: "https://placehold.co/300x450?text=Dark+Knight",
    overview: "Batman faces a chaotic new foe who pushes Gotham to the brink.",
    release_date: "2008-07-18",
    vote_average: 9.0,
  },
  {
    id: 5,
    title: "Interstellar",
    poster_path: "https://placehold.co/300x450?text=Interstellar",
    overview: "Explorers travel through a wormhole to save humanity’s future.",
    release_date: "2014-11-07",
    vote_average: 8.6,
  },
  {
    id: 6,
    title: "Parasite",
    poster_path: "https://placehold.co/300x450?text=Parasite",
    overview: "Two families become entangled as a plan spirals out of control.",
    release_date: "2019-05-30",
    vote_average: 8.6,
  },
  {
    id: 7,
    title: "Spirited Away",
    poster_path: "https://placehold.co/300x450?text=Spirited+Away",
    overview: "A girl navigates a spirit world to free her parents.",
    release_date: "2001-07-20",
    vote_average: 8.6,
  },
  {
    id: 8,
    title: "Whiplash",
    poster_path: "https://placehold.co/300x450?text=Whiplash",
    overview: "An ambitious drummer clashes with a ruthless instructor.",
    release_date: "2014-10-10",
    vote_average: 8.5,
  },
  {
    id: 9,
    title: "The Matrix",
    poster_path: "https://placehold.co/300x450?text=Matrix",
    overview: "A hacker discovers the shocking truth about his reality.",
    release_date: "1999-03-31",
    vote_average: 8.7,
  },
  {
    id: 10,
    title: "La La Land",
    poster_path: "https://placehold.co/300x450?text=La+La+Land",
    overview: "A musician and an actress chase dreams and love in LA.",
    release_date: "2016-12-09",
    vote_average: 8.0,
  },
  {
    id: 11,
    title: "Mad Max: Fury Road",
    poster_path: "https://placehold.co/300x450?text=Fury+Road",
    overview: "A high‑octane chase through a post‑apocalyptic wasteland.",
    release_date: "2015-05-15",
    vote_average: 8.1,
  },
  {
    id: 12,
    title: "Arrival",
    poster_path: "https://placehold.co/300x450?text=Arrival",
    overview: "A linguist communicates with alien visitors to avert conflict.",
    release_date: "2016-11-11",
    vote_average: 7.9,
  },
]