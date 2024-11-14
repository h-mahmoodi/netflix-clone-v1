import { fetchMovieDetails, fetchSimilarMovies } from "@src/fetchers";
import { Movie } from "@src/types/movie";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import MovieGrid from "@src/components/app/movie/grid";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import MovieRelatedPageSkeleton from "./components/skeleton";
import MovieRelatedPageHeader from "./components/header";
import { useEffect } from "react";

const AppMovieRelatedPage = () => {
  const { id } = useParams();
  const {
    data: mainMovie,
    isFetching: mainMovieIsFetching,
    error: mainMovieError,
  } = useQuery<Movie>({
    queryKey: ["moviePageDetails", id],
    queryFn: () => fetchMovieDetails(id as string),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["MovieRelatedPage", id],
    queryFn: ({ pageParam }) => fetchSimilarMovies(id as string, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const movies = data?.pages.flatMap((page) => page.results) || [];

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  useEffect(() => {
    const moveToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    moveToTop();
  }, []);

  const renderHeader = () => {
    if (mainMovieIsFetching) {
      return <MovieRelatedPageSkeleton />;
    }
    if (mainMovieError) {
      return <div>Something went wrong</div>;
    }
    if (!mainMovieIsFetching && mainMovie) {
      return <MovieRelatedPageHeader movie={mainMovie} />;
    }
  };

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
    <div className={styles.page}>
      {renderHeader()}
      {renderMovies()}
    </div>
  );
};
export default AppMovieRelatedPage;
