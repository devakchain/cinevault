import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import { getMovieDetails } from "../api/tmdb";

import MovieRow from "../components/MovieRow";
import CastCard from "../components/CastCard";
import MovieDetailsSkeleton from "../components/skeletons/MovieDetailsSkeleton";

import { useMovieStore } from "../store/movieStore";

import type { Movie } from "../types/movie";

function MovieDetails() {
  const { id } = useParams();

  const [showTrailer, setShowTrailer] = useState(false);

  const addToWatchlist = useMovieStore((state) => state.addToWatchlist);

  const removeFromWatchlist = useMovieStore(
    (state) => state.removeFromWatchlist
  );

  const watchlist = useMovieStore((state) => state.watchlist);

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", id],

    queryFn: () => getMovieDetails(id!),
  });

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (error || !movie) {
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
        <h1
          className="
          text-4xl
          font-black
          "
        >
          Movie not found
        </h1>
      </div>
    );
  }

  const inWatchlist = watchlist.some((item) => item.id === movie.id);

  function toggleWatchlist() {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);

      toast.success("Removed from watchlist");

      return;
    }

    addToWatchlist({
      id: movie.id,

      title: movie.title ?? movie.name ?? "Unknown",

      poster: movie.poster_path ?? "",

      watchedAt: new Date().toISOString(),
    });

    toast.success("Added to watchlist 🎬");
  }

  const trailer = movie.videos?.results?.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );

  const recommendations = movie.recommendations?.results
    ?.slice(0, 10)
    .map((item: any) => ({
      ...item,

      media_type: "movie",
    })) as Movie[];

  const shortOverview =
    movie.overview?.length > 320
      ? movie.overview.slice(0, 320) + "..."
      : movie.overview;

  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      "
    >
      <section
        className="
        relative
        min-h-[780px]
        flex
        items-end
        overflow-hidden
        "
        style={{
          backgroundImage: `

          linear-gradient(
          to right,
          rgba(0,0,0,.95),
          rgba(0,0,0,.45),
          transparent
          ),

          linear-gradient(
          to top,
          black,
          transparent 40%
          ),

          url(
          https://image.tmdb.org/t/p/original${movie.backdrop_path}
          )

          `,
        }}
      >
        <div
          className="
          relative
          z-10
          px-6
          md:px-12
          pb-20
          max-w-6xl
          "
        >
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
            text-5xl
            md:text-7xl
            font-black
            "
          >
            {movie.title}
          </motion.h1>

          <div
            className="
            flex
            flex-wrap
            gap-5
            mt-6
            text-zinc-300
            "
          >
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>

            <span>📅 {movie.release_date?.slice(0, 4)}</span>

            <span>⏱ {movie.runtime} min</span>
          </div>

          <div
            className="
            flex
            flex-wrap
            gap-3
            mt-6
            "
          >
            {movie.genres?.map((genre: any) => (
              <span
                key={genre.id}
                className="
                  bg-white/10
                  border
                  border-white/20
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  "
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p
            className="
            mt-8
            text-lg
            text-zinc-300
            max-w-3xl
            leading-relaxed
            "
          >
            {shortOverview}
          </p>

          <div
            className="
            flex
            flex-wrap
            gap-4
            mt-8
            "
          >
            <button
              onClick={() => setShowTrailer(true)}
              className="
              bg-white
              text-black
              px-8
              py-3
              rounded-xl
              font-bold
              hover:scale-105
              transition
              "
            >
              ▶ Watch Trailer
            </button>

            <button
              onClick={toggleWatchlist}
              className="
              bg-white/10
              border
              border-white/20
              px-8
              py-3
              rounded-xl
              backdrop-blur-xl
              "
            >
              {inWatchlist ? "✓ Remove List" : "＋ Watchlist"}
            </button>
          </div>
        </div>
      </section>

      <section
        className="
        px-6
        md:px-10
        py-12
        "
      >
        <h2
          className="
          text-4xl
          font-black
          mb-8
          "
        >
          Cast
        </h2>

        <div
          className="
          flex
          gap-6
          overflow-x-auto
          "
        >
          {movie.credits?.cast?.slice(0, 10).map((actor: any) => (
            <CastCard key={actor.id} actor={actor} />
          ))}
        </div>
      </section>

      {recommendations?.length > 0 && (
        <section
          className="
          px-6
          md:px-10
          pb-16
          "
        >
          <MovieRow title="You May Also Like" movies={recommendations} />
        </section>
      )}

      <AnimatePresence>
        {showTrailer && trailer && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
          fixed
          inset-0
          z-50
          bg-black/90
          flex
          items-center
          justify-center
          p-6
          "
          >
            <div
              className="
            w-full
            max-w-5xl
            "
            >
              <button
                onClick={() => setShowTrailer(false)}
                className="
              mb-5
              text-white
              "
              >
                ✕ Close
              </button>

              <iframe
                className="
              w-full
              aspect-video
              rounded-3xl
              "
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MovieDetails;
