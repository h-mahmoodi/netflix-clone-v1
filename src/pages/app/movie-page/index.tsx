import { fetchRecommendedMovies, fetchSimilarMovies } from "@src/fetchers";
import { useParams } from "react-router-dom";

import styles from "./styles.module.css";
import MovieCarousel from "@src/components/app/movie/carousel";
import { useLayoutEffect } from "react";
import MoviePageDetails from "@src/components/app/movie/page-details";

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
      <MoviePageDetails id={id as string} />
      <div>
        <div className={styles.relatedSection}>
          <MovieCarousel
            title="Recommended Movies"
            fetcher={() => fetchRecommendedMovies(id as string)}
            flag={id}
            link="recommended"
          />
        </div>
        <div className={styles.relatedSection}>
          <MovieCarousel
            title="Related Movies"
            fetcher={() => fetchSimilarMovies(id as string)}
            flag={id}
            link="related"
          />
        </div>
      </div>
      AppMoviePage
    </div>
  );
};
export default AppMoviePage;
