import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import { Movie, SortOption } from "@src/types/movie";
import MovieGrid from "../grid";
import SortControl from "@src/components/ui/sort-control";
import DispalyControl from "@src/components/ui/display-control";
import { useState } from "react";
import { URLSearchParamsInit } from "react-router-dom";

import styles from "./styles.module.css";

type MovieDisplayGrid = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  movies: Movie[];
  isFetching: boolean;
  isFetchingNextPage: boolean;
  error: Error | null;
  sortOptions: SortOption[];
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParamsInit) => void;
};

const MovieDisplayGrid = ({
  fetchNextPage,
  hasNextPage,
  movies,
  isFetching,
  isFetchingNextPage,
  error,
  sortOptions,
  searchParams,
  setSearchParams,
}: MovieDisplayGrid) => {
  const [selectedGrid, setSelectedGrid] = useState<number | undefined>(
    undefined
  );
  const [sortedMovies, setSortedMovies] = useState(movies);
  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  if (error) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className={styles.containerLayout}>
      <div
        className="flex justify-between items-center 
         bg-zinc-950 sticky top-16 left-0 z-20 py-4 px-3"
      >
        <SortControl
          options={sortOptions}
          movies={movies}
          setter={setSortedMovies}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <DispalyControl setSelectedGrid={setSelectedGrid} />
      </div>
      <div>
        <MovieGrid
          movies={sortedMovies}
          isLoading={isFetching}
          ref={loadMoreRef}
          grid={selectedGrid}
        />
      </div>
    </div>
  );
};
export default MovieDisplayGrid;
