import { fetchSearchedMovies } from "@src/fetchers";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AppPageHeading from "@src/components/app/page-heading";
import { Movie, type SortOption } from "@src/types/movie";
import MovieDisplayGrid from "@src/components/app/movie/display-grid";
import { useInfiniteQuery } from "@tanstack/react-query";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";

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
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const { data, isFetching, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
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
  }, [searchParams]);

  const movies: Movie[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  const headerTitle = query ? `Search Results for ${query}` : "Please search something";

  return (
    <div>
      <AppPageHeading title={headerTitle} />
      <MovieDisplayGrid
        movies={movies}
        isFetching={isFetching}
        error={error}
        sortOptions={sortOptions}
        ref={loadMoreRef}
      />
    </div>
  );
};
export default AppSearchPage;
