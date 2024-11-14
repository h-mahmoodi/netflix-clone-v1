import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { TMDB_CONFIGS } from "@src/constants";
import { useNavigate } from "react-router-dom";

type MovieRecommendedPageHeaderProps = {
  movie: Movie;
};

const MovieRecommendedPageHeader = ({
  movie,
}: MovieRecommendedPageHeaderProps) => {
  const navigate = useNavigate();
  const navigateBackHandler = () => {
    navigate(`/movies/${movie.id}`);
  };
  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: `url(${TMDB_CONFIGS.imageUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles.headerOverlay}></div>
      <div className={styles.headerContainer}>
        <div className={styles.headerTitle}>Recommended Movies</div>
        <div className={styles.headerMovieName} onClick={navigateBackHandler}>
          <span>{movie?.title || movie?.name}</span>
        </div>
        <div className={styles.headerMovieDetails}>
          <span>Realese Date:{movie?.release_date}</span>
          <span>IMDb {movie?.vote_average}</span>
        </div>
      </div>
    </div>
  );
};
export default MovieRecommendedPageHeader;
