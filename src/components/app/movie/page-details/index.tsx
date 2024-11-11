import { TMDB_CONFIGS } from "@src/constants";
import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { fetchMovieDetails } from "@src/fetchers";
import { useQuery } from "@tanstack/react-query";

type MoviePageDetailsProps = {
  id: string | number;
};

const MoviePageDetails = ({ id }: MoviePageDetailsProps) => {
  const {
    data: movie,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["moviePageDetails", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
  });
  return (
    <div
      className={styles.movie}
      style={{
        backgroundImage: `url("${TMDB_CONFIGS.imageUrl}${movie?.backdrop_path}")`,
      }}
    >
      <div className={styles.movieSection}>
        <div className={styles.banner}>
          <img
            src={`${TMDB_CONFIGS.imageUrl}${movie?.poster_path}`}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{movie?.title || movie?.name}</h1>
          <p className={styles.description}>{movie?.overview}</p>
        </div>
      </div>
      <div className={styles.backdrop}></div>
    </div>
  );
};
export default MoviePageDetails;
