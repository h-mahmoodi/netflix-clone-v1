import { fetchSearchedMovies } from "@src/fetchers";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AppPageHeading from "@src/components/app/page-heading";
import { type Movie, type SortOption } from "@src/types/movie";
import MovieDisplayGrid from "@src/components/app/movie/display-grid";

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

  const movies: Movie[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  useEffect(() => {
    if (searchParams.get("query") !== null) {
      setQuery(searchParams.get("query") as string);
    } else {
      setQuery("");
    }
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [searchParams]);

  const headerTitle = query
    ? `Search Results for ${query}`
    : "Please search something";

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <AppPageHeading title={headerTitle} />

      <MovieDisplayGrid
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        movies={movies}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        error={error}
        sortOptions={sortOptions}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};
export default AppSearchPage;
