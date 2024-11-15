import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";

type HomeSliderBannerActionsProps = {
  movie: Movie;
};

const HomeSliderBannerActions = ({ movie }: HomeSliderBannerActionsProps) => {
  return (
    <div className={styles.actions}>
      <button
        className={styles.buttonPrimary}
        aria-label={`More Details ${movie.title || movie.name}`}
      >
        <span>More Details</span>
        <i className="fi fi fi-sr-arrow-right flex text-3xl"></i>
      </button>
      <button
        className={styles.buttonSecondary}
        aria-label={`Add to favorite ${movie.title || movie.name}`}
      >
        <i className="fi fi-rr-heart  "></i>
        <span>Add to Favorite</span>
      </button>
      <button
        className={styles.buttonSecondary}
        aria-label={`Add to watch list ${movie.title || movie.name}`}
      >
        <i className="fi fi-rr-play-alt  "></i>
        <span>Add to Watch List</span>
      </button>
    </div>
  );
};
export default HomeSliderBannerActions;
