import { useAppSelector } from "@src/hooks/useAppSelector";
import ToastItem from "./item";
import styles from "./styles.module.css";
import { selectToast } from "@src/redux/toast-slice";

const Toast = () => {
  const toasts = useAppSelector(selectToast);

  return (
    <div className={styles.toast}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
export default Toast;
