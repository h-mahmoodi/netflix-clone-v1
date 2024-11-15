import styles from "./styles.module.css";
import { Movie } from "@src/types/movie";
import { TMDB_CONFIGS } from "@src/constants";
import { truncateText } from "@src/utils/helpers";
import { useNavigate } from "react-router-dom";

import fallBackImage from "@src/assets/fallback.png";

type NavSearchMovieProps = {
  movie: Movie;
  onClose: () => void;
};

const NavSearchMovie = ({ movie, onClose }: NavSearchMovieProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
    onClose();
  };
  return (
    <div className={styles.movie} onClick={handleClick}>
      <img
        src={`${TMDB_CONFIGS.imageUrl_w150}${movie?.poster_path}`}
        alt={movie?.title || movie?.name}
        onError={(e) => (e.currentTarget.src = fallBackImage)}
        loading="lazy"
      />
      <div className={styles.movieDetails}>
        <div>
          <p className={styles.movieTitle}>{movie.name || movie.title}</p>
          <p className={styles.movieDesc}>
            {truncateText(movie.overview, 110)}
          </p>
        </div>
        <div className={styles.movieInfo}>
          <span>{new Date(movie.release_date as string).getFullYear()}</span>
          <span>IMDb {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};
export default NavSearchMovie;
