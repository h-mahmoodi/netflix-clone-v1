import logo from "@src/assets/headerlogo.png";

import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function AppLogo() {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="Netflix Clone App"
        className={styles.logo}
        width="192px"
        height="60px"
      />
    </Link>
  );
}
export default AppLogo;
