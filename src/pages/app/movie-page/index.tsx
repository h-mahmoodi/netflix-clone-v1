import { fetchMovieDetails, fetchSliderMovies } from "@src/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import { TMDB_CONFIGS } from "@src/constants";
import MovieCarousel from "@src/components/app/movie/carousel";
import { useEffect } from "react";

const AppMoviePage = () => {
  const { id } = useParams();

  const {
    data: movie,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["moviePage", id],
    queryFn: () => {
      if (id) {
        return fetchMovieDetails(id);
      }
    },
  });

  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTopHandler();
  }, [id]);

  console.log(movie);
  return (
    <div className={styles.page}>
      <div
        className={styles.movie}
        style={{
          backgroundImage: `url("${TMDB_CONFIGS.imageUrl}${movie?.backdrop_path}")`,
        }}
      >
        <div className={styles.movieSection}>
          <div className={styles.banner}>
            <img
              src={`${TMDB_CONFIGS.imageUrl}${movie?.poster_path}`}
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className={styles.details}>
            <h1 className={styles.title}>{movie?.title || movie?.name}</h1>
            <p className={styles.description}>{movie?.overview}</p>
          </div>
        </div>
        <div className={styles.backdrop}></div>
      </div>
      <div>
        <div className={styles.relatedSection}>
          <MovieCarousel title="Related Movies" fetcher={fetchSliderMovies} />
        </div>
      </div>
      AppMoviePage
    </div>
  );
};
export default AppMoviePage;
