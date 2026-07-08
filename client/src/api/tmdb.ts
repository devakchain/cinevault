import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  params: {
    api_key: import.meta.env.VITE_TMDB_KEY,
  },
});

export const getTrendingMovies = async () => {
  const response = await tmdb.get("/trending/movie/week");

  return response.data.results;
};

export const getPopularTV = async () => {
  const response = await tmdb.get("/tv/popular");

  return response.data.results;
};

export const getTopRatedMovies = async () => {
  const response = await tmdb.get("/movie/top_rated");

  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await tmdb.get("/movie/upcoming");

  return response.data.results;
};

export const getNowPlayingMovies = async () => {
  const response = await tmdb.get("/movie/now_playing");

  return response.data.results;
};

export const getMovieDetails = async (id: string) => {
  const response = await tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: "credits,videos,recommendations",
    },
  });

  return response.data;
};

export const getTVDetails = async (id: string) => {
  const response = await tmdb.get(`/tv/${id}`, {
    params: {
      append_to_response: "credits,videos,recommendations",
    },
  });

  return response.data;
};

export const searchMovies = async (query: string) => {
  const response = await tmdb.get("/search/multi", {
    params: {
      query,
    },
  });

  return response.data.results.filter(
    (item: any) => item.media_type === "movie" || item.media_type === "tv"
  );
};

export default tmdb;
