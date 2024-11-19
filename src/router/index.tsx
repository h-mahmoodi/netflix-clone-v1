import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Suspender from "@src/components/global/suspender/Suspender";

import AppLayout from "../layouts/app-layout";

const AppHomePage = lazy(() => import("@src/pages/app/home-page"));
const AppMoviePage = lazy(() => import("@src/pages/app/movie-page"));
const AppNotFoundPage = lazy(() => import("@src/pages/app/not-found-page"));
const AppMovieRecommendedPage = lazy(() => import("@src/pages/app/movie-recommended-page"));
const AppMovieRelatedPage = lazy(() => import("@src/pages/app/movie-related-page"));
const AppExplorePage = lazy(() => import("@src/pages/app/explore-page"));
const AppSearchPage = lazy(() => import("@src/pages/app/search-page"));
const AppFavoritePage = lazy(() => import("@src/pages/app/favorites-page"));
const AppWatchListPage = lazy(() => import("@src/pages/app/watch-list-page"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Suspender component={<AppHomePage />} />} />
        <Route path="movies">
          <Route path="now-playing" element={<p>Now Playing Movies</p>} />
          <Route path="top-rated" element={<p>Top Rated Movies</p>} />
          <Route path="most-popular" element={<p>Most Popular</p>} />
          <Route path=":id">
            <Route index element={<Suspender component={<AppMoviePage />} />} />
            <Route path="recommended" element={<Suspender component={<AppMovieRecommendedPage />} />} />
            <Route path="related" element={<Suspender component={<AppMovieRelatedPage />} />} />
          </Route>
        </Route>
        <Route path="explore" element={<Suspender component={<AppExplorePage />} />} />
        <Route path="search" element={<Suspender component={<AppSearchPage />} />} />
        <Route path="favorites" element={<Suspender component={<AppFavoritePage />} />} />
        <Route path="watch-list" element={<Suspender component={<AppWatchListPage />} />} />
        <Route path="*" element={<AppNotFoundPage />} />
      </Route>
    </Routes>
  );
};
export default Router;
