import { useRef, useState } from "react";

export function useHorizontalScroll() {
  const ref = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);


  function update() {
    const element = ref.current;

    if (!element) return;

    setCanScrollLeft(element.scrollLeft > 10);

    setCanScrollRight(
      element.scrollLeft + element.clientWidth <
      element.scrollWidth - 10
    );
  }


  function scroll(direction: "left" | "right") {
    const element = ref.current;

    if (!element) return;

    element.scrollBy({
      left:
        direction === "left"
          ? -element.clientWidth * 0.8
          : element.clientWidth * 0.8,

      behavior:"smooth",
    });
  }


  return {
    ref,
    canScrollLeft,
    canScrollRight,
    update,
    scroll,
  };
}
