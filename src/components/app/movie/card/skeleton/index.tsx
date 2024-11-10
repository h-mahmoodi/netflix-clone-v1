import styles from "./styles.module.css";

function MovieCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.title}></div>
      <div className={styles.details}>
        <div className={styles.rating}></div>
        <div className={styles.rating}></div>
      </div>
    </div>
  );
}
export default MovieCardSkeleton;
