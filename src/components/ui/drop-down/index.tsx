import { ReactNode, useState } from "react";
import styles from "./styles.module.css";
import useClickOutSide from "@hooks/useClickOutSide";

type DropDownProps = {
  icon?: string;
  title?: string;
  className?: string;
  children: ReactNode;
};

function DropDown({ icon, title, className, children }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutSide(() => setIsOpen(false));

  return (
    <div className={`${styles.dropDown} ${className}`} ref={ref}>
      <button
        className={`${styles.button} ${isOpen ? styles.isActive : undefined}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {icon && <i className={icon}></i>}
        {title && <p>{title}</p>}
      </button>
      {isOpen && <div className={styles.box}>{children}</div>}
    </div>
  );
}
export default DropDown;
