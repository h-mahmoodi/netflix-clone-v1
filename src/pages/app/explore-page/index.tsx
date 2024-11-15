import MovieGrid from "@src/components/app/movie/grid";
import { fetchMovies } from "@src/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AppExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    name: "query",
    value: searchParams.get("query"),
  });
  const { data, isFetching, error } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => fetchMovies(`${query.name}=${query.value}`),
  });
  //   console.log(data);
  return (
    <div>
      <MovieGrid movies={data?.results || []} />
    </div>
  );
};
export default AppExplorePage;
