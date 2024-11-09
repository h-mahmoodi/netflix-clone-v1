// import Logo from "../logo";

import NavLink from "@components/ui/nav-link";
import DropDown from "@components/ui/drop-down";
import DropDownLink from "@components/ui/drop-down-link";

import styles from "./styles.module.css";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { selectWatchList } from "@src/redux/watch-list-slice";
import { selectFavoriteList } from "@src/redux/favorite-list-slice";

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
        <NavLink icon="fi fi-rr-search" to="explore" />
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
          icon="fi fi-rr-overview"
          to="explore"
          badge={
            watchListMovies.length > 0 ? watchListMovies.length : undefined
          }
        />
        <DropDown icon="fi fi-rr-user" title="My profile">
          <DropDownLink title="Favorites" icon="fi fi-rr-heart" count={5} />
          <DropDownLink
            title="Watch list"
            icon="fi fi-rr-clapperboard-play"
            count={5}
          />
          <DropDownLink title="Settings" icon="fi fi-rr-settings" />
          <DropDownLink title="Log out" icon="fi fi-rr-exit" />
        </DropDown>
      </div>
    </div>
  );
}
export default AppNavbar;
