import { Outlet } from "react-router-dom";
import AppHeader from "@components/app/header";
import Modal from "@src/components/ui/modal";
import Toast from "@src/components/ui/toast";

import styles from "./styles.module.css";

const AppLayout = () => {
  return (
    <section className={styles.layout}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer>footer</footer>
      <Modal />
      <Toast />
    </section>
  );
};
export default AppLayout;
