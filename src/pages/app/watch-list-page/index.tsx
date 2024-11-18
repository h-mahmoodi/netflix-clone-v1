import AppPageHeading from "@src/components/app/page-heading";
import { useAppSelector } from "@src/hooks/useAppSelector";
import styles from "./styles.module.css";
import { selectWatchList } from "@src/redux/watch-list-slice";
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
const AppWatchListPage = () => {
  const { movies } = useAppSelector(selectWatchList);
  return (
    <div className={styles.page}>
      <AppPageHeading title="My Watch List Movies" />
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
export default AppWatchListPage;
