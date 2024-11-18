import { fetchMovieDetails, fetchSimilarMovies } from "@src/fetchers";
import { Movie, SortOption } from "@src/types/movie";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import MovieRelatedPageSkeleton from "./components/skeleton";
import MovieRelatedPageHeader from "./components/header";
import { useEffect, useMemo } from "react";
import MovieDisplayGrid from "@src/components/app/movie/display-grid";

import styles from "./styles.module.css";
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

const AppMovieRelatedPage = () => {
  const [searchParams] = useSearchParams();
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
    enabled: !!id,
  });

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  const movies: Movie[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [searchParams]);

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

  // if (error) {
  //   return <div>Something went wrong</div>;
  // }

  console.log(id);

  return (
    <div className={styles.page}>
      {renderHeader()}
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
export default AppMovieRelatedPage;
