import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import NavSearchMovie from "./movie";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchedMovies } from "@src/fetchers";
import useDebounce from "@src/hooks/useDebounce";
import { Movie } from "@src/types/movie";
import useClickOutSide from "@src/hooks/useClickOutSide";

// "dead pool", "venom", "avatar"
const recentSearches = ["dead pool", "venom", "avatar"];

const NavSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const searchInputDebounce = useDebounce<string>(searchInput, 500);
  const isValidSearchInput = !!searchInput && searchInput.length > 2;

  const { data, isFetching, error } = useQuery({
    queryKey: ["navSearch", searchInputDebounce],
    queryFn: () => fetchSearchedMovies(searchInputDebounce),
    enabled: isValidSearchInput,
    staleTime: 5 * 60 * 1000,
  });

  const dropDownRef = useClickOutSide(handleCloseDropDown);

  const movies: Movie[] = data?.results || [];

  const hasRecentSearches = recentSearches.length > 0;
  const hasSearchedMovies = movies.length > 0;
  const isValidToOpenDropDown = hasRecentSearches || hasSearchedMovies;

  console.log("menuuuuuuuu", movies);

  function handleClearSearchInput() {
    setSearchInput("");
  }

  function handleCloseDropDown() {
    setIsDropDownOpen(false);
  }

  function handleInputFocus() {
    // if (isValidSearchInput) {
    //   setIsDropDownOpen(true);
    // }
    if (hasRecentSearches) {
      setIsDropDownOpen(true);
    }
  }

  useEffect(() => {
    // if (!isValidSearchInput) {
    //   return handleCloseDropDown();
    // }
    if (isValidToOpenDropDown) {
      return setIsDropDownOpen(true);
    }
    handleCloseDropDown();
  }, [isValidToOpenDropDown]);

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
    // if (!isValidSearchInput) {
    //   return null;
    // }

    if (error) {
      return (
        <div className={styles.searchError}>
          <i className="fi fi-rr-engine-warning"></i>
          <span>Error</span>
          <span>{error.message}</span>
        </div>
      );
    }

    // if (!isFetching && !hasSearchedMovies && isValidSearchInput) {
    //   return (
    //     <div className={styles.searchError}>
    //       <i className="fi fi-rr-engine-warning"></i>
    //       <span>Not Found</span>
    //     </div>
    //   );
    // }

    if (hasSearchedMovies) {
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
        <div className={styles.searchIcon}>{iconRender()}</div>
      </div>
      {isDropDownOpen && (
        <div className={styles.searchDropDown}>
          {hasRecentSearches && (
            <div className={styles.dropDownRecent}>
              <span className={styles.dropDownRecentHeader}>
                Recent Searched Keywords
              </span>
              <div className={styles.dropDownRecentContainer}>
                {recentSearches.map((recent, index) => (
                  <span key={index} onClick={() => setSearchInput(recent)}>
                    {recent}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* <div>Results</div> */}
          {hasSearchedMovies && (
            <div className={styles.dropDownMoviesContainer}>
              <span className={styles.dropDownMoviesHeader}>
                Searched Movies
              </span>

              {renderResult()}
              <div className={styles.moreButton}>
                Show All {data.total_results} Results
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default NavSearch;
