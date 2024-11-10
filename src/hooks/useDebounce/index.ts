import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, time: number): T => {
  const [state, setState] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(value);
    }, time);
    return () => clearTimeout(timer);
  }, [value, time]);
  return state;
};
export default useDebounce;
