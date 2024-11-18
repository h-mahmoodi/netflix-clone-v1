import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import { Movie, MovieResponse, SortOption, SortState } from "@src/types/movie";
import MovieGrid from "../grid";
import SortControl from "@src/components/ui/sort-control";
import DispalyControl from "@src/components/ui/display-control";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";

type MovieDisplayGrid = {
  query: string;
  fetcher: (params: { query: string; page: number }) => Promise<MovieResponse>;
  sortOptions: SortOption[];
};

const MovieDisplayGrid = ({
  query,
  fetcher,
  sortOptions,
}: MovieDisplayGrid) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedSort, setSelectedSort] = useState<SortState>({
    field: (searchParams.get("sortBy") as keyof Movie | null) || null,
    direction: (searchParams.get("sortDir") as "asc" | "desc" | null) || null,
  });

  const [selectedGrid, setSelectedGrid] = useState<number | undefined>(
    undefined
  );

  const {
    data,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchPage", query],
    queryFn: ({ pageParam }) => fetcher({ query, page: pageParam || 1 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!query,
  });

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const movies: Movie[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  const [sortedMovies, setSortedMovies] = useState(movies);

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [searchParams]);

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

        <DispalyControl
          setSelectedGrid={setSelectedGrid}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
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
