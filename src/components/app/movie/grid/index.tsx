import MovieCard from "../card";

import styles from "./styles.module.css";
import { Movie } from "@src/types/movie";

type MovieGridProps = {
  movies?: Movie[];
};

const MovieGrid = ({ movies }: MovieGridProps) => {
  // const renderMovies = () => {
  //   if (loading) {
  //     return Array(10)
  //       .fill(null)
  //       .map((_item, index) => <MovieCardSkeleton key={index} />);
  //   } else {
  //     return (
  //       <>
  //         {movies.map((movie) => (
  //           <MovieCard key={movie.id} movie={movie} />
  //         ))}
  //         <div ref={ref}>load more ref</div>
  //       </>
  //     );
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.gridLayout}>
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
export default MovieGrid;
