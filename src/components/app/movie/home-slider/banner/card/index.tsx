import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { TMDB_CONFIGS } from "@src/constants";
import { useAppDispatch } from "@src/hooks/useAppDispatch";
import { openModal } from "@src/redux/modal-slice";
import MovieTrailer from "../../../trailer";

type HomeSliderBannerCardProps = {
  movie: Movie;
};

const HomeSliderBannerCard = ({ movie }: HomeSliderBannerCardProps) => {
  const dispatch = useAppDispatch();

  const handleWatchTrailer = () => {
    dispatch(
      openModal({
        title: movie?.title || movie?.title || "The Trailer",
        content: <MovieTrailer movieId={movie.id} />,
      })
    );
  };
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${TMDB_CONFIGS.imageUrl}${movie?.poster_path})`,
        }}
      >
        <div className={styles.play} onClick={handleWatchTrailer}>
          <i className="fi fi-tr-play-circle"></i>
          {/* <span>Watch Trailer</span> */}
        </div>
      </div>
    </div>
  );
};
export default HomeSliderBannerCard;
