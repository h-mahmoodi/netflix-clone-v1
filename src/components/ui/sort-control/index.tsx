import { Movie, SortOption } from "@src/types/movie";
import { useCallback, useEffect, useState } from "react";
import { URLSearchParamsInit } from "react-router-dom";

type SortControlProps = {
  options: SortOption[];
  movies: Movie[];
  setter: (movies: Movie[]) => void;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParamsInit) => void;
};

const SortControl = ({
  options,
  movies,
  setter,
  searchParams,
  setSearchParams,
}: SortControlProps) => {
  const [activeSort, setActiveSort] = useState<{
    field: keyof Movie | null;
    direction: "asc" | "desc" | null;
  }>({
    field: searchParams.get("sortBy") as keyof Movie | null,
    direction: searchParams.get("sortDir") as "asc" | "desc" | null,
  });

  useEffect(() => {
    setActiveSort({
      field: searchParams.get("sortBy") as keyof Movie | null,
      direction: searchParams.get("sortDir") as "asc" | "desc" | null,
    });
  }, [searchParams]);

  const [prevMovieCount, setPrevMovieCount] = useState(movies.length);

  const sortMovies = useCallback(() => {
    const { field, direction } = activeSort;
    if (!field || !direction) {
      setter(movies);
      return;
    }

    const sortedMovies = [...movies].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    setter(sortedMovies);
  }, [activeSort, movies, setter]);

  const handleSortClick = (field: keyof Movie) => {
    setActiveSort((prev) => {
      const newDirection =
        prev.field === field && prev.direction === "desc"
          ? "asc"
          : prev.field === field && prev.direction === "asc"
          ? null
          : "desc";

      const newSortState = newDirection
        ? { field, direction: newDirection as "asc" | "desc" }
        : { field: null, direction: null };

      if (newSortState.field && newSortState.direction) {
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()), // Preserve existing query params
          sortBy: newSortState.field,
          sortDir: newSortState.direction,
        });
      } else {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("sortBy");
        newParams.delete("sortDir");
        setSearchParams(newParams);
      }

      return newSortState;
    });
  };

  useEffect(() => {
    if (movies.length !== prevMovieCount) {
      setPrevMovieCount(movies.length);
      sortMovies();
      //   setActiveSort({ field: null, direction: null });
    }
  }, [prevMovieCount, sortMovies]);

  useEffect(() => {
    sortMovies();
  }, [sortMovies]);

  console.log("sort");

  return (
    <div className="flex gap-3 items-center">
      {/* <span className="text-2xl">Sort By</span> */}
      <div className="flex items-center gap-3">
        {options.map((option, index) => (
          <button
            className="flex items-stretch
                    border border-zinc-800 bg-zinc-800
                     rounded-md overflow-hidden"
            onClick={() => handleSortClick(option.field)}
            key={index}
          >
            <span className="flex items-center px-3">
              {activeSort.field === option.field ? (
                activeSort.direction === "asc" ? (
                  <i className="flex fi fi-rr-sort-amount-up-alt"></i>
                ) : (
                  <i className="flex fi fi-rr-sort-amount-down-alt"></i>
                )
              ) : (
                <i className="flex fi fi-rr-sort-alt "></i>
              )}
            </span>

            <span
              className={`text-lg py-2 px-3
                 ${
                   activeSort.field === option.field
                     ? "bg-zinc-900"
                     : "bg-zinc-950 hover:bg-zinc-900"
                 } `}
            >
              {option.display}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default SortControl;
