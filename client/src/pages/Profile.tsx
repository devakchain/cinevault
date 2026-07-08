import { motion } from "framer-motion";

import { useUserStore } from "../store/userStore";
import { useMovieStore } from "../store/movieStore";
import { useRatingStore } from "../store/ratingStore";

function Profile() {
  const user = useUserStore((state) => state.user);

  const watched = useMovieStore((state) => state.watched);

  const watchlist = useMovieStore((state) => state.watchlist);

  const favorites = useMovieStore((state) => state.favorites);

  const removeFromWatched = useMovieStore((state) => state.removeFromWatched);

  const removeFromWatchlist = useMovieStore(
    (state) => state.removeFromWatchlist
  );

  const removeFavorite = useMovieStore((state) => state.removeFavorite);

  const ratings = useRatingStore((state) => state.ratings);

  if (!user) {
    return (
      <div
        className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      text-xl
      "
      >
        Please login first
      </div>
    );
  }

  const averageRating = ratings.length
    ? (
        ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length
      ).toFixed(1)
    : "0";

  const sections = [
    {
      title: "Favorites",
      movies: favorites,
      remove: removeFavorite,
    },
    {
      title: "Recently Watched",
      movies: watched,
      remove: removeFromWatched,
    },
    {
      title: "My Watchlist",
      movies: watchlist,
      remove: removeFromWatchlist,
    },
  ];

  return (
    <div
      className="
min-h-screen
bg-black
text-white
p-8
"
    >
      {/* PROFILE HERO */}

      <motion.section
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
relative
overflow-hidden
rounded-3xl
p-10
mb-12
bg-gradient-to-br
from-violet-900
via-zinc-900
to-black
border
border-white/10
"
      >
        <div
          className="
absolute
w-96
h-96
bg-violet-600/20
blur-3xl
rounded-full
right-0
top-0
"
        />

        <div
          className="
relative
flex
items-center
gap-6
"
        >
          <div
            className="
w-24
h-24
rounded-full
bg-violet-600
flex
items-center
justify-center
text-4xl
font-black
"
          >
            {user.name.charAt(0)}
          </div>

          <div>
            <h1
              className="
text-5xl
font-black
"
            >
              {user.name}
            </h1>

            <p
              className="
text-zinc-400
mt-2
text-lg
"
            >
              Your personal cinema universe
            </p>
          </div>
        </div>
      </motion.section>

      {/* STATS */}

      <div
        className="
grid
grid-cols-2
md:grid-cols-4
gap-6
mb-14
"
      >
        {[
          ["Watched", watched.length],
          ["Watchlist", watchlist.length],
          ["Favorites", favorites.length],
          ["Rating", averageRating],
        ].map(([title, value]) => (
          <motion.div
            whileHover={{
              y: -8,
            }}
            key={title}
            className="
bg-zinc-900
rounded-2xl
p-6
border
border-white/10
"
          >
            <p
              className="
text-zinc-400
"
            >
              {title}
            </p>

            <p
              className="
text-5xl
font-black
mt-3
"
            >
              {value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* MOVIE SECTIONS */}

      {sections.map((section) => (
        <section
          key={section.title}
          className="
mb-16
"
        >
          <h2
            className="
text-3xl
font-black
mb-6
"
          >
            {section.title}
          </h2>

          {section.movies.length === 0 ? (
            <div
              className="
bg-zinc-900
rounded-2xl
p-10
text-center
text-zinc-500
border
border-white/10
"
            >
              No movies yet
            </div>
          ) : (
            <div
              className="
grid
grid-cols-2
sm:grid-cols-3
md:grid-cols-5
gap-6
"
            >
              {section.movies.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                  }}
                  className="
bg-zinc-900
rounded-2xl
overflow-hidden
border
border-white/10
"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                    className="
w-full
aspect-[2/3]
object-cover
"
                  />

                  <div
                    className="
p-4
"
                  >
                    <h3
                      className="
font-bold
line-clamp-1
"
                    >
                      {movie.title}
                    </h3>

                    <button
                      onClick={() => section.remove(movie.id)}
                      className="
mt-4
w-full
py-2
rounded-xl
bg-white/10
hover:bg-red-600
transition
text-sm
"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export default Profile;
