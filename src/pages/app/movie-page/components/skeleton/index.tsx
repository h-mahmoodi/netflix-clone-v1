import styles from "./styles.module.css";

const MoviePageSkeleton = () => {
  return (
    <div className={styles.movie}>
      <div className={styles.movieSection}>
        <div className={styles.banner}></div>
        <div className={styles.details}>
          <div className={styles.title}></div>
          <div className={styles.infoSection}>
            <div className={styles.info}></div>
            <div className={styles.info}></div>
            <div className={styles.info}></div>
            <div className={styles.info}></div>
          </div>

          <div className={styles.description}></div>
          <div className={styles.genresSection}></div>
        </div>
      </div>
      <div className={styles.backdrop}></div>
    </div>
  );
};
export default MoviePageSkeleton;
