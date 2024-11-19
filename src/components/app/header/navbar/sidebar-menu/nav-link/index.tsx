import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type AppSideBarNavLinkProps = {
  title: string;
  icon: string;
  badge?: number;
  to: string;
};

const AppSideBarNavLink = ({ title, icon, badge, to }: AppSideBarNavLinkProps) => {
  return (
    <Link className={styles.menu} to={to}>
      <div>
        {icon && <i className={`flex fi ${icon}`}></i>}
        <span>{title}</span>
      </div>
      {badge && (
        <span
          className=" bg-red-700 rounded-full
              size-5 flex items-center justify-center text-sm leading-none pb-0.5"
        >
          {badge}
        </span>
      )}
    </Link>
  );
};
export default AppSideBarNavLink;
