import { Route, Routes } from "react-router-dom";

import Index from "./index";
import PaymentResult from "./PaymentResult";
import ImplementReference from "./ImplementReference";
import Form from "./Form/Form";

import { Box } from "@mui/material";

export const DashboardRoutes = () => {
  return (
    <Box sx={{ pt: 8 }}>
      {/* <h3>DASHBOARD LAYOUT</h3> */}
      <Routes>
        <Route path="home" element={<Index />} />
        <Route path="create-consult" element={<Form />} />
        <Route path="payment-result" element={<PaymentResult />} />
        <Route path="implement-reference" element={<ImplementReference />} />
      </Routes>
    </Box>
  );
};
