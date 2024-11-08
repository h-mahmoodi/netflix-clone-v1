import { Movie } from "@src/types/movie";
import HomeSliderBanner from "../banner";
import styles from "./styles.module.css";

type HomeSliderBannerListProps = {
  movies: Movie[];
  selectedMovie: number;
};

const HomeSliderBannerList = ({
  movies,
  selectedMovie,
}: HomeSliderBannerListProps) => {
  return (
    <>
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`${styles.banner} ${
            selectedMovie === index ? styles.active : undefined
          }`}
        >
          <HomeSliderBanner movie={movie} />
        </div>
      ))}
    </>
  );
};
export default HomeSliderBannerList;
