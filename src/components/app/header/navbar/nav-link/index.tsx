import { ComponentProps } from "react";
import { Link, LinkProps } from "react-router-dom";
import styles from "./styles.module.css";
type ButtonType = {
  icon?: string;
  title?: string;
  badge?: string | number;
  to?: undefined;
  className?: string;
} & ComponentProps<"button">;

type LinkType = {
  icon?: string;
  title?: string;
  badge?: string | number;
  to: string;
  className?: string;
} & LinkProps;

type NavLinkProps = ButtonType | LinkType;

const NavLink = ({
  icon,
  title,
  badge,
  to,
  className = "",
  ...rest
}: NavLinkProps) => {
  const renderElement = () => {
    if (to) {
      return (
        <Link
          className={`${styles.navLink} ${className}`}
          {...(rest as LinkProps)}
          to={to}
          aria-label={title || to}
        >
          {icon && <i className={icon}></i>}
          {title && <p>{title}</p>}
        </Link>
      );
    }

    return (
      <button
        className={`${styles.navLink} ${className}`}
        {...(rest as ComponentProps<"button">)}
        aria-label={title || "button"}
      >
        {icon && <i className={icon}></i>}
        {title && <p>{title}</p>}
      </button>
    );
  };

  return (
    <div className={styles.container}>
      {renderElement()}
      {badge && (
        <div className={styles.badge}>
          <span>{badge}</span>
        </div>
      )}
    </div>
  );
};
export default NavLink;
