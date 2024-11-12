import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type CarouselHeaderProps = {
  title?: string;
  link?: string;
};

function CarouselHeader({ title, link }: CarouselHeaderProps) {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      {link && (
        <Link className={styles.button} to={link}>
          Show More
        </Link>
      )}
    </div>
  );
}
export default CarouselHeader;
