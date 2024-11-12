import styles from "./styles.module.css";

const AppNotFoundPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.icon}>
        <i className="fi fi-rr-sad-tear"></i>
      </div>
      <div className={styles.title}>404 Page Not Found</div>
    </div>
  );
};
export default AppNotFoundPage;
