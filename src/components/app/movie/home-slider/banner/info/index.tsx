import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { truncateText } from "@src/utils/helpers";

type HomeSliderBannerInfoProps = {
  movie: Movie;
};

const HomeSliderBannerInfo = ({ movie }: HomeSliderBannerInfoProps) => {
  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{`${movie?.name || movie?.title} `}</h1>

      <p className={styles.description}>{truncateText(movie?.overview, 145)}</p>
    </div>
  );
};
export default HomeSliderBannerInfo;
