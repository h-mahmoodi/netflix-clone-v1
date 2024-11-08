import { useAppSelector } from "@src/hooks/useAppSelector";
import styles from "./styles.module.css";
import { closeModal, selectModal } from "@src/redux/modal-slice";
import { useAppDispatch } from "@src/hooks/useAppDispatch";

const Modal = () => {
  const { isOpen, content } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;
  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={closeModalHandler}></div>
      <div className={styles.content}>{content} ffgdgdfgdfgdfgdfgdf</div>
    </div>
  );
};
export default Modal;
