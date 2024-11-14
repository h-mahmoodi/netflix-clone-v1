import Skeleton from "@src/components/ui/skeleton";
import styles from "./styles.module.css";

const MovieRecommendedPageSkeleton = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <Skeleton className="w-96 h-12" />
        <Skeleton className="w-96 h-14" />
        <div className={styles.headerMovieDetails}>
          <Skeleton className="w-40 h-8" />
          <Skeleton className="w-40 h-8" />
        </div>
      </div>
    </div>
  );
};
export default MovieRecommendedPageSkeleton;
