import image from "@src/assets/movie.jpg";
import styles from "./styles.module.css";
import { Movie } from "@src/types/movie";
import { TMDB_CONFIGS } from "@src/constants";
import { truncateText } from "@src/utils/helpers";

type NavSearchMovieProps = {
  movie: Movie;
};

const NavSearchMovie = ({ movie }: NavSearchMovieProps) => {
  return (
    <div className={styles.movie}>
      <img src={`${TMDB_CONFIGS.imageUrl}${movie?.poster_path}`} alt="" />
      <div className={styles.movieDetails}>
        <div>
          <p className={styles.movieTitle}>{movie.name || movie.title}</p>
          <p className={styles.movieDesc}>{truncateText(movie.overview, 65)}</p>
        </div>
        <div className={styles.movieInfo}>
          <span>2013</span>
          <span>IMDb 5.5</span>
        </div>
      </div>
    </div>
  );
};
export default NavSearchMovie;
