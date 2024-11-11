import { TMDB_CONFIGS } from "@src/constants";
import { Movie } from "@src/types/movie";
import styles from "./styles.module.css";
import { fetchMovieDetails } from "@src/fetchers";
import { useQuery } from "@tanstack/react-query";
import MoviePageDetailsSkeleton from "./skeleton";
import { useAppDispatch } from "@src/hooks/useAppDispatch";
import { openModal } from "@src/redux/modal-slice";
import MovieTrailer from "../trailer";
import MovieCardFavoriteListButton from "../card/favorite-list-button";
import MovieCardWatchListButton from "../card/watch-list-button";

type MoviePageDetailsProps = {
  id: string | number;
};

const MoviePageDetails = ({ id }: MoviePageDetailsProps) => {
  const dispatch = useAppDispatch();
  const {
    data: movie,
    isFetching,
    error,
  } = useQuery<Movie>({
    queryKey: ["moviePageDetails", id],
    queryFn: () => fetchMovieDetails(id as string),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const handleShowModal = () => {
    dispatch(
      openModal({
        title: movie?.title || movie?.title || "The Trailer",
        content: <MovieTrailer movieId={id} />,
      })
    );
  };

  if (!movie || error) {
    return <div>Error</div>;
  }

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
            <div className={styles.actions}>
              <MovieCardFavoriteListButton movie={movie} />
              <MovieCardWatchListButton movie={movie} />
            </div>
            <span className={styles.bannerPlayButton} onClick={handleShowModal}>
              <i className="fi fi-rr-play-circle"></i>
              {/* <span>Watch Trailers</span> */}
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
          <div className={styles.tagline}>{movie?.tagline}</div>

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