import AppPageHeading from "@src/components/app/page-heading";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { selectFavoriteList } from "@src/redux/favorite-list-slice";

import styles from "./styles.module.css";
import MovieDisplayGrid from "@src/components/app/movie/display-grid";
import { SortOption } from "@src/types/movie";

const sortOptions: SortOption[] = [
  {
    display: "Name",
    field: "title",
  },
  {
    display: "IMDb Score",
    field: "vote_average",
  },
  {
    display: "Popularity",
    field: "vote_count",
  },
  {
    display: "Released Date",
    field: "release_date",
  },
];
const AppFavoritePage = () => {
  const { movies } = useAppSelector(selectFavoriteList);
  return (
    <div className={styles.page}>
      <AppPageHeading title="My Favorite Movies" />
      <div className="container mx-auto mt-10">
        <MovieDisplayGrid
          movies={movies}
          isFetching={false}
          error={null}
          sortOptions={sortOptions}
        />
      </div>
    </div>
  );
};
export default AppFavoritePage;
