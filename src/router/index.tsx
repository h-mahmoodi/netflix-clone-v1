import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/app-layout";
import AppHomePage from "@src/pages/app/home-page";
import AppMoviePage from "@src/pages/app/movie-page";
import AppNotFoundPage from "@src/pages/app/not-found-page";
import MovieRecommendedPage from "@src/pages/app/movie-recommended-page";
import MovieRelatedPage from "@src/pages/app/movie-related-page";

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
            <Route path="recommended" element={<MovieRecommendedPage />} />
            <Route path="related" element={<MovieRelatedPage />} />
          </Route>
        </Route>
        <Route path="*" element={<AppNotFoundPage />} />
      </Route>
    </Routes>
  );
};
export default Router;
