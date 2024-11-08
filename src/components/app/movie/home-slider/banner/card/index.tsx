import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { TMDB_CONFIGS } from "@src/constants";

type HomeSliderBannerCardProps = {
  movie: Movie;
};

const HomeSliderBannerCard = ({ movie }: HomeSliderBannerCardProps) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${TMDB_CONFIGS.imageUrl}${movie?.poster_path})`,
        }}
      ></div>
    </div>
  );
};
export default HomeSliderBannerCard;
