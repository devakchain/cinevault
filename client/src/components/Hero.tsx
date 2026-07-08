import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

import { useMovieStore } from "../store/movieStore";

type HeroProps = {
  id: number;
  title: string;
  overview: string;
  backdrop: string;
  poster: string;
  vote?: number;
  year?: string;
  genres?: string[];
  type?: "movie" | "tv";
};

function Hero({
  id,
  title,
  overview,
  backdrop,
  poster,
  vote,
  year,
  genres = [],
  type = "movie",
}: HeroProps) {
  const [imageError, setImageError] = useState(false);

  const addToWatchlist = useMovieStore((state) => state.addToWatchlist);

  const removeFromWatchlist = useMovieStore(
    (state) => state.removeFromWatchlist
  );

  const watchlist = useMovieStore((state) => state.watchlist);

  const inWatchlist = watchlist.some((movie) => movie.id === id);

  function toggleWatchlist() {
    if (inWatchlist) {
      removeFromWatchlist(id);

      toast.success("Removed from watchlist");

      return;
    }

    addToWatchlist({
      id,

      title,

      poster,

      watchedAt: new Date().toISOString(),
    });

    toast.success("Added to watchlist 🎬");
  }

  const detailsPath = type === "tv" ? `/tv/${id}` : `/movie/${id}`;

  const shortOverview =
    overview.length > 280 ? `${overview.slice(0, 280)}...` : overview;

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
      relative
      min-h-[750px]
      flex
      items-end
      overflow-hidden
      "
    >
      {/* Background */}

      {!imageError && backdrop ? (
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          onError={() => setImageError(true)}
          className="
          absolute
          inset-0
          bg-cover
          bg-center
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
            transparent 45%
            ),

            url(
            https://image.tmdb.org/t/p/original${backdrop}
            )

            `,
          }}
        />
      ) : (
        <div
          className="
          absolute
          inset-0
          bg-zinc-900
          "
        />
      )}

      <div
        className="
        absolute
        inset-0
        bg-black/20
        "
      />

      <div
        className="
        relative
        z-10
        w-full
        px-6
        md:px-12
        pb-16
        "
      >
        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-10
          items-end
          "
        >
          {poster && (
            <motion.img
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              src={`https://image.tmdb.org/t/p/w500${poster}`}
              alt={title}
              loading="lazy"
              className="
              hidden
              md:block
              w-[260px]
              rounded-3xl
              shadow-2xl
              border
              border-white/10
              "
            />
          )}

          <div
            className="
            max-w-5xl
            text-white
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
              inline-flex
              gap-2
              items-center
              bg-violet-600/20
              border
              border-violet-500/30
              px-4
              py-2
              rounded-full
              mb-5
              "
            >
              {type === "tv" ? "📺 Popular Series" : "🔥 Trending Movie"}
            </motion.div>

            <h1
              className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              "
            >
              {title}
            </h1>

            <div
              className="
              flex
              flex-wrap
              gap-5
              mt-6
              text-zinc-300
              "
            >
              {vote !== undefined && <span>⭐ {vote.toFixed(1)}</span>}

              {year && <span>📅 {year}</span>}
            </div>

            <div
              className="
              flex
              flex-wrap
              gap-3
              mt-5
              "
            >
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="
                  bg-white/10
                  border
                  border-white/20
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  "
                >
                  {genre}
                </span>
              ))}
            </div>

            <p
              className="
              mt-7
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
              gap-4
              mt-8
              flex-wrap
              "
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
              >
                <Link
                  to={detailsPath}
                  className="
                  bg-white
                  text-black
                  px-8
                  py-3
                  rounded-xl
                  font-bold
                  "
                >
                  ▶ Watch Now
                </Link>
              </motion.div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                onClick={toggleWatchlist}
                className="
                bg-white/10
                border
                border-white/20
                backdrop-blur-xl
                px-8
                py-3
                rounded-xl
                hover:bg-white/20
                transition
                "
              >
                {inWatchlist ? "✓ Remove List" : "＋ Add To List"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;
