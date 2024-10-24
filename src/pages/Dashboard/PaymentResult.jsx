import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Zoom,
  Fade,
  CssBaseline,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { keyframes } from "@mui/system";

// Define keyframes for the pulse animation
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const PaymentResult = ({
  status = "success",
  message,
  continueButtonHandler,
}) => {
  const isSuccess = status === "success";

  const defaultMessage = isSuccess
    ? "Your payment was processed successfully!"
    : "There was an error processing your payment.";

  return (
    <Container component="main" maxWidth="sm">
      <Zoom in={true} style={{ transitionDelay: "300ms" }}>
        <Paper
          elevation={24}
          sx={{
            mt: 8,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            background: isSuccess
              ? "linear-gradient(45deg, #E8F5E9 30%, #C8E6C9 90%)"
              : "linear-gradient(45deg, #FFEBEE 30%, #FFCDD2 90%)",
            boxShadow: isSuccess
              ? "0 3px 5px 2px rgba(0, 200, 83, .3)"
              : "0 3px 5px 2px rgba(255, 61, 0, .3)",
          }}
        >
          <Box
            sx={{
              animation: `${pulse} 2s infinite ease-in-out`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isSuccess ? (
              <CheckCircleOutlineIcon
                sx={{ fontSize: 100, color: "#00C853", mb: 2 }}
              />
            ) : (
              <ErrorOutlineIcon
                sx={{ fontSize: 100, color: "#FF3D00", mb: 2 }}
              />
            )}
          </Box>
          <Fade in={true} style={{ transitionDelay: "500ms" }}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color={isSuccess ? "#00C853" : "#FF3D00"}
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              {isSuccess ? "پرداخت با موفقیت انجام شد" : "پرداخت ناموفق"}
            </Typography>
          </Fade>
          <Fade in={true} style={{ transitionDelay: "700ms" }}>
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
              {message || defaultMessage}
            </Typography>
          </Fade>
          <Button
            variant="contained"
            onClick={continueButtonHandler}
            color={isSuccess ? "#00C853" : "white"}
            size="large"
            sx={{
              mt: 2,
              backgroundColor: isSuccess ? "#00C853" : "red",
              borderRadius: "25px",
              textTransform: "none",
              fontSize: "1.1rem",
              padding: "10px 60px",
              boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            {isSuccess ? "ادامه دهید" : "لطفا دوباره امتحان کنید"}
          </Button>
        </Paper>
      </Zoom>
    </Container>
  );
};

export default function Index() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const referenceId = new URLSearchParams(search).get("refid");
  const paymentStatus = new URLSearchParams(search).get("payment_status");

  useEffect(() => {
    if (paymentStatus === "false") {
      toast.error("پرداخت حساب با مشکل برخورد کرد");
    }
  }, [paymentStatus]);

  const continueButtonHandler = () => {
    if (!paymentStatus) {
      // redirect to previous section
      navigate("/dashboard/create-consult");
      return false;
    } else if (paymentStatus && referenceId) {
      navigate("/dashboard/implement-reference", { state: { referenceId } });
    }
  };

  return (
    <>
      <CssBaseline />
      <PaymentResult
        continueButtonHandler={continueButtonHandler}
        status={paymentStatus === "true" ? "success" : "error"}
        message={
          paymentStatus === "true"
            ? "ممنونم از این که این خرید را انجام دادید برای مشخص کردن روز مشاوره و اطلاعات دیگر ادامه دهید"
            : "متاسفانه پرداخت شما با مشکل مواجه شد , در صورتی که پول از حساب شما برداشت شده باشد بعد از حدود ۷۲ ساعت به حساب شما برگشت داده میشود"
        }
      />
    </>
  );
}
