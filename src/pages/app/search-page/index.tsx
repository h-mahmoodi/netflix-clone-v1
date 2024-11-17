import MovieGrid from "@src/components/app/movie/grid";
import { fetchSearchedMovies } from "@src/fetchers";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.module.css";
import AppPageHeading from "@src/components/app/page-heading";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import SortControl from "@src/components/ui/sort-control";
import { type Movie, type SortOption } from "@src/types/movie";
import DispalyControl from "@src/components/ui/display-control";

const sortOptions: SortOption[] = [
  {
    display: "Name",
    field: "title",
  },
  {
    display: "IMDb Score",
    field: "vote_average",
  },
  {
    display: "Popularity",
    field: "vote_count",
  },
  {
    display: "Released Date",
    field: "release_date",
  },
];

const AppSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
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
    queryFn: ({ pageParam }) => fetchSearchedMovies(query, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!query,
  });

  //   console.log(data);
  const movies: Movie[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  const [sortedMovies, setSortedMovies] = useState(movies);

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  useEffect(() => {
    if (searchParams.get("query") !== null) {
      setQuery(searchParams.get("query") as string);
    } else {
      setQuery("");
    }
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [searchParams]);
  //   console.log(data);

  const renderMovies = () => {
    if (error) {
      return <div>Something went wrong</div>;
    }
    return (
      <MovieGrid
        movies={sortedMovies}
        isLoading={isFetching}
        ref={loadMoreRef}
        grid={selectedGrid}
      />
    );
  };
  const headerTitle = query
    ? `Search Results for ${query}`
    : "Please search something";

  //   if (isSortLoading) {
  //     return <div>Sorting</div>;
  //   }
  // console.log("page");
  return (
    <div>
      <AppPageHeading title={headerTitle} />

      <div className={styles.containerLayout}>
        <div
          className="flex justify-between items-center 
         bg-zinc-950 sticky top-16 left-0 z-20 py-2 px-3"
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
        <div>{renderMovies()}</div>
      </div>
    </div>
  );
};
export default AppSearchPage;
