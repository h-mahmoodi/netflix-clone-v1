import MovieCarousel from "@src/components/app/movie/carousel";
import HomeSlider from "@src/components/app/movie/home-slider";
import { RequestEndPoints } from "@src/constants";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchSliderMovies,
  fetchTopRatedMovies,
} from "@src/fetchers";

const { discover, nowPalying, topRated } = RequestEndPoints;

const AppHomePage = () => {
  return (
    <div>
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
