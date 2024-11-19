import { useState } from "react";
import NavLink from "../nav-link";

import styles from "./styles.module.css";
import useClickOutSide from "@src/hooks/useClickOutSide";
import AppSideBarNavLink from "./nav-link";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { selectWatchList } from "@src/redux/watch-list-slice";
import { selectFavoriteList } from "@src/redux/favorite-list-slice";
import { selectRecentList } from "@src/redux/recent-list-slice";

const AppSidebarMenu = () => {
  const { movies: favoriteListMovies } = useAppSelector(selectFavoriteList);
  const { movies: watchListMovies } = useAppSelector(selectWatchList);
  const { movies: recentListMovies } = useAppSelector(selectRecentList);
  const [isOpen, setIsOpen] = useState(false);

  const drawerRef = useClickOutSide(() => setIsOpen(false));

  const handleToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={styles.sidebar} ref={drawerRef}>
      <NavLink icon="fi fi-rr-menu-burger" onClick={handleToggleIsOpen} />
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : styles.drawerClose}`}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerHeaderTitle}>NETFLIX</span>
          <NavLink icon="fi fi-rr-menu-burger" onClick={handleToggleIsOpen} />
        </div>
        <div>
          <div className={styles.drawerMenuContainer}>
            <AppSideBarNavLink title="Home Page" icon="fi-rr-home" to="/" />
            <AppSideBarNavLink title="Explore All Movies" icon="fi-rr-apps" to="/explore" />
            <AppSideBarNavLink title="Search For Movies" icon="fi-rr-search" to="/search" />
          </div>
          <div className={styles.drawerMenuContainer}>
            <AppSideBarNavLink title="Now Playing" icon="fi-rr-video-duration" to="/now-playing" />
            <AppSideBarNavLink title="Popular" icon="fi-rr-fire-flame-curved" to="/popular" />
            <AppSideBarNavLink title="Top Rated" icon="fi-rr-star-comment-alt" to="/top-rated" />
            <AppSideBarNavLink title="Upcoming" icon="fi-rr-time-forward" to="/upcoming" />
          </div>
          <div className={styles.drawerMenuContainer}>
            <AppSideBarNavLink
              title="Favorite Movies"
              icon="fi-rr-heart"
              to="/favorite-list"
              badge={favoriteListMovies.length > 0 ? favoriteListMovies.length : undefined}
            />
            <AppSideBarNavLink
              title="Watch List"
              icon="fi-rr-play-alt"
              to="/watch-list"
              badge={watchListMovies.length > 0 ? watchListMovies.length : undefined}
            />
            <AppSideBarNavLink
              title="Recent Views"
              icon="fi-rr-time-past"
              to="/recent-list"
              badge={recentListMovies.length > 0 ? recentListMovies.length : undefined}
            />
          </div>
          <div className={styles.drawerMenuContainer}>
            <AppSideBarNavLink title="Profile" icon="fi-rr-user" to="/profile" />
            <AppSideBarNavLink title="LogOut" icon="fi-rr-exit" to="/logout" />
          </div>
        </div>
        sidebar menu
      </div>
    </div>
  );
};
export default AppSidebarMenu;
