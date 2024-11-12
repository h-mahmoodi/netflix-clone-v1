import styles from "./styles.module.css";
import { TMDB_CONFIGS } from "@src/constants";
import { Movie } from "@src/types/movie";
import HomeSliderBannerCard from "./card";
import HomeSliderBannerStatistics from "./statistics";
import HomeSliderBannerInfo from "./info";
import HomeSliderBannerActions from "./actions";

type HomeSliderBannerProps = {
  movie: Movie;
};

function HomeSliderBanner({ movie }: HomeSliderBannerProps) {
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${TMDB_CONFIGS.imageUrl}${movie?.backdrop_path})`,
      }}
    >
      <>
        <div className={styles.overlay}></div>
        <div className={styles.containerBox}>
          <div className={styles.content}>
            <HomeSliderBannerCard movie={movie} />
            <div className={styles.details}>
              {/* <HomeSliderBannerStatistics movie={movie} /> */}
              <HomeSliderBannerInfo movie={movie} />
              <HomeSliderBannerActions movie={movie} />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
export default HomeSliderBanner;
