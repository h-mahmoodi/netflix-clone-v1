import styles from "./styles.module.css";
import image from "@src/assets/netflix.jpg";

type AppPageHeadingProps = {
  title?: string;
};

const AppPageHeading = ({ title = "Page Heading" }: AppPageHeadingProps) => {
  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className={styles.headerOverlay}></div>
      <div className={styles.headerContainer}>
        <div className={styles.headerTitle}>{title}</div>
      </div>
    </div>
  );
};
export default AppPageHeading;
