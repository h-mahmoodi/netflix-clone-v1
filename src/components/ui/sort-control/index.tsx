import { Movie, SortOption } from "@src/types/movie";
import { useCallback, useEffect, useState } from "react";

type SortControlProps = {
  options: SortOption[];
  movies: Movie[];
  setter: (movies: Movie[]) => void;
};

const SortControl = ({ options, movies, setter }: SortControlProps) => {
  const [activeSort, setActiveSort] = useState<{
    field: keyof Movie | null;
    direction: "asc" | "desc" | null;
  }>({ field: null, direction: null });

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
      if (prev.field === field) {
        if (prev.direction === "desc") return { field, direction: "asc" };
        if (prev.direction === "asc") return { field: null, direction: null };
      }
      return { field, direction: "desc" };
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
      {/* <span className="text-xl">Sort By</span> */}
      <div className="flex items-center gap-3">
        {options.map((option, index) => (
          <button
            className="flex items-stretch
                    border border-zinc-800 bg-zinc-900
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
                <i className="flex fi fi-rr-apps-sort "></i>
              )}
            </span>

            <span
              className={`text-lg py-2 px-3
                 ${
                   activeSort.field === option.field
                     ? "bg-red-800"
                     : "bg-zinc-950"
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
