import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { TMDB_CONFIGS } from "@src/constants";
import fallBackImage from "@src/assets/fallback.png";

import MovieCardWatchListButton from "./watch-list-button";
import MovieCardFavoriteListButton from "./favorite-list-button";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@src/hooks/useAppDispatch";
import { openModal } from "@src/redux/modal-slice";
import MovieTrailer from "../trailer";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleWatchTrailer = () => {
    dispatch(
      openModal({
        title: movie?.title || movie?.title || "The Trailer",
        content: <MovieTrailer movieId={movie.id} />,
      })
    );
  };
  const clickCardHandler = () => {
    navigate(`/movies/${movie.id}`);
  };
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={`${TMDB_CONFIGS.imageUrl}${movie?.poster_path}`}
          alt={movie?.title}
          onError={(e) => (e.currentTarget.src = fallBackImage)}
        />
        <Link className={styles.overlay} to={`/movies/${movie.id}`}>
          <div className={styles.overlayPlay}>
            <i className="fi fi-tr-play-circle"></i>
          </div>
        </Link>
      </div>
      <div className={styles.details}>
        <div className={styles.detailsContainer}>
          <div className="flex justify-between items-center text-xl">
            <div className="flex gap-3">
              <MovieCardFavoriteListButton movie={movie} />
              <MovieCardWatchListButton movie={movie} />
            </div>
            {/* <div className={styles.linkArrow} onClick={clickCardHandler}>
              <span>
                <i
                  className="fi fi fi-sr-arrow-right flex text-3xl
                 hover:text-red-700 cursor-pointer duration-300"
                ></i>
              </span>
            </div> */}
          </div>
          <Link className={styles.title} to={`/movies/${movie.id}`}>
            {movie?.title}
          </Link>
          <div className={styles.info}>
            <span>{new Date(movie.release_date as string).getFullYear()}</span>
            <span>IMDb {movie.vote_average?.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieCard;
