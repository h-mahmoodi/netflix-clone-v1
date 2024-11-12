import { TMDB_CONFIGS } from "@src/constants";
import { fetchMovieDetails, fetchRecommendedMovies } from "@src/fetchers";
import { Movie } from "@src/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import MovieGrid from "@src/components/app/movie/grid";

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
    initialData: { results: [] },
  });

  const result = data?.results;
  const totalPages = data?.total_pages;

  const handleViewMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setMovies((prev) => [...prev, ...result]);
  }, [result]);

  console.log(mainMovie);
  console.log(data);
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
          <div className={styles.moreButton}>
            <button onClick={handleViewMore}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MovieRecommendedPage;
