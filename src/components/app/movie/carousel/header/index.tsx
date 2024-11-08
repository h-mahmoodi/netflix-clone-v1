import styles from "./styles.module.css";

type CarouselHeaderProps = {
  title?: string;
  isActive?: boolean;
};

function CarouselHeader({ title, isActive }: CarouselHeaderProps) {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.button} disabled={!isActive}>
        Show More
      </button>
    </div>
  );
}
export default CarouselHeader;
