import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useMovieStore } from "../store/movieStore";
import { useRatingStore } from "../store/ratingStore";

import type { Movie } from "../types/movie";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);

  const addWatched = useMovieStore((state) => state.addWatched);

  const removeFromWatched = useMovieStore((state) => state.removeFromWatched);

  const addToWatchlist = useMovieStore((state) => state.addToWatchlist);

  const removeFromWatchlist = useMovieStore(
    (state) => state.removeFromWatchlist
  );

  const addFavorite = useMovieStore((state) => state.addFavorite);

  const removeFavorite = useMovieStore((state) => state.removeFavorite);

  const watched = useMovieStore((state) =>
    state.watched.some((item) => item.id === movie.id)
  );

  const inWatchlist = useMovieStore((state) =>
    state.watchlist.some((item) => item.id === movie.id)
  );

  const favorite = useMovieStore((state) =>
    state.favorites.some((item) => item.id === movie.id)
  );

  const addRating = useRatingStore((state) => state.addRating);

  const rating = useRatingStore((state) => state.getRating(movie.id));

  const title = movie.title ?? movie.name ?? "Unknown";

  const year =
    movie.release_date?.slice(0, 4) ??
    movie.first_air_date?.slice(0, 4) ??
    "----";

  const movieData = {
    id: movie.id,

    title,

    poster: movie.poster_path ?? "",

    watchedAt: new Date().toISOString(),
  };

  const detailsPath =
    movie.media_type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  function handleFavorite(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFavorite(movie.id);

      toast.error("Removed from favorites");
    } else {
      addFavorite(movieData);

      toast.success("Added to favorites");
    }
  }

  function handleWatched(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (watched) {
      removeFromWatched(movie.id);

      toast.error("Removed from watched");
    } else {
      addWatched(movieData);

      toast.success("Marked as watched");
    }
  }

  function handleWatchlist(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (inWatchlist) {
      removeFromWatchlist(movie.id);

      toast.error("Removed from watchlist");
    } else {
      addToWatchlist(movieData);

      toast.success("Added to watchlist");
    }
  }

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      bg-zinc-900
      border
      border-white/10
      shadow-2xl
      "
    >
      <Link to={detailsPath}>
        <div
          className="
          relative
          aspect-[2/3]
          overflow-hidden
          "
        >
          {!imageError && movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={title}
              loading="lazy"
              onError={() => setImageError(true)}
              className="
              w-full
              h-full
              object-cover
              transition
              duration-700
              group-hover:scale-110
              "
            />
          ) : (
            <div
              className="
              h-full
              flex
              items-center
              justify-center
              bg-zinc-800
              text-zinc-500
              "
            >
              No Image
            </div>
          )}

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/20
            to-transparent
            "
          />

          <div
            className="
            absolute
            top-4
            left-4
            bg-violet-600/80
            backdrop-blur-xl
            px-3
            py-1
            rounded-full
            text-xs
            font-bold
            "
          >
            {movie.media_type === "tv" ? "TV" : "MOVIE"}
          </div>

          <div
            className="
            absolute
            top-4
            right-4
            bg-black/70
            backdrop-blur-xl
            px-3
            py-1
            rounded-full
            text-sm
            "
          >
            ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
          </div>

          <AnimatePresence>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              whileHover={{
                opacity: 1,
                scale: 1,
              }}
              className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            "
            >
              <div
                className="
              w-16
              h-16
              rounded-full
              bg-white
              text-black
              flex
              items-center
              justify-center
              text-2xl
              shadow-xl
              "
              >
                ▶
              </div>
            </motion.div>
          </AnimatePresence>

          <div
            className="
            absolute
            bottom-4
            left-4
            right-4
            "
          >
            <h3
              className="
              text-xl
              font-black
              truncate
              "
            >
              {title}
            </h3>

            <div
              className="
              flex
              gap-2
              text-sm
              text-zinc-400
              "
            >
              <span>{year}</span>

              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>

      <div
        className="
        absolute
        bottom-16
        left-0
        right-0
        flex
        justify-center
        gap-3
        opacity-100
        md:opacity-0
        md:group-hover:opacity-100
        transition
        "
      >
        <button
          aria-label="Favorite"
          onClick={handleFavorite}
          className="
          w-10
          h-10
          rounded-full
          bg-black/80
          backdrop-blur
          hover:bg-white
          hover:text-black
          transition
          "
        >
          {favorite ? "❤️" : "♡"}
        </button>

        <button
          aria-label="Watched"
          onClick={handleWatched}
          className="
          w-10
          h-10
          rounded-full
          bg-black/80
          backdrop-blur
          hover:bg-white
          hover:text-black
          transition
          "
        >
          {watched ? "✓" : "+"}
        </button>

        <button
          aria-label="Watchlist"
          onClick={handleWatchlist}
          className="
          w-10
          h-10
          rounded-full
          bg-black/80
          backdrop-blur
          hover:bg-white
          hover:text-black
          transition
          "
        >
          {inWatchlist ? "📌" : "＋"}
        </button>
      </div>

      <div
        className="
        absolute
        bottom-3
        left-0
        right-0
        flex
        justify-center
        "
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            aria-label={`Rate ${star}`}
            onClick={() => addRating(movie.id, star)}
            className={`
            transition
            hover:scale-125
            ${rating && star <= rating ? "text-yellow-400" : "text-zinc-600"}
            `}
          >
            ★
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default memo(MovieCard);
