import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { searchMovies } from "../api/tmdb";

import MovieCard from "../components/MovieCard";

import type { Movie } from "../types/movie";

function Search() {
  const [query, setQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [type, setType] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: results, isLoading } = useQuery<Movie[]>({
    queryKey: ["search", debouncedQuery],

    queryFn: () => searchMovies(debouncedQuery),

    enabled: debouncedQuery.length > 2,
  });

  const filteredResults = results?.filter((movie) => {
    if (type === "all") return true;

    return movie.media_type === type;
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
mb-12
"
      >
        <h1
          className="
text-6xl
font-black
"
        >
          Discover
        </h1>

        <p
          className="
text-zinc-400
text-lg
mt-3
"
        >
          Search movies and series from thousands of titles
        </p>
      </section>

      {/* SEARCH */}

      <div
        className="
max-w-3xl
"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, series..."
          className="

w-full

bg-zinc-900

border

border-white/10

rounded-2xl

px-6

py-5

text-lg

outline-none

focus:border-violet-500

transition

"
        />
      </div>

      {/* FILTERS */}

      <div
        className="
flex
gap-3
mt-6
"
      >
        {[
          ["all", "All"],
          ["movie", "Movies"],
          ["tv", "TV Shows"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setType(value)}
            className={`
px-5
py-2
rounded-full
border
transition

${
  type === value
    ? "bg-violet-600 border-violet-500"
    : "bg-zinc-900 border-white/10 text-zinc-400"
}

`}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div
          className="
mt-12
text-zinc-400
"
        >
          Searching...
        </div>
      )}

      {filteredResults && (
        <p
          className="
mt-10
text-zinc-400
"
        >
          {filteredResults.length} results found
        </p>
      )}

      {filteredResults?.length === 0 && (
        <div
          className="
mt-10
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
            No results found
          </h2>

          <p
            className="
text-zinc-500
mt-3
"
          >
            Try another search
          </p>
        </div>
      )}

      <div
        className="
grid
grid-cols-2
sm:grid-cols-3
md:grid-cols-5
lg:grid-cols-6
gap-6
mt-10
"
      >
        {filteredResults?.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.03,
            }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Search;
