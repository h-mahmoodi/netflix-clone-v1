import { TMDB_CONFIGS } from "@src/constants";
import {
  fetchMovieDetails,
  fetchRecommendedMovies,
  fetchSimilarMovies,
} from "@src/fetchers";
import { Movie } from "@src/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";
import MovieGrid from "@src/components/app/movie/grid";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";

const MovieRecommendedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  // useEffect(() => {
  //   setMovies([]);
  //   setPage(1);
  // }, [id]);

  useEffect(() => {
    if (data?.results) {
      setMovies((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
    }
  }, [data, page]);

  const fetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetching) {
      setPage((prevPage) => prevPage + 1);
      // const uniqueMovies = data?.results.filter(
      //   (newMovie: Movie) => !movies.some((movie) => movie.id === newMovie.id)
      // );
      // setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [hasNextPage, isFetching]);

  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isLoading: isFetching,
  });

  const navigateBackHandler = () => {
    navigate(`/movies/${id}`);
  };
  console.log("PAge :", page, "movies", movies);

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
        <div className={styles.headerContainer}>
          <div className={styles.headerTitle}>Recommended Movies</div>
          <div
            className={styles.headerTMovieName}
            onClick={navigateBackHandler}
          >
            <span>{mainMovie?.title || mainMovie?.name}</span>
          </div>
        </div>
      </div>
      <div className={styles.containerLayout}>
        <MovieGrid movies={movies} isLoading={isFetching} ref={loadMoreRef} />
      </div>
    </div>
  );
};
export default MovieRecommendedPage;
