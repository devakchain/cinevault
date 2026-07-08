function MovieDetailsSkeleton() {
  return (
    <div
      className="
      min-h-screen
      bg-black
      p-10
      animate-pulse
      "
    >

      <div
        className="
        h-[700px]
        rounded-3xl
        bg-zinc-900
        "
      />


      <div
        className="
        mt-12
        h-10
        w-60
        bg-zinc-900
        rounded-xl
        "
      />


      <div
        className="
        mt-8
        flex
        gap-6
        "
      >

        {[1,2,3,4,5].map((item)=>(
          <div
            key={item}
            className="
            min-w-[160px]
            h-[230px]
            bg-zinc-900
            rounded-2xl
            "
          />
        ))}

      </div>

    </div>
  );
}

export default MovieDetailsSkeleton;
