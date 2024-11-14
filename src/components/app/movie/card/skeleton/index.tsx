import styles from "./styles.module.css";

function MovieCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
    </div>
  );
}
export default MovieCardSkeleton;
