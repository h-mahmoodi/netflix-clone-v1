import { useState } from "react";
import image from "@src/assets/movie.jpg";
import styles from "./styles.module.css";
import NavSearchMovie from "./movie";

const NavSearch = () => {
  const [searchInput, setSearchInput] = useState("");

  const iconElement = () => {
    if (searchInput) {
      return <i className="fi fi-rr-cross-small"></i>;
    }
    return <i className="fi fi-rr-search"></i>;
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
        {iconElement()}
      </div>
      <div className={styles.searchDropDown}>
        <div className={styles.searchLoading}>
          <i className="fi fi-br-spinner animate-spin"></i>
          <span>Searching...</span>
        </div>
        <div className={styles.searchError}>
          <i className="fi fi-rr-engine-warning"></i>
          <span>Not Found</span>
        </div>
        <div className={styles.movie}>
          <NavSearchMovie />
          <NavSearchMovie />
          <NavSearchMovie />
          <NavSearchMovie />
          <NavSearchMovie />
        </div>
        <div className={styles.moreButton}>Show other 124 movies</div>
      </div>
    </div>
  );
};
export default NavSearch;
