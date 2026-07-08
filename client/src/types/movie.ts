export interface WatchedMovie {
  id: number;
  title: string;
  poster: string;
  rating?: number;
  watchedAt: string;
}

export interface Movie {
  id: number;

  title?: string;

  name?: string;

  poster_path?: string;

  backdrop_path?: string;

  overview?: string;

  vote_average?: number;

  release_date?: string;

  first_air_date?: string;

  media_type?: "movie" | "tv";

  runtime?: number;

  genres?: Genre[];
}

export interface Actor {
  id: number;

  name: string;

  character?: string;

  profile_path?: string;
}

export interface Genre {
  id: number;

  name: string;
}

export interface Rating {
  movieId: number;

  rating: number;
}
