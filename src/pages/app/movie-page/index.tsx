import {
  fetchMovieDetails,
  fetchRecommendedMovies,
  fetchSimilarMovies,
  fetchSliderMovies,
} from "@src/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import { TMDB_CONFIGS } from "@src/constants";
import MovieCarousel from "@src/components/app/movie/carousel";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import MoviePageDetails from "@src/components/app/movie/page-details";
import Loading from "@src/components/ui/loading";
import MoviePageDetailsSkeleton from "@src/components/app/movie/page-details/skeleton";

const AppMoviePage = () => {
  const { id } = useParams<{ id: string }>();

  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    scrollToTopHandler();
  }, [id]);

  return (
    <div className={styles.page}>
      <MoviePageDetails id={id} />
      <div>
        <div className={styles.relatedSection}>
          <MovieCarousel
            title="Recommended Movies"
            fetcher={() => fetchRecommendedMovies(id as string)}
            flag={id}
          />
        </div>
        <div className={styles.relatedSection}>
          <MovieCarousel
            title="Related Movies"
            fetcher={() => fetchSimilarMovies(id as string)}
            flag={id}
          />
        </div>
      </div>
      AppMoviePage
    </div>
  );
};
export default AppMoviePage;
