import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import NavSearchMovie from "./movie";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchedMovies } from "@src/fetchers";
import useDebounce from "@src/hooks/useDebounce";
import { Movie } from "@src/types/movie";
import useClickOutSide from "@src/hooks/useClickOutSide";

const NavSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const searchInputDebounce = useDebounce<string>(searchInput, 500);
  const isValidSearchInput = !!searchInput && searchInput.length > 2;
  const { data, isFetching, error } = useQuery({
    queryKey: ["navSearch", searchInputDebounce],
    queryFn: () => fetchSearchedMovies(searchInputDebounce),
    enabled: isValidSearchInput,
  });

  const dropDownRef = useClickOutSide(handleCloseDropDown);

  const movies: Movie[] = data?.results || [];

  console.log("movies", movies);

  function handleClearSearchInput() {
    setSearchInput("");
  }

  function handleCloseDropDown() {
    setIsDropDownOpen(false);
  }

  function handleInputFocus() {
    if (isValidSearchInput) {
      setIsDropDownOpen(true);
    }
  }

  useEffect(() => {
    if (!isValidSearchInput) {
      return handleCloseDropDown();
    }
    setIsDropDownOpen(true);
  }, [isValidSearchInput]);

  const iconRender = () => {
    if (searchInput) {
      if (isFetching) {
        return <i className="fi fi-br-spinner animate-spin"></i>;
      }
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

    if (error) {
      return (
        <div className={styles.searchError}>
          <i className="fi fi-rr-engine-warning"></i>
          <span>Error</span>
          <span>{error.message}</span>
        </div>
      );
    }

    if (!isFetching && movies.length === 0) {
      return (
        <div className={styles.searchError}>
          <i className="fi fi-rr-engine-warning"></i>
          <span>Not Found</span>
        </div>
      );
    }

    if (movies.length > 0) {
      return (
        <div className={styles.movie}>
          {movies.map((movie) => (
            <NavSearchMovie
              key={movie.id}
              movie={movie}
              onClose={() => setIsDropDownOpen(false)}
            />
          ))}
          {/* <div className={styles.moreButton}>
            Show All {data.total_results} Results
          </div> */}
        </div>
      );
    }
  };

  return (
    <div className={styles.search} ref={dropDownRef}>
      <div className={styles.searchInner}>
        <input
          type="text"
          placeholder="Search"
          className=""
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={handleInputFocus}
        />
        {iconRender()}
      </div>
      {!isFetching && isDropDownOpen && (
        <div className={styles.searchDropDown}>
          {renderResult()}
          {movies.length > 0 && (
            <div className={styles.moreButton}>
              Show All {data.total_results} Results
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default NavSearch;
