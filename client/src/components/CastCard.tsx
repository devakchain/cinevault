type CastCardProps = {
  actor: {
    id: number;
    name: string;
    character?: string;
    profile_path?: string | null;
  };
};


function CastCard({ actor }: CastCardProps) {

  return (
    <div
      className="
      min-w-[160px]
      group
      "
    >

      <div
        className="
        overflow-hidden
        rounded-2xl
        bg-zinc-900
        border
        border-white/10
        "
      >

        {actor.profile_path ? (

          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            loading="lazy"
            className="
            w-full
            h-[230px]
            object-cover
            transition
            duration-500
            group-hover:scale-110
            "
          />

        ) : (

          <div
            className="
            h-[230px]
            flex
            items-center
            justify-center
            text-zinc-500
            "
          >
            No Image
          </div>

        )}

      </div>


      <h3
        className="
        mt-3
        font-bold
        text-white
        truncate
        "
      >
        {actor.name}
      </h3>


      <p
        className="
        text-sm
        text-zinc-400
        truncate
        "
      >
        {actor.character ?? "Unknown"}
      </p>


    </div>
  );
}


export default CastCard;
