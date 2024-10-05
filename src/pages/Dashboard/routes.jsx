import { Route, Routes } from "react-router-dom";

import Index from "./index";
import Consult from "./Consult";

export const DashboardRoutes = () => {
  return (
    <>
      <h3>DASHBOARD LAYOUT</h3>
      <Routes>
        <Route path="a" element={<Index />} />
        <Route path="b" element={<Consult />} />
      </Routes>
    </>
  );
};