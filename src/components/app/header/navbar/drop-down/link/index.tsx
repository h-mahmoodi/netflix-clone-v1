import { Link, LinkProps } from "react-router-dom";
import { ComponentProps } from "react";

import styles from "./styles.module.css";

type ButtonType = {
  icon?: string;
  title?: string;
  count?: number;
  className?: string;
  to?: undefined;
} & ComponentProps<"button">;

type LinkType = {
  icon?: string;
  title?: string;
  count?: number;
  className?: string;
  to: string;
} & LinkProps;

type NavDropDownLinkProps = ButtonType | LinkType;

function NavDropDownLink({
  icon,
  title,
  to,
  count,
  className,
  ...rest
}: NavDropDownLinkProps) {
  if (to) {
    return (
      <Link
        className={`${styles.link} ${className}`}
        {...(rest as LinkProps)}
        to={to}
      >
        {icon && <i className={`${icon} ${styles.icon}`}></i>}
        {title && <p>{title}</p>}
        {count && <p>{count}</p>}
      </Link>
    );
  }
  return (
    <button
      className={`${styles.link} ${className}`}
      {...(rest as ComponentProps<"button">)}
    >
      <div className={styles.flexBox}>
        {icon && <i className={`${icon} ${styles.icon}`}></i>}
        {title && <p className={styles.title}>{title}</p>}
      </div>
      {count && <p className={styles.count}>{count}</p>}
    </button>
  );
}
export default NavDropDownLink;
