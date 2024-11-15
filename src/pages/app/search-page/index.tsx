import MovieGrid from "@src/components/app/movie/grid";
import { fetchMovies, fetchSearchedMovies } from "@src/fetchers";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchPageHeader from "./components/header";

import styles from "./styles.module.css";
import AppPageHeading from "@src/components/app/page-heading";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";

const AppSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
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
  });

  console.log(data);
  const movies = data?.pages.flatMap((page) => page.results) || [];

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  useEffect(() => {
    setQuery(searchParams.get("query"));
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [searchParams]);
  //   console.log(data);

  const renderMovies = () => {
    if (error) {
      return <div>Something went wrong</div>;
    }
    return (
      <div className={styles.containerLayout}>
        <MovieGrid movies={movies} isLoading={isFetching} ref={loadMoreRef} />
      </div>
    );
  };
  return (
    <div>
      <AppPageHeading title={`Search Results for ${query}`} />
      <div className={styles.containerLayout}>{renderMovies()}</div>
    </div>
  );
};
export default AppSearchPage;
