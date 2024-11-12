import MovieCard from "@components/app/movie/card";
import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./styles.module.css";
import MovieCardSkeleton from "../card/skeleton";
import CarouselHeader from "./header";
import CarouselNavigation from "./navigation";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "@src/types/movie";

type MovieCarouselProps = {
  title: string;
  fetcher: () => Promise<{ results: Movie[] }>;
  flag?: string | number;
  link?: string;
  grid?: number;
};

function MovieCarousel({
  title,
  flag,
  link,
  grid = 5,
  fetcher,
}: MovieCarouselProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { isFetching, error, data } = useQuery({
    queryKey: ["MovieCarousel", title, flag],
    queryFn: fetcher,
    staleTime: 5 * 60 * 1000,
  });
  const fetchedMovies: Movie[] = useMemo(() => data?.results || [], [data]);
  const countMovies = fetchedMovies.length;

  useEffect(() => {
    setMovies(fetchedMovies.slice(0, grid));
  }, [fetchedMovies, grid]);

  const handleNavigate = useCallback(
    (start: number) => {
      setMovies(fetchedMovies.slice(start, start + grid));
    },
    [fetchedMovies, grid]
  );

  // if (loading) return <div>Loading...</div>;
  // if (!data) return <div>Failed to load movies.</div>;

  const renderMovies = () => {
    if (isFetching) {
      return Array(grid)
        .fill(null)
        .map((_item, index) => <MovieCardSkeleton key={index} />);
    }
    if (fetchedMovies.length === 0) {
      return <div>No item found</div>;
    } else {
      return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
    }
  };

  if (error) return <div className={styles.error}>Failed to load movies.</div>;

  return (
    <div className={styles.carousel}>
      <div className={styles.header}>
        <CarouselHeader title={title} link={link} />
      </div>
      <div
        className={styles.movies}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        }}
      >
        {renderMovies()}
      </div>

      <div className={styles.navigation}>
        <CarouselNavigation
          itemsCount={countMovies}
          viewCount={grid}
          handlerFn={handleNavigate}
        />
      </div>
    </div>
  );
}
export default MovieCarousel;
