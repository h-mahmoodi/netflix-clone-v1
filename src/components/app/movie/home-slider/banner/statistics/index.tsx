import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";

type HomeSliderBannerStatisticsProps = {
  movie: Movie;
};

const HomeSliderBannerStatistics = ({
  movie,
}: HomeSliderBannerStatisticsProps) => {
  return (
    <div className={styles.details}>
      <div className={styles.rate}>
        IMDb {Number(movie?.vote_average || 0)?.toFixed(1)}
      </div>
    </div>
  );
};
export default HomeSliderBannerStatistics;
