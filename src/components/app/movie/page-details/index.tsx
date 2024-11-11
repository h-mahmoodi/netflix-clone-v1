import { TMDB_CONFIGS } from "@src/constants";
import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { fetchMovieDetails } from "@src/fetchers";
import { useQuery } from "@tanstack/react-query";
import MoviePageDetailsSkeleton from "./skeleton";

type MoviePageDetailsProps = {
  id: string | number;
};

const MoviePageDetails = ({ id }: MoviePageDetailsProps) => {
  const {
    data: movie,
    isFetching,
    error,
  } = useQuery<Movie>({
    queryKey: ["moviePageDetails", id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id,
  });

  if (isFetching) {
    return <MoviePageDetailsSkeleton />;
  }
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
          <div className={styles.bannerOverlay}>
            <span className={styles.bannerPlayButton}>
              <i className="fi fi-rr-play-circle"></i>
              <span>Watch Trailers</span>
            </span>
          </div>
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{movie?.title || movie?.name}</h1>
          <div className={styles.infoSection}>
            <div className={styles.info}>
              <span>{movie?.status}</span>
            </div>
            <div className={styles.info}>
              <span>IMDb {movie?.vote_average?.toFixed(1)}</span>
            </div>
            <div className={styles.info}>
              <span>
                {new Date(movie?.release_date as string).getFullYear()}
              </span>
            </div>
            <div className={styles.info}>
              <span>
                {movie?.spoken_languages?.map(
                  (lang) => `${lang.english_name} `
                )}
              </span>
            </div>
          </div>

          <p className={styles.description}>{movie?.overview}</p>
          <div className={styles.genresSection}>
            <span className={styles.genresTitle}>Genres :</span>
            <div className={styles.genres}>
              {movie?.genres?.map((genre) => (
                <span className={styles.genre} key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.backdrop}></div>
    </div>
  );
};
export default MoviePageDetails;
