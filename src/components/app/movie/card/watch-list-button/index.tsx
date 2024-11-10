import { useAppDispatch } from "@src/hooks/useAppDispatch";
import { useAppSelector } from "@src/hooks/useAppSelector";
import {
  addToWatchList,
  removeFromWatchList,
  selectWatchList,
} from "@src/redux/watch-list-slice";
import { Movie } from "@src/types/movie";

import styles from "./styles.module.css";
import { MouseEvent } from "react";

type MovieCardWatchListButtonProps = {
  movie: Movie;
};

const MovieCardWatchListButton = ({ movie }: MovieCardWatchListButtonProps) => {
  const { movies, loading, error } = useAppSelector(selectWatchList);
  const dispatch = useAppDispatch();

  const isInWatchList = movies.find((item) => item.id === movie.id);
  const isLoading = loading.includes(movie.id);

  const renderElement = () => {
    if (error) {
      return <i className="fi fi-br-exclamation text-red-700"></i>;
    }
    if (isLoading) {
      return <i className="fi fi-rr-spinner animate-spin text-zinc-900"></i>;
    }
    if (isInWatchList) {
      return <i className="fi fi-sr-overview text-red-700"></i>;
    }
    if (!isInWatchList) {
      return <i className="fi fi-rr-overview text-zinc-900"></i>;
    }
  };

  const handleWatchList = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (isLoading) {
      return null;
    }
    if (isInWatchList) {
      return dispatch(removeFromWatchList(movie));
    }
    if (!isInWatchList) {
      return dispatch(addToWatchList(movie));
    }
  };
  return (
    <span className={styles.action} onClick={handleWatchList}>
      {renderElement()}
    </span>
  );
};
export default MovieCardWatchListButton;
