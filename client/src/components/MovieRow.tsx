import { memo, useEffect } from "react";
import { motion } from "framer-motion";

import MovieCard from "./MovieCard";

import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

import type { Movie } from "../types/movie";

type MovieRowProps = {
  title: string;
  movies: Movie[];
};

function MovieRow({ title, movies }: MovieRowProps) {
  const { ref, canScrollLeft, canScrollRight, update, scroll } =
    useHorizontalScroll();

  useEffect(() => {
    update();

    const element = ref.current;

    if (!element) return;

    const observer = new ResizeObserver(() => {
      update();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [movies]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        scroll("left");
      }

      if (e.key === "ArrowRight") {
        scroll("right");
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  if (!movies.length) {
    return null;
  }

  return (
    <section
      className="
      relative
      mb-14
      "
    >
      <div
        className="
        flex
        items-center
        justify-between
        mb-6
        "
      >
        <h2
          className="
          text-white
          text-2xl
          md:text-3xl
          font-black
          tracking-tight
          "
        >
          {title}
        </h2>

        <button
          className="
          hidden
          md:block
          text-sm
          text-zinc-400
          hover:text-white
          transition
          "
        >
          See all
        </button>
      </div>

      <div
        className="
        relative
        "
      >
        {canScrollLeft && (
          <div
            className="
            absolute
            left-0
            top-0
            bottom-0
            w-32
            bg-gradient-to-r
            from-black
            to-transparent
            z-10
            pointer-events-none
            "
          />
        )}

        <motion.div
          ref={ref}
          onScroll={update}
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
          flex
          gap-6
          overflow-x-auto
          scroll-smooth
          pb-5
          snap-x
          snap-mandatory
          scrollbar-hide
          "
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="
              min-w-[210px]
              md:min-w-[220px]
              snap-start
              "
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>

        {canScrollRight && (
          <div
            className="
            absolute
            right-0
            top-0
            bottom-0
            w-32
            bg-gradient-to-l
            from-black
            to-transparent
            z-10
            pointer-events-none
            "
          />
        )}

        <div
          className="
          hidden
          md:flex
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          z-20
          gap-3
          "
        >
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="
            w-12
            h-12
            rounded-full
            bg-black/70
            backdrop-blur-xl
            border
            border-white/10
            text-white
            hover:bg-white
            hover:text-black
            disabled:opacity-30
            transition
            "
          >
            ←
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="
            w-12
            h-12
            rounded-full
            bg-black/70
            backdrop-blur-xl
            border
            border-white/10
            text-white
            hover:bg-white
            hover:text-black
            disabled:opacity-30
            transition
            "
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default memo(MovieRow);
