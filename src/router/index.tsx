import { Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/app-layout";
import AppHomePage from "@src/pages/app/home-page";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<AppHomePage />} />
        <Route path="movies/:id" element={<p>Movie page</p>} />
      </Route>
    </Routes>
  );
};
export default Router;
