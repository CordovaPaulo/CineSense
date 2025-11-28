export function buildMovieFilters(genre: string, year: string | number, duration: string) {
  const f: Record<string, string> = {};
  if (genre) f.genres = genre;
  if (year) {
    f.startYear = String(year);
    f.endYear = String(year);
  }
  if (duration) {
    if (duration === "30min - 1hr") {
      f.runtime_gte = "30";
      f.runtime_lte = "60";
    } else if (duration === "1hr - 1.5hrs") {
      f.runtime_gte = "60";
      f.runtime_lte = "90";
    } else if (duration === "1.5hrs - 2hrs") {
      f.runtime_gte = "90";
      f.runtime_lte = "120";
    } else if (duration === "2hrs - 3hrs") {
      f.runtime_gte = "120";
      f.runtime_lte = "180";
    }
  }
  return f;
}

export function buildShowFilters(genre: string, year: string | number, episodes: string) {
  const f: Record<string, string> = {};
  if (genre) f.genres = genre;
  if (year) {
    f.startYear = String(year);
    f.endYear = String(year);
  }
  if (episodes) {
    if (episodes === "1 – 15 episodes") {
      f.episodes_gte = "1";
      f.episodes_lte = "15";
    } else if (episodes === "16 – 30 episodes") {
      f.episodes_gte = "16";
      f.episodes_lte = "30";
    } else if (episodes === "31 – 50 episodes") {
      f.episodes_gte = "31";
      f.episodes_lte = "50";
    } else if (episodes === "51+ episodes") {
      f.episodes_gte = "51";
    }
  }
  return f;
}
