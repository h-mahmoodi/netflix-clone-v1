import { getRandomArrayItems } from "@src/utils/helpers";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";
import HomeSliderNavigation from "./navigation";
import HomeSliderBannerList from "./banner-list";
import HomeSliderBullets from "./bullets";
import HomeSliderTimer from "./timer";
import { Movie } from "@src/types/movie";
import MovieSliderSkeleton from "./skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchSliderMovies } from "@src/fetchers";

const HomeSlider = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["HomeSlider"],
    queryFn: () => fetchSliderMovies(),
  });

  const [selectedMovie, setSelectedMovie] = useState(0);
  const moviesCount = 5;
  const interval = 8000;
  const tick = 10;

  const sliderRef = useRef(null);

  console.log(data);

  useEffect(() => {
    setMovies(getRandomArrayItems(data?.results, moviesCount) || []);
  }, [data, moviesCount]);

  const handleSelectImage = useCallback((index: number) => {
    setSelectedMovie(index);
  }, []);

  if (isPending || error) {
    return <MovieSliderSkeleton />;
  }

  return (
    <div className={styles.slider} ref={sliderRef}>
      <div className={styles.inner}>
        <div className={styles.bannerList}>
          <HomeSliderBannerList movies={movies} selectedMovie={selectedMovie} />
        </div>

        <div className={styles.navigation}>
          <HomeSliderNavigation
            totalItems={moviesCount}
            selectedIndex={selectedMovie}
            handlerFn={handleSelectImage}
          />
        </div>

        <div className={styles.bullets}>
          <HomeSliderBullets
            totalItems={moviesCount}
            selectedIndex={selectedMovie}
            handlerFn={handleSelectImage}
          />
        </div>
        <div className={styles.timeBar}>
          <HomeSliderTimer
            interval={interval}
            tick={tick}
            handlerFn={handleSelectImage}
            sliderRef={sliderRef}
            totalItems={moviesCount}
            selectedIndex={selectedMovie}
          />
        </div>
      </div>
    </div>
  );
};
export default HomeSlider;
