import { Toast } from "@src/types/toast";
import styles from "./styles.module.css";
import { useCallback, useRef, useState } from "react";
import { useAppDispatch } from "@src/hooks/useAppDispatch";
import { removeToast } from "@src/redux/toast-slice";
import ToastItemTimeBar from "./timer";

type ToastItemProps = {
  toast: Toast;
};

const ToastItem = ({ toast }: ToastItemProps) => {
  const dispatch = useAppDispatch();
  const [isClosed, setIsClosed] = useState(false);
  const toastRef = useRef(null);
  const TIMER = 5000;

  const handleClose = useCallback(() => {
    setIsClosed(true);
    setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, 450);
  }, [toast.id, dispatch]);

  return (
    <div
      className={`${styles.toast} ${
        isClosed ? styles.toastClosing : undefined
      }`}
      ref={toastRef}
    >
      <ToastItemTimeBar
        interval={TIMER}
        handlerFn={handleClose}
        toastRef={toastRef}
      />
      <div className={styles.toastBody}>
        {/* <span className={styles.toastIcon}>
          <i className="fi fi-br-check"></i>
        </span> */}
        <span className={styles.message}>{toast.message}</span>
      </div>
      <div className={styles.toastAction}>
        <span>
          <i className="fi fi-br-cross" onClick={handleClose}></i>
        </span>
      </div>
    </div>
  );
};
export default ToastItem;
