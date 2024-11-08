import { useEffect, useRef } from "react";

const useClickOutSide = (handlerFN: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handlerFN();
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [handlerFN]);

  return ref;
};
export default useClickOutSide;
