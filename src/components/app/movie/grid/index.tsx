import { forwardRef } from "react";
import MovieCard from "../card";
import MovieCardSkeleton from "../card/skeleton";

import styles from "./styles.module.css";
import { Movie } from "@src/types/movie";

type MovieGridProps = {
  movies?: Movie[];
  isLoading?: boolean;
  grid: number;
};

const MovieGrid = forwardRef<HTMLDivElement, MovieGridProps>(
  ({ movies, isLoading, grid }, ref) => {
    return (
      <div className={styles.container}>
        <div
          className={styles.gridLayout}
          style={{
            gridTemplateColumns: `repeat(${grid},1fr)`,
          }}
        >
          {movies?.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} movie={movie} />
          ))}
          {isLoading &&
            Array(grid * 2)
              .fill(null)
              .map((_item, index) => <MovieCardSkeleton key={index} />)}
        </div>
        <div className={styles.moreButton} ref={ref}></div>
      </div>
    );
  }
);
export default MovieGrid;
