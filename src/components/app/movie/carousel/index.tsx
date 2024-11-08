import MovieCard from "@components/app/movie/card";
import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./styles.module.css";
import MovieCardSkeleton from "../card/skeleton";
import CarouselHeader from "./header";
import CarouselNavigation from "./navigation";
import { useQuery } from "@tanstack/react-query";
import {
  fetchMovies,
  fetchNowPlayingMovies,
  fetchSliderMovies,
} from "@src/fetchers";
import { Movie } from "@src/types/movie";

type MovieCarouselProps = {
  title: string;
  fetcher: () => Promise<{ results: Movie[] }>;
};

function MovieCarousel({ title, fetcher }: MovieCarouselProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { isPending, error, data } = useQuery({
    queryKey: ["MovieCarousel", title],
    queryFn: fetcher,
  });
  const fetchedMovies: Movie[] = useMemo(() => data?.results || [], [data]);
  const VIEW_COUNT = 6;
  const countMovies = fetchedMovies.length;

  useEffect(() => {
    setMovies(fetchedMovies.slice(0, VIEW_COUNT));
  }, [fetchedMovies]);

  const handleNavigate = useCallback(
    (start: number) => {
      setMovies(fetchedMovies.slice(start, start + VIEW_COUNT));
    },
    [fetchedMovies, VIEW_COUNT]
  );

  // if (loading) return <div>Loading...</div>;
  // if (!data) return <div>Failed to load movies.</div>;

  const renderMovies = () => {
    if (isPending) {
      return Array(VIEW_COUNT)
        .fill(null)
        .map((_item, index) => <MovieCardSkeleton key={index} />);
    } else {
      return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
    }
  };

  if (error) return <div className={styles.error}>Failed to load movies.</div>;

  return (
    <div className={styles.carousel}>
      <div className={styles.header}>
        <CarouselHeader title={title} isActive={countMovies > 0} />
      </div>
      <div className={styles.movies}>{renderMovies()}</div>

      <div className={styles.navigation}>
        <CarouselNavigation
          itemsCount={countMovies}
          viewCount={VIEW_COUNT}
          handlerFn={handleNavigate}
        />
      </div>
    </div>
  );
}
export default MovieCarousel;
