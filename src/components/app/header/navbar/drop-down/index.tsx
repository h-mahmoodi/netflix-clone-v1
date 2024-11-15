import { ReactNode, useState } from "react";
import styles from "./styles.module.css";
import useClickOutSide from "@hooks/useClickOutSide";

type NavDropDownProps = {
  icon?: string;
  title?: string;
  className?: string;
  children: ReactNode;
};

function NavDropDown({ icon, title, className, children }: NavDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutSide(() => setIsOpen(false));

  return (
    <div className={`${styles.dropDown} ${className}`} ref={ref}>
      <button
        className={`${styles.button} ${isOpen ? styles.isActive : undefined}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="user profile"
      >
        {icon && <i className={icon}></i>}
        {title && <p>{title}</p>}
      </button>
      {isOpen && <div className={styles.box}>{children}</div>}
    </div>
  );
}
export default NavDropDown;
