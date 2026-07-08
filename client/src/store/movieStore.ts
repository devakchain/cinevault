import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { WatchedMovie } from "../types/movie";

interface MovieState {
  watched: WatchedMovie[];

  watchlist: WatchedMovie[];

  favorites: WatchedMovie[];

  addWatched: (movie: WatchedMovie) => void;

  addToWatchlist: (movie: WatchedMovie) => void;

  addFavorite: (movie: WatchedMovie) => void;

  removeFromWatchlist: (id: number) => void;

  removeFromWatched: (id: number) => void;

  removeFavorite: (id: number) => void;

  isFavorite: (id: number) => boolean;
}

export const useMovieStore = create<MovieState>()(
  persist(
    (set, get) => ({
      watched: [],

      watchlist: [],

      favorites: [],

      addWatched: (movie) =>
        set((state) => {
          const exists = state.watched.some((item) => item.id === movie.id);

          if (exists) return state;

          return {
            watched: [...state.watched, movie],
          };
        }),

      addToWatchlist: (movie) =>
        set((state) => {
          const exists = state.watchlist.some((item) => item.id === movie.id);

          if (exists) return state;

          return {
            watchlist: [...state.watchlist, movie],
          };
        }),

      addFavorite: (movie) =>
        set((state) => {
          const exists = state.favorites.some((item) => item.id === movie.id);

          if (exists) return state;

          return {
            favorites: [...state.favorites, movie],
          };
        }),

      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((movie) => movie.id !== id),
        })),

      removeFromWatched: (id) =>
        set((state) => ({
          watched: state.watched.filter((movie) => movie.id !== id),
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.id !== id),
        })),

      isFavorite: (id) => get().favorites.some((movie) => movie.id === id),
    }),
    {
      name: "cinevault-movies",
    }
  )
);
