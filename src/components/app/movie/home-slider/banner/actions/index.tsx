import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { useAppDispatch } from "@src/hooks/useAppDispatch";
import { openModal } from "@src/redux/modal-slice";

type HomeSliderBannerActionsProps = {
  movie: Movie;
};

const HomeSliderBannerActions = ({ movie }: HomeSliderBannerActionsProps) => {
  const dispatch = useAppDispatch();

  const handleWatchTrailer = () => {
    dispatch(openModal("aaaaaaaaaaaaaaaaa"));
  };

  return (
    <div className={styles.actions}>
      <div className={styles.play} onClick={handleWatchTrailer}>
        <i className="fi fi-rr-play-circle"></i>
        <span>Watch Trailer</span>
      </div>
      <button className={styles.button}>Show Details</button>
    </div>
  );
};
export default HomeSliderBannerActions;
