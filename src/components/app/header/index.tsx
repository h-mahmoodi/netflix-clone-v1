import { useEffect, useState } from "react";
import AppNavbar from "./navbar";
import styles from "./styles.module.css";
import AppLogo from "./logo";

const AppHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScrollY = () => {
    return window.scrollY > 120 ? setIsScrolled(true) : setIsScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  const cls = `${styles.header} ${isScrolled && styles.headerScrolled}`;
  return (
    <header className={cls}>
      <div className={styles.containerBox}>
        <AppLogo />
        <AppNavbar />
      </div>
    </header>
  );
};
export default AppHeader;
