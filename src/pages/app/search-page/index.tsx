import MovieGrid from "@src/components/app/movie/grid";
import { fetchMovies, fetchSearchedMovies } from "@src/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchPageHeader from "./components/header";

import styles from "./styles.module.css";
import AppPageHeading from "@src/components/app/page-heading";

const AppSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const { data, isFetching, error } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSearchedMovies(query),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setQuery(searchParams.get("query"));
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [searchParams]);
  //   console.log(data);
  return (
    <div>
      <AppPageHeading title={`Search Results for ${query}`} />
      <div className={styles.containerLayout}>
        <MovieGrid movies={data?.results || []} />
      </div>
      <MovieGrid movies={data?.results || []} />
    </div>
  );
};
export default AppSearchPage;
