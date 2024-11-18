import { fetchSearchedMovies } from "@src/fetchers";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AppPageHeading from "@src/components/app/page-heading";
import { type SortOption } from "@src/types/movie";
import MovieDisplayGrid from "@src/components/app/movie/display-grid";

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

const AppSearchPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    if (searchParams.get("query") !== null) {
      setQuery(searchParams.get("query") as string);
    } else {
      setQuery("");
    }
  }, [searchParams]);

  const headerTitle = query
    ? `Search Results for ${query}`
    : "Please search something";

  return (
    <div>
      <AppPageHeading title={headerTitle} />
      <MovieDisplayGrid
        query={query}
        fetcher={fetchSearchedMovies}
        sortOptions={sortOptions}
      />
    </div>
  );
};
export default AppSearchPage;
