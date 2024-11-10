import { useState } from "react";
import styles from "./styles.module.css";
import NavSearchMovie from "./movie";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchedMovies } from "@src/fetchers";
import useDebounce from "@src/hooks/useDebounce";
import { Movie } from "@src/types/movie";

const NavSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputDebounce = useDebounce<string>(searchInput, 500);
  const isValidSearchInput = searchInput && searchInput.length > 2;
  const { data, isPending, error } = useQuery({
    queryKey: ["navSearch", searchInputDebounce],
    queryFn: async () => fetchSearchedMovies(searchInputDebounce),
  });

  const movies: Movie[] = data?.results || [];

  console.log("movies", movies);

  const handleClearSearchInput = () => {
    setSearchInput("");
  };

  const iconRender = () => {
    if (searchInput) {
      return (
        <i
          className="fi fi-rr-cross-small"
          onClick={handleClearSearchInput}
        ></i>
      );
    }
    return <i className="fi fi-rr-search"></i>;
  };

  const renderResult = () => {
    if (!isValidSearchInput) {
      return null;
    }
    if (isPending) {
      return (
        <div className={styles.searchLoading}>
          <i className="fi fi-br-spinner animate-spin"></i>
          <span>Searching...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.searchError}>
          <i className="fi fi-rr-engine-warning"></i>
          <span>Error</span>
          <span>{error.message}</span>
        </div>
      );
    }

    if (movies.length === 0) {
      return (
        <div className={styles.searchError}>
          <i className="fi fi-rr-engine-warning"></i>
          <span>Not Found</span>
        </div>
      );
    }

    if (movies.length > 3) {
      return (
        <div className={styles.movie}>
          {movies.map((movie, index) => (
            <NavSearchMovie key={movie.id} movie={movie} />
          ))}
          <div className={styles.moreButton}>Show other 124 movies</div>
        </div>
      );
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchInner}>
        <input
          type="text"
          placeholder="Search"
          className=""
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {iconRender()}
      </div>
      {isValidSearchInput && (
        <div className={styles.searchDropDown}>{renderResult()}</div>
      )}
    </div>
  );
};
export default NavSearch;
