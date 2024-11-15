import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type CarouselHeaderProps = {
  title?: string;
  link?: string;
};

function CarouselHeader({ title, link }: CarouselHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {link && (
        <Link
          className={styles.button}
          to={link}
          aria-label={`show more ${title}`}
        >
          Show More
        </Link>
      )}
    </div>
  );
}
export default CarouselHeader;
