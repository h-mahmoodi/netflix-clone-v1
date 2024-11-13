import { TMDB_CONFIGS } from "@src/constants";
import { fetchMovieDetails, fetchRecommendedMovies } from "@src/fetchers";
import { Movie } from "@src/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles.module.css";
import MovieGrid from "@src/components/app/movie/grid";
import useInfiniteScroll from "@src/hooks/useInfiniteScroll";
import MovieCardSkeleton from "@src/components/app/movie/card/skeleton";

const MovieRecommendedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [movies, setMovies] = useState<Movie[]>([]);
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
    // staleTime: 5 * 60 * 1000,
  });

  const pageChecker = useRef(1);

  const totalPages = data?.total_pages;
  const hasNextPage = page < totalPages;

  const movies = data?.results;

  // useEffect(() => {
  //   if (data?.results) {
  //     setMovies((prev) => [...prev, ...data.results]);
  //   }
  // }, [data, page]);

  // useEffect(() => {
  //   setMovies([]);
  //   setPage(1);
  // }, [id]);

  const fetchNextPage = () => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
      console.log("fireeeeeeee");
    }
    // pageChecker.current += 1;
  };

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
            {/* <span>
              <i className="fi fi-rr-arrow-left flex"></i>
            </span> */}
            <span>{mainMovie?.title || mainMovie?.name}</span>
          </div>
        </div>
      </div>
      <div className={styles.containerLayout}>
        <MovieGrid movies={movies} />
        <div className={styles.gridLayout}>
          {isFetching &&
            Array(15)
              .fill(null)
              .map((_item, index) => <MovieCardSkeleton key={index} />)}
        </div>
        {hasNextPage && (
          <div className={styles.moreButton} ref={loadMoreRef}>
            <button>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default MovieRecommendedPage;
