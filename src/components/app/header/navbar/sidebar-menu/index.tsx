import { useState } from "react";
import NavLink from "../nav-link";

import styles from "./styles.module.css";
import useClickOutSide from "@src/hooks/useClickOutSide";

const AppSidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const drowerRef = useClickOutSide(() => setIsOpen(false));

  const handleToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={styles.sidebar} ref={drowerRef}>
      <NavLink icon="fi fi-rr-menu-burger" onClick={handleToggleIsOpen} />
      <div
        className={`${styles.drawer} ${
          isOpen ? styles.drawerOpen : styles.drawerClose
        }`}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerHeaderTitle}>NETFLIX</span>
          <NavLink icon="fi fi-rr-cross" onClick={handleToggleIsOpen} />
        </div>
        <div>
          <div className={styles.drawerMenuContainer}>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-home"></i>
              <span>Home Page</span>
            </div>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-apps"></i>
              <span>Explore All Movies</span>
            </div>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-search"></i>
              <span>Search For Movies</span>
            </div>
          </div>
          <div className={styles.drawerMenuContainer}>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-video-duration"></i>
              <span>Now Playing</span>
            </div>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-fire-flame-curved"></i>
              <span>Popular</span>
            </div>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-star-comment-alt"></i>
              <span>Top Rated</span>
            </div>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-time-forward"></i>
              <span>Upcoming</span>
            </div>
          </div>
          <div className={styles.drawerMenuContainer}>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-heart"></i>
              <span>Favorite Movies</span>
            </div>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-play-alt"></i>
              <span>Watch List</span>
            </div>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-time-past"></i>
              <span>Recent Views</span>
            </div>
          </div>
          <div className={styles.drawerMenuContainer}>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-user"></i>
              <span>Profile</span>
            </div>
            <div className={styles.drawerMenuItem}>
              <i className="flex fi fi-rr-exit"></i>
              <span>LogOut</span>
            </div>
          </div>
        </div>
        sidebar menu
      </div>
    </div>
  );
};
export default AppSidebarMenu;
