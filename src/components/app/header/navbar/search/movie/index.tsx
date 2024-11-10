import image from "@src/assets/movie.jpg";
import styles from "./styles.module.css";

const NavSearchMovie = () => {
  return (
    <div className={styles.movie}>
      <img src={image} alt="" />
      <div className={styles.movieDetails}>
        <div>
          <p className={styles.movieTitle}>Venom: The Last Dance</p>
          <p className={styles.movieDesc}>
            While struggling with his dual identity, Arthur Fleck not only
            stumbles upon
          </p>
        </div>
        <div className={styles.movieInfo}>
          <span>2013</span>
          <span>IMDb 5.5</span>
        </div>
      </div>
    </div>
  );
};
export default NavSearchMovie;
