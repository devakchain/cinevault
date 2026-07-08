import { useState } from "react";
import { motion } from "framer-motion";

import { useMovieStore } from "../store/movieStore";

function Watchlist() {
  const watchlist = useMovieStore((state) => state.watchlist);

  const removeFromWatchlist = useMovieStore(
    (state) => state.removeFromWatchlist
  );

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("new");

  const filteredMovies = watchlist
    .filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name") {
        return a.title.localeCompare(b.title);
      }

      return new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime();
    });

  return (
    <div
      className="
min-h-screen
bg-black
text-white
p-8
"
    >
      {/* HEADER */}

      <section
        className="
mb-10
rounded-3xl
p-10
bg-gradient-to-r
from-violet-900
via-zinc-900
to-black
border
border-white/10
"
      >
        <h1
          className="
text-5xl
font-black
"
        >
          Watchlist
        </h1>

        <p
          className="
text-zinc-400
mt-3
text-lg
"
        >
          {watchlist.length} movies waiting to be watched
        </p>
      </section>

      {/* CONTROLS */}

      <div
        className="
flex
flex-col
md:flex-row
gap-4
mb-10
"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your watchlist..."
          className="
bg-zinc-900
border
border-white/10
rounded-xl
px-5
py-3
outline-none
w-full
md:w-96
"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
bg-zinc-900
border
border-white/10
rounded-xl
px-5
py-3
"
        >
          <option value="new">Recently Added</option>

          <option value="name">Name</option>
        </select>
      </div>

      {filteredMovies.length === 0 ? (
        <div
          className="
bg-zinc-900
rounded-3xl
p-12
text-center
border
border-white/10
"
        >
          <h2
            className="
text-2xl
font-bold
"
          >
            Your watchlist is empty
          </h2>

          <p
            className="
text-zinc-500
mt-3
"
          >
            Find movies and save them here
          </p>
        </div>
      ) : (
        <div
          className="
grid
grid-cols-2
sm:grid-cols-3
md:grid-cols-5
lg:grid-cols-6
gap-6
"
        >
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
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
              {movie.poster ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                  className="
aspect-[2/3]
w-full
object-cover
"
                />
              ) : (
                <div
                  className="
aspect-[2/3]
bg-zinc-800
flex
items-center
justify-center
"
                >
                  No Image
                </div>
              )}

              <div
                className="
p-4
"
              >
                <h2
                  className="
font-bold
line-clamp-1
"
                >
                  {movie.title}
                </h2>

                <p
                  className="
text-xs
text-zinc-500
mt-2
"
                >
                  Added {new Date(movie.watchedAt).toLocaleDateString()}
                </p>

                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="
mt-4
w-full
bg-white/10
hover:bg-red-600
transition
py-2
rounded-xl
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
    </div>
  );
}

export default Watchlist;
