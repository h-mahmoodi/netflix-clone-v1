import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";

type HomeSliderBannerActionsProps = {
  movie: Movie;
};

const HomeSliderBannerActions = ({ movie }: HomeSliderBannerActionsProps) => {
  return (
    <div className={styles.actions}>
      <button className={styles.buttonPrimary}>
        <span>More Details</span>
        <i className="fi fi fi-sr-arrow-right flex text-3xl"></i>
      </button>
      <button className={styles.buttonSecondary}>
        <i className="fi fi-rr-heart  "></i>
        <span>Add to Favorite</span>
      </button>
      <button className={styles.buttonSecondary}>
        <i className="fi fi-rr-play-alt  "></i>
        <span>Add to Watch List</span>
      </button>
    </div>
  );
};
export default HomeSliderBannerActions;
