import { useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import HomeSkeleton from "../components/skeletons/HomeSkeleton";

import {
  getTrendingMovies,
  getPopularTV,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "../api/tmdb";

import { useMovieStore } from "../store/movieStore";

import type { Movie } from "../types/movie";

function Home() {
  const watched = useMovieStore((state) => state.watched);

  const favorites = useMovieStore((state) => state.favorites);

  const queryOptions = {
    staleTime: 1000 * 60 * 10,
    retry: 2,
  };

  const {
    data: trending = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Movie[]>({
    queryKey: ["trending"],
    queryFn: getTrendingMovies,
    ...queryOptions,
  });

  const { data: topRated = [] } = useQuery<Movie[]>({
    queryKey: ["top-rated"],
    queryFn: getTopRatedMovies,
    ...queryOptions,
  });

  const { data: upcoming = [] } = useQuery<Movie[]>({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
    ...queryOptions,
  });

  const { data: nowPlaying = [] } = useQuery<Movie[]>({
    queryKey: ["now-playing"],
    queryFn: getNowPlayingMovies,
    ...queryOptions,
  });

  const { data: tvShows = [] } = useQuery<Movie[]>({
    queryKey: ["popular-tv"],
    queryFn: getPopularTV,
    ...queryOptions,
  });

  const heroMovie = useMemo(() => {
    if (!trending.length) return null;

    return [...trending].sort(
      (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0)
    )[0];
  }, [trending]);

  if (error) {
    return (
      <div
        className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        "
      >
        <div
          className="
          bg-zinc-900
          p-10
          rounded-3xl
          text-center
          "
        >
          <h2
            className="
            text-3xl
            font-black
            mb-5
            "
          >
            CineVault Error
          </h2>

          <button
            onClick={() => refetch()}
            className="
            bg-white
            text-black
            px-7
            py-3
            rounded-xl
            font-bold
            "
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      overflow-hidden
      "
    >
      {heroMovie && (
        <Hero
          id={heroMovie.id}
          title={heroMovie.title ?? heroMovie.name ?? "Unknown"}
          overview={heroMovie.overview ?? ""}
          backdrop={heroMovie.backdrop_path ?? ""}
          poster={heroMovie.poster_path ?? ""}
          vote={heroMovie.vote_average}
          year={
            heroMovie.release_date?.slice(0, 4) ??
            heroMovie.first_air_date?.slice(0, 4)
          }
          type={heroMovie.media_type === "tv" ? "tv" : "movie"}
          genres={heroMovie.genres?.map((g: any) => g.name) ?? []}
        />
      )}

      <motion.main
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="
        px-6
        md:px-10
        py-12
        space-y-14
        "
      >
        {watched.length > 0 && (
          <MovieRow
            title="Continue Watching"
            movies={watched.slice().reverse() as Movie[]}
          />
        )}

        {favorites.length > 0 && (
          <MovieRow title="Your Favorites" movies={favorites as Movie[]} />
        )}

        {trending.length > 0 && (
          <MovieRow title="Trending Now" movies={trending} />
        )}

        {topRated.length > 0 && (
          <MovieRow title="Top Rated" movies={topRated} />
        )}

        {nowPlaying.length > 0 && (
          <MovieRow title="Now Playing" movies={nowPlaying} />
        )}

        {upcoming.length > 0 && (
          <MovieRow title="Coming Soon" movies={upcoming} />
        )}

        {tvShows.length > 0 && (
          <MovieRow title="Popular Series" movies={tvShows} />
        )}
      </motion.main>
    </div>
  );
}

export default Home;
