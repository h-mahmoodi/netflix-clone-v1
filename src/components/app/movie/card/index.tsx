import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { TMDB_CONFIGS } from "@src/constants";
import fallBackImage from "@src/assets/fallback.png";

import MovieCardWatchListButton from "./watch-list-button";
import MovieCardFavoriteListButton from "./favorite-list-button";
import { useNavigate } from "react-router-dom";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const clickCardHandler = () => {
    navigate(`/movies/${movie.id}`);
  };
  return (
    <div className={styles.card} onClick={clickCardHandler}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={`${TMDB_CONFIGS.imageUrl}${movie?.poster_path}`}
          alt={movie?.title}
          onError={(e) => (e.currentTarget.src = fallBackImage)}
        />
        <div className={styles.overlay}>
          <div className={styles.overlayActions}>
            <div className={styles.imdb}>
              <i className="fi fi-rr-star"></i>
              <span>5.5</span>
            </div>
            <div className={styles.actions}>
              <MovieCardFavoriteListButton movie={movie} />
              <MovieCardWatchListButton movie={movie} />
            </div>
          </div>
          <div className={styles.overlayPlay}>
            <i className="fi fi-sr-play-circle"></i>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{movie?.title}</h2>
        <div className={styles.info}>
          <span>2013</span>
          <span>IMDb 5.5</span>
        </div>
      </div>
    </div>
  );
}
export default MovieCard;
