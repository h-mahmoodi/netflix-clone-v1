import styles from "./styles.module.css";

type HomeSliderBulletsProps = {
  totalItems: number;
  selectedIndex: number;
  handlerFn: (number: number) => void;
};

const HomeSliderBullets = ({
  totalItems,
  selectedIndex,
  handlerFn,
}: HomeSliderBulletsProps) => {
  const arr = new Array(totalItems).fill(null);
  return (
    <div className={styles.bullets}>
      {arr.map((_item, index) => (
        <span
          key={index}
          className={selectedIndex === index ? styles.active : undefined}
          onClick={() => handlerFn(index)}
        ></span>
      ))}
    </div>
  );
};
export default HomeSliderBullets;
