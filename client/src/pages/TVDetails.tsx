import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getTVDetails } from "../api/tmdb";

function TVDetails() {
  const { id } = useParams();

  const { data: show, isLoading } = useQuery({
    queryKey: ["tv", id],

    queryFn: () => getTVDetails(id!),
  });

  if (isLoading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section
        className="
        h-[650px]
        bg-cover
        bg-center
        flex
        items-end
        p-10
        "
        style={{
          backgroundImage: `
          linear-gradient(
            to top,
            black,
            transparent
          ),
          url(
          https://image.tmdb.org/t/p/original${show.backdrop_path}
          )
          `,
        }}
      >
        <div className="max-w-4xl">
          <h1 className="text-6xl font-bold">{show.name}</h1>

          <div className="flex gap-4 mt-5 text-lg">
            <span>⭐ {show.vote_average}</span>

            <span>📅 {show.first_air_date}</span>

            <span>📺 {show.number_of_seasons} Seasons</span>
          </div>

          <div className="flex gap-2 mt-5 flex-wrap">
            {show.genres?.map((genre: any) => (
              <span
                key={genre.id}
                className="
                bg-zinc-800
                px-3
                py-1
                rounded-full
                "
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-6 text-gray-300 text-lg">{show.overview}</p>
        </div>
      </section>

      <section className="p-10">
        <h2 className="text-3xl font-bold mb-6">Cast</h2>

        <div
          className="
        grid
        grid-cols-2
        md:grid-cols-6
        gap-6
        "
        >
          {show.credits?.cast

            ?.slice(0, 6)

            .map((actor: any) => (
              <div key={actor.id}>
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    className="rounded-xl"
                  />
                )}

                <p className="mt-2 font-semibold">{actor.name}</p>

                <p className="text-gray-400 text-sm">{actor.character}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default TVDetails;
