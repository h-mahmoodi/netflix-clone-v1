import { forwardRef } from "react";
import MovieCard from "../card";

import styles from "./styles.module.css";
import { Movie } from "@src/types/movie";

type MovieGridProps = {
  movies?: Movie[];
  isLoading?: boolean;
  grid?: number;
};

const MovieGrid = forwardRef<HTMLDivElement, MovieGridProps>(({ movies, grid = 5 }, ref) => {
  return (
    <div className={styles.container}>
      <div className={styles.gridLayout}>
        {movies?.map((movie, index) => (
          <div className={styles[`width-1-${grid}`]} key={`${movie.id}-${index}`}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      <div className={styles.moreButton} ref={ref}></div>
    </div>
  );
});
export default MovieGrid;
