import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type CarouselNavigationProps = {
  itemsCount: number;
  viewCount: number;
  handlerFn: (number: number) => void;
};

function CarouselNavigation({
  itemsCount,
  viewCount,
  handlerFn,
}: CarouselNavigationProps) {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    handlerFn(startIndex);
  }, [handlerFn, startIndex]);

  if (itemsCount < 5) {
    return null;
  }

  return (
    <div className={styles.navigation}>
      <button
        className={`${styles.left} ${
          startIndex === 0 ? styles.hidden : undefined
        }`}
        onClick={() => setStartIndex((prev) => prev - 1)}
        aria-label="previous slide"
      >
        <i className="fi fi-br-angle-left"></i>
      </button>
      <button
        className={`${styles.right} ${
          startIndex + viewCount === itemsCount ? styles.hidden : undefined
        }`}
        onClick={() => setStartIndex((prev) => prev + 1)}
        aria-label="next slide"
      >
        <i className="fi fi-br-angle-right"></i>
      </button>
    </div>
  );
}
export default CarouselNavigation;
