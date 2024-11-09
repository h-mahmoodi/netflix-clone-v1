import { useAppDispatch } from "@src/hooks/useAppDispatch";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { Movie } from "@src/types/movie";

import styles from "./styles.module.css";
import {
  addToFavoriteList,
  removeFromFavoriteList,
  selectFavoriteList,
} from "@src/redux/favorite-list-slice";

type MovieCardFavoriteListProps = {
  movie: Movie;
};

const MovieCardFavoriteListButton = ({ movie }: MovieCardFavoriteListProps) => {
  const { movies, loading, error } = useAppSelector(selectFavoriteList);
  const dispatch = useAppDispatch();

  const isInFavoriteList = movies.find((item) => item.id === movie.id);
  const isLoading = loading.includes(movie.id);

  const renderElement = () => {
    if (error) {
      return <i className="fi fi-br-exclamation text-red-700"></i>;
    }
    if (isLoading) {
      return <i className="fi fi-rr-spinner animate-spin"></i>;
    }
    if (isInFavoriteList) {
      return <i className="fi fi-sr-heart text-red-700"></i>;
    }
    if (!isInFavoriteList) {
      return <i className="fi fi-rr-heart text-zinc-900"></i>;
    }
  };

  const handleWatchList = () => {
    if (isInFavoriteList) {
      return dispatch(removeFromFavoriteList(movie.id));
    }
    if (!isInFavoriteList) {
      return dispatch(addToFavoriteList(movie));
    }
  };
  return (
    <span className={styles.action} onClick={handleWatchList}>
      {renderElement()}
    </span>
  );
};
export default MovieCardFavoriteListButton;
