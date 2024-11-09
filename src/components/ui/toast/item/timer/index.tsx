import { RefObject, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

type ToastItemTimeBarProps = {
  interval: number;
  toastRef: RefObject<HTMLDivElement>;
  handlerFn: () => void;
};

const ToastItemTimeBar = ({
  interval,
  toastRef,
  handlerFn,
}: ToastItemTimeBarProps) => {
  const [timer, setTimer] = useState(0);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsMouseEntered(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsMouseEntered(false);
  }, []);

  useEffect(() => {
    let slideInterval = null;
    if (!isMouseEntered) {
      slideInterval = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10);
    }

    return () => {
      clearInterval(slideInterval!);
    };
  }, [isMouseEntered]);

  useEffect(() => {
    if (timer > interval) {
      handlerFn();
    }
  }, [timer, handlerFn, interval]);

  useEffect(() => {
    const currentSliderRef: HTMLDivElement | null = toastRef.current;
    currentSliderRef!.addEventListener("mouseenter", handleMouseEnter);
    currentSliderRef!.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (currentSliderRef) {
        currentSliderRef.removeEventListener("mouseenter", handleMouseEnter);
        currentSliderRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave, toastRef]);
  return (
    <div className={styles.timeBar}>
      <div
        style={{ width: `${(timer / interval) * 100}%` }}
        className={styles.bar}
      ></div>
    </div>
  );
};
export default ToastItemTimeBar;
