import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/app-layout";
import AppHomePage from "@src/pages/app/home-page";
import AppMoviePage from "@src/pages/app/movie-page";
import AppNotFoundPage from "@src/pages/app/not-found-page";
import AppMovieRecommendedPage from "@src/pages/app/movie-recommended-page";
import AppMovieRelatedPage from "@src/pages/app/movie-related-page";
import AppFavoritePage from "@src/pages/app/favorites-page";
import AppExplorePage from "@src/pages/app/explore-page";
import AppSearchPage from "@src/pages/app/search-page";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<AppHomePage />} />
        <Route path="movies">
          <Route path="now-playing" element={<p>Now Playing Movies</p>} />
          <Route path="top-rated" element={<p>Top Rated Movies</p>} />
          <Route path="most-popular" element={<p>Most Popular</p>} />
          <Route path=":id">
            <Route index element={<AppMoviePage />} />
            <Route path="recommended" element={<AppMovieRecommendedPage />} />
            <Route path="related" element={<AppMovieRelatedPage />} />
          </Route>
        </Route>
        <Route path="explore" element={<AppExplorePage />} />
        <Route path="search" element={<AppSearchPage />} />
        <Route path="favorites" element={<AppFavoritePage />} />
        <Route path="*" element={<AppNotFoundPage />} />
      </Route>
    </Routes>
  );
};
export default Router;
