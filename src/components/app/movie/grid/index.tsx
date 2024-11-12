import MovieCard from "../card";
import MovieCardSkeleton from "../card/skeleton";

import styles from "./styles.module.css";
import { Movie } from "@src/types/movie";

type MovieGridProps = {
  movies: Movie[];
  loading: boolean;
};

function MovieGrid({ movies, loading }: MovieGridProps) {
  const renderMovies = () => {
    if (loading) {
      return Array(12)
        .fill(null)
        .map((_item, index) => <MovieCardSkeleton key={index} />);
    } else {
      return movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridLayout}>{renderMovies()}</div>
    </div>
  );
}
export default MovieGrid;
