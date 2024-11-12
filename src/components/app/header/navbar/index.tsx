// import Logo from "../logo";

import NavLink from "@src/components/app/header/navbar/nav-link";
import NavDropDown from "@src/components/app/header/navbar/drop-down";
import NavDropDownLink from "@src/components/app/header/navbar/drop-down/link";

import styles from "./styles.module.css";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { selectWatchList } from "@src/redux/watch-list-slice";
import { selectFavoriteList } from "@src/redux/favorite-list-slice";
import NavSearch from "./search";

// import Search from "../explore";

function AppNavbar() {
  const { movies: watchListMovies } = useAppSelector(selectWatchList);
  const { movies: favoriteListMovies } = useAppSelector(selectFavoriteList);
  return (
    <div className={styles.navbar}>
      <div className={styles.mainMenu}>
        <NavLink icon="fi fi-rr-apps" title="Explore" to="explore" />
      </div>
      <div className={styles.sideMenu}>
        <NavSearch />
        {/* <NavDropDown icon="fi fi-rr-search">jjjjj</NavDropDown> */}
        <NavLink
          icon="fi fi-rr-heart"
          to="explore"
          badge={
            favoriteListMovies.length > 0
              ? favoriteListMovies.length
              : undefined
          }
        />
        <NavLink
          icon="fi fi-rr-play-alt"
          to="explore"
          badge={
            watchListMovies.length > 0 ? watchListMovies.length : undefined
          }
        />

        <NavDropDown icon="fi fi-rr-user">
          <NavDropDownLink title="Favorites" icon="fi fi-rr-heart" count={5} />
          <NavDropDownLink
            title="Watch list"
            icon="fi fi-rr-clapperboard-play"
            count={5}
          />
          <NavDropDownLink title="Settings" icon="fi fi-rr-settings" />
          <NavDropDownLink title="Log out" icon="fi fi-rr-exit" />
        </NavDropDown>
      </div>
    </div>
  );
}
export default AppNavbar;
