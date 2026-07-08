import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Rating {
  movieId: number;

  rating: number;
}

interface RatingState {
  ratings: Rating[];

  addRating: (movieId: number, rating: number) => void;

  getRating: (movieId: number) => number | undefined;
}

export const useRatingStore = create<RatingState>()(
  persist(
    (set, get) => ({
      ratings: [],

      addRating: (movieId, rating) =>
        set((state) => ({
          ratings: [
            ...state.ratings.filter((item) => item.movieId !== movieId),

            {
              movieId,
              rating,
            },
          ],
        })),

      getRating: (movieId) =>
        get().ratings.find((item) => item.movieId === movieId)?.rating,
    }),

    {
      name: "cinevault-ratings",
    }
  )
);
