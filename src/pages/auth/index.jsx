import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  ThemeProvider,
  createTheme,
  Snackbar,
  CssBaseline,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useMutation } from "@tanstack/react-query";

// Query
import { sendMobileNumber, sendOtpCode } from "../../api";

import Samim from "../../fonts/Samim.woff2";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Samim",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
            @font-face {
              font-family: 'Samim';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: url(${Samim}) format('woff2');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
    },
  },
});

export default function Index() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  // Navigate UI 
  // Step 0 => Mobile number Form
  // Step 1 => Otp Code Form
  const [authSteps, setAuthSteps] = useState(0);
  
  const [otpCode, setOtpCode] = useState("");
  const [userId, setUserId] = useState("");


 /**
  * Mutation and form submit handler for sending mobile number with other information to the API
  */
  const mutation = useMutation({
    mutationFn: sendMobileNumber,
    onSuccess: (data) => {
      console.log("API response:", data);
      if (data.data && data.status === 200) {
        setSnackbarMessage("شماره موبایل شما به درستی ثبت شد");
        setSnackbarOpen(true);

        // navigate to next step
        setAuthSteps(1);
        setUserId(data.data?.user?.id);
      } else {
         setSnackbarMessage("Error sending mobile number. Please try again.");
         setSnackbarOpen(true);
      }
    },
    onError: (error) => {
      console.error("API error:", error);
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.code && error.response.data.message) {
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
          }
        }
      }
      // setSnackbarMessage("Error sending mobile number. Please try again.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!phone || phone === " ") {
      setSnackbarMessage("لطفا موبایل خود را وارد کنید");
      setSnackbarOpen(true);
      return false;
    }

    if (!name || name === " ") {
      setSnackbarMessage("لطفا نام خود را وارد کنید");
      setSnackbarOpen(true);
      return false;
    }

    const bodyData = { mobile: phone, name: name };
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email && email.match(regex)) {
      bodyData.email = email;
    }
    // Trigger the mutation with the phone number
    mutation.mutate(bodyData);
  };


/**
 * Send Otp-Code to the API Handler and Mutation 
 */
    const handleOtpCodeSubmit = (e) => {
      e.preventDefault();

      if (!otpCode || otpCode === ' ') {
        setSnackbarMessage("لطفا کد ارسالی را وارد کنید");
        setSnackbarOpen(true);
        return false;
      }

      // Trigger the mutation with the phone number
      mutationForOtpCode.mutate({otpCode, userId});
  }

  const mutationForOtpCode = useMutation({
    mutationFn: sendOtpCode,
    onSuccess: (data) => {
      console.log("API response:", data);
      if (data.data && data.status === 200) {
        setSnackbarMessage("شماره موبایل شما به درستی ثبت شد");
        setSnackbarOpen(true);

        // navigate to next step
        setAuthSteps(1);
      } else {
         setSnackbarMessage("Error sending OTP Code. Please try again.");
         setSnackbarOpen(true);
      }
    },
    onError: (error) => {
      console.error("API error:", error);
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.code && error.response.data.message) {
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
          }
        }
      }
      // setSnackbarMessage("Error sending mobile number. Please try again.");
    },
  });

  // Custom styles for TextField
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 0.5)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={6}
          md={6}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1682045441000-80ff87892f9a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {authSteps === 0 ? (
              <React.Fragment>
                <Typography component="h1" variant="h5">
                  ابتدا وارد شوید
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1, width: "100%" }}
                >
                  <div dir="rtl">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="نام "
                      name="name"
                      autoComplete="name"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={textFieldSx}
                    />
                  </div>

                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={textFieldSx}
                  />
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <PhoneInput
                      country={"us"}
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                      inputStyle={{
                        width: "100%",
                        height: "56px",
                        fontSize: "1rem",
                        padding: "16.5px 14px",
                        borderRadius: "12px",
                        paddingLeft: "50px",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                    />
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "صبر کنید ..." : "ثبت"}
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography component="h1" variant="h5">
                  کد ارسال شده را وارد کنید
                </Typography>

                <Typography pt={2} component="h5" fontSize="14px" variant="h5">
                  کد به شماره موبایل زیر ارسال شده
                </Typography>
                <Typography
                  color="blue"
                  pt={1}
                  component="h5"
                  fontSize="14px"
                  variant="h5"
                >
                  {phone}
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleOtpCodeSubmit}
                  sx={{ mt: 1, width: "100%" }}
                >
                  <div>
                    <TextField
                      sx={{
                        input: { textAlign: "center", borderRadius: "22px" },
                      }}
                      margin="normal"
                      required
                      fullWidth
                      id="otp-code"
                      name="otp-code"
                      autoFocus
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={mutationForOtpCode.isPending}
                  >
                    {mutationForOtpCode.isPending ? "صبر کنید ..." : "ثبت"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
}
