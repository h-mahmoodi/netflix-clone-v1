import { Outlet } from "react-router-dom";
import AppHeader from "@components/app/header";
import styles from "./styles.module.css";
import Modal from "@src/components/ui/modal";
import Toast from "@src/components/ui/toast";

const AppLayout = () => {
  return (
    <section className={styles.layout}>
      <AppHeader />
      <main className="bg-zinc-950">
        <Outlet />
      </main>
      <footer>footer</footer>
      <Modal />
      <Toast />
    </section>
  );
};
export default AppLayout;
