import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { TMDB_CONFIGS } from "@src/constants";

import MovieCardWatchListButton from "./watch-list-button";
import MovieCardFavoriteListButton from "./favorite-list-button";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={`${TMDB_CONFIGS.imageUrl}${movie?.poster_path}`}
          alt={movie?.title}
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
