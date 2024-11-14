import styles from "./styles.module.css";

import image from "@src/assets/netflix.jpg";

function MovieSliderSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className={styles.overlay}></div>
      <div className={styles.containerBox}>
        <div className={styles.content}>
          <div className={styles.image}></div>
          <div className={styles.details}>
            {/* <div className={styles.statistics}></div> */}
            <div className={styles.titleContainer}>
              <div className={styles.title}></div>
              <div className={styles.description}></div>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.button}></div>
              <div className={styles.button}></div>
              <div className={styles.button}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieSliderSkeleton;
