import { useCallback } from "react";
import styles from "./styles.module.css";

type HomeSliderNavigationProps = {
  totalItems: number;
  selectedIndex: number;
  handlerFn: (selectedIndex: number) => void;
};

enum Nav {
  NAV_NEXT = "next",
  NAV_PREV = "prev",
}

const HomeSliderNavigation = ({
  totalItems,
  selectedIndex,
  handlerFn,
}: HomeSliderNavigationProps) => {
  const handleNavigateClick = useCallback(
    (nav: Nav) => {
      if (nav === Nav.NAV_NEXT) {
        if (selectedIndex < totalItems - 1) {
          handlerFn(selectedIndex + 1);
        } else {
          handlerFn(0);
        }
      } else if (nav === Nav.NAV_PREV) {
        if (selectedIndex > 0) {
          handlerFn(selectedIndex - 1);
        } else {
          handlerFn(totalItems - 1);
        }
      }
    },
    [totalItems, selectedIndex, handlerFn]
  );
  return (
    <div className={styles.navigation}>
      <button
        className={styles.left}
        onClick={() => handleNavigateClick(Nav.NAV_PREV)}
      >
        <i className="fi fi-br-angle-left"></i>
      </button>
      <button
        className={styles.right}
        onClick={() => handleNavigateClick(Nav.NAV_NEXT)}
      >
        <i className="fi fi-br-angle-right"></i>
      </button>
    </div>
  );
};
export default HomeSliderNavigation;
