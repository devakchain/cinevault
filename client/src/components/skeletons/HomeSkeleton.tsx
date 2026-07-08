function HomeSkeleton() {
  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      p-6
      md:p-10
      animate-pulse
      "
    >

      {/* Hero Skeleton */}
      <div
        className="
        h-[500px]
        md:h-[650px]
        rounded-3xl
        bg-zinc-900
        "
      />


      {/* Rows Skeleton */}

      <div
        className="
        mt-12
        space-y-10
        "
      >

        {[1, 2, 3, 4].map((item) => (

          <div
            key={item}
          >

            <div
              className="
              w-48
              h-8
              bg-zinc-900
              rounded-lg
              mb-5
              "
            />


            <div
              className="
              flex
              gap-5
              overflow-hidden
              "
            >

              {[1,2,3,4,5].map((card)=>(
                <div
                  key={card}
                  className="
                  min-w-[160px]
                  h-[240px]
                  bg-zinc-900
                  rounded-2xl
                  "
                />
              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default HomeSkeleton;
