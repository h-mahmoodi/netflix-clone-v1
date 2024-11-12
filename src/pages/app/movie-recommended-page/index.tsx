import { TMDB_CONFIGS } from "@src/constants";
import { fetchMovieDetails, fetchRecommendedMovies } from "@src/fetchers";
import { Movie } from "@src/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import MovieGrid from "@src/components/app/movie/grid";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import MovieCardSkeleton from "@src/components/app/movie/card/skeleton";

const MovieRecommendedPage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
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
  const { data, isFetching, error } = useQuery({
    queryKey: ["MovieRecommendedPage", id, page],
    queryFn: () => fetchRecommendedMovies(id as string, page),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const totalPages = data?.total_pages;
  const hasNextPage = page < totalPages;

  useEffect(() => {
    if (data?.results) {
      setMovies((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
    }
  }, [data, page]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [id]);

  const fetchNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetching,
  });

  return (
    <div className={styles.page}>
      <div
        className={styles.header}
        style={{
          backgroundImage: `url(${TMDB_CONFIGS.imageUrl}${mainMovie?.backdrop_path})`,
          backgroundPosition: "center center",
        }}
      >
        <div className={styles.headerOverlay}></div>
        <div className={styles.headerTitle}>Recommended Movies</div>
        <div className={styles.headerTMovieName}>
          {mainMovie?.title || mainMovie?.name}
        </div>
      </div>
      <div className={styles.containerLayout}>
        <MovieGrid movies={movies} loading={isFetching} />
        {page < totalPages && (
          <div className={styles.moreButton} ref={loadMoreRef}>
            <button>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MovieRecommendedPage;
