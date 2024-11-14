import MovieCarousel from "@src/components/app/movie/carousel";
import HomeSlider from "@src/components/app/movie/home-slider";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "@src/fetchers";

import style from "./styles.module.css";

const AppHomePage = () => {
  return (
    <div className={style.page}>
      <HomeSlider />
      <div className="container mx-auto">
        <MovieCarousel
          title="Now Playing Movies"
          fetcher={fetchNowPlayingMovies}
        />
        <MovieCarousel title="Top Rated Movies" fetcher={fetchTopRatedMovies} />
        <MovieCarousel
          title="Most Popular Movies"
          fetcher={fetchPopularMovies}
        />
      </div>
    </div>
  );
};
export default AppHomePage;
