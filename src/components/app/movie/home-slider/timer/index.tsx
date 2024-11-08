import { RefObject, useCallback, useEffect, useState } from "react";

import styles from "./styles.module.css";

type HomeSliderTimerProps = {
  interval: number;
  tick: number;
  handlerFn: (number: number) => void;
  sliderRef: RefObject<HTMLDivElement>;
  selectedIndex: number;
  totalItems: number;
};

const HomeSliderTimer = ({
  interval,
  tick,
  handlerFn,
  sliderRef,
  selectedIndex,
  totalItems,
}: HomeSliderTimerProps) => {
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
        setTimer((prev) => prev + tick);
      }, tick);
    }

    return () => {
      clearInterval(slideInterval!);
    };
  }, [isMouseEntered, tick]);

  useEffect(() => {
    if (timer > interval) {
      if (selectedIndex < totalItems - 1) {
        handlerFn(selectedIndex + 1);
      } else {
        handlerFn(0);
      }

      setTimer(0);
    }
  }, [timer, handlerFn, interval, selectedIndex, totalItems]);

  useEffect(() => {
    const currentSliderRef: HTMLDivElement | null = sliderRef.current;
    currentSliderRef!.addEventListener("mouseenter", handleMouseEnter);
    currentSliderRef!.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (currentSliderRef) {
        currentSliderRef.removeEventListener("mouseenter", handleMouseEnter);
        currentSliderRef.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave, sliderRef]);
  return (
    <div
      className={styles.timeBar}
      style={{
        width: `${(timer / interval) * 100}%`,
      }}
    ></div>
  );
};
export default HomeSliderTimer;
