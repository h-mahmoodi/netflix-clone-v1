import { useState } from "react";
import NavLink from "../nav-link";

import styles from "./styles.module.css";
import useClickOutSide from "@src/hooks/useClickOutSide";
import AppSideBarNavLink from "./nav-link";

const AppSidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const drowerRef = useClickOutSide(() => setIsOpen(false));

  const handleToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={styles.sidebar} ref={drowerRef}>
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
            <AppSideBarNavLink title="Favorite Movies" icon="fi-rr-heart" to="/favorite-list" badge={5} />
            <AppSideBarNavLink title="Watch List" icon="fi-rr-play-alt" to="/watch-list" badge={5} />
            <AppSideBarNavLink title="Recent Views" icon="fi-rr-time-past" to="/recent-list" badge={5} />
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
