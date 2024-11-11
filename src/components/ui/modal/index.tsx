import { useAppSelector } from "@src/hooks/useAppSelector";
import styles from "./styles.module.css";
import { closeModal, selectModal } from "@src/redux/modal-slice";
import { useAppDispatch } from "@src/hooks/useAppDispatch";
import { ReactNode } from "react";

const Modal = () => {
  const {
    isOpen,
    content,
    title = "Modal Title",
  } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;
  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={closeModalHandler}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
          <span className={styles.close} onClick={closeModalHandler}>
            <i className="fi fi-br-cross"></i>
          </span>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};
export default Modal;
