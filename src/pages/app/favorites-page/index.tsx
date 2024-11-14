import MovieGrid from "@src/components/app/movie/grid";
import AppPageHeading from "@src/components/app/page-heading";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { selectFavoriteList } from "@src/redux/favorite-list-slice";

import styles from "./styles.module.css";

const AppFavoritePage = () => {
  const { movies } = useAppSelector(selectFavoriteList);
  return (
    <div className={styles.page}>
      <AppPageHeading title="My Favorite Movies" />
      <div className="container mx-auto mt-10">
        <MovieGrid movies={movies} />
      </div>
    </div>
  );
};
export default AppFavoritePage;
