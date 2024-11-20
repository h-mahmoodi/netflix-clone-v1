import AppPageHeading from "@src/components/app/page-heading";
import { useAppSelector } from "@src/hooks/useAppSelector";
import styles from "./styles.module.css";
import { selectWatchList } from "@src/redux/watch-list-slice";
import MovieDisplayGrid from "@src/components/app/movie/display-grid";
import { SortOption } from "@src/types/movie";
import { useEffect } from "react";

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
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
