import { Movie, SortOption } from "@src/types/movie";
import MovieGrid from "../grid";
import SortControl from "@src/components/ui/sort-control";
import DispalyControl from "@src/components/ui/display-control";
import { forwardRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.module.css";

type MovieDisplayGridProps = {
  movies: Movie[];
  isFetching: boolean;
  error: Error | null;
  sortOptions: SortOption[];
  defaultGrid?: number;
};

const MovieDisplayGrid = forwardRef<HTMLDivElement, MovieDisplayGridProps>(
  ({ movies, isFetching, error, sortOptions, defaultGrid }, ref) => {
    const [sortedMovies, setSortedMovies] = useState(movies);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedGrid, setSelectedGrid] = useState<number | undefined>(
      defaultGrid
    );

    useEffect(() => {
      window.scroll({ top: 280, left: 0, behavior: "smooth" });
    }, [searchParams]);

    if (error) {
      return <div>Something went wrong</div>;
    }

    return (
      <div className={styles.containerLayout}>
        <div
          className="flex justify-between items-center 
         bg-zinc-950 sticky top-[81px] left-0 z-20 py-4 px-3 rounded-md mx-2"
        >
          <SortControl
            options={sortOptions}
            movies={movies}
            setter={setSortedMovies}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          <DispalyControl
            defaultGrid={defaultGrid}
            setSelectedGrid={setSelectedGrid}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <div>
          <MovieGrid
            movies={sortedMovies}
            isLoading={isFetching}
            ref={ref}
            grid={selectedGrid}
          />
        </div>
      </div>
    );
  }
);
export default MovieDisplayGrid;
