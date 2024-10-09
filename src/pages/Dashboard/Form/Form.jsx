import React, { useState } from "react";

// import withStyles from '@material-ui/core/styles/withStyles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Paper from '@material-ui/core/Paper';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
import {
  Typography,
  Button,
  StepLabel,
  Step,
  Stepper,
  Paper,
  Toolbar,
  AppBar,
  CssBaseline,
  Box,
  Container,
} from "@mui/material";
import { toast } from "react-toastify";

import { useMutation } from "@tanstack/react-query";

// import { styled } from "@mui/material/styles";
import { useFormStore } from "../../../store/useFormStore";

import { createConsult } from "../../../api";

import InformationForm from "./InformationForm";
import ConsultQ from "./ConsultQ";
import Review from "./Review";

const steps = [" ", " ", " "];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <InformationForm />;
    case 1:
      return <ConsultQ />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const Checkout = ({}) => {
  const [activeStep, setActiveStep] = useState(0);
  const formData = useFormStore((state) => state.formData);
  const consultQuestionsFromStore = useFormStore(
    (state) => state.consultQuestions
  );

  const updateconsultResult = useFormStore(
    (state) => state.updateconsultResult
  );

  /**
   * Mutation For Create Consult to the API
   *
   * mutation fn => Send Consult DATA , ... to the API
   * POST v1/consult
   *
   *
   */
  const createNewConsultMutation = useMutation({
    mutationFn: createConsult,
    onSuccess: (data) => {
      console.log("API response:", data);
      if (data.data && data.status === 201) {
        toast.success("اطلاعات شما به درستی ثبت شد");
        setActiveStep(2);

        // store Consult DATA In Store
        updateconsultResult({
          consultId: data.data?.newConsult?._id,
          consultResult: data.data?.newConsult?.result,
        });

        // navigate to next step
        // setAuthSteps(1);
        // setUserId(data.data?.user?.id);
      } else {
        toast.error("خطایی رخ داده , لطفا دوباره امتحان کنید");
      }
    },
    onError: (error) => {
      console.error("API error:", error);
      if (error.response) {
        if (error.response.data) {
          if (error.response.data.code && error.response.data.message) {
            toast.error(error.response.data.message);
          }
        }
      }
      toast.error("خطایی رخ داده , لطفا دوباره امتحان کنید");
    },
  });

  const handleNext = () => {
    // Validation for First Stpe {step == 0}
    if (activeStep === 0) {
      if (!formData.firstName || !formData.lastName || !formData.age) {
        toast.error("لطفا اطلاعات رو کامل پر کنید");
        return false;
      } else if (formData.age < 12 || formData.age > 130) {
        toast.error(" مقدار سن صحیح نمیباشد");
        return false;
      }
    } else if (activeStep === 1) {
      // Trigger the mutation with the phone number
      createNewConsultMutation.mutate({
        first_name: formData.firstName,
        last_name: formData.lastName,
        age: formData.age,
        gender: formData.gender,
        mariage_type: formData.mariageType,
        parent_mariage_type: formData.parentMariageType,
        ListOfCheckBox: consultQuestionsFromStore,
      });
      console.log("kir", consultQuestionsFromStore);
      return false;
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="absolute" color="default">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Company name
        </Typography>
      </Toolbar>
    </AppBar> */}
      <Container maxWidth="sm">
        <Box>
          <h1>{formData.parentMariageType}</h1>
          <Paper elevation={12} sx={{ p: 4 }}>
            <Typography
              sx={{ py: 2 }}
              component="h1"
              variant="h5"
              align="center"
            >
              آیا شما به مشاوره نیاز دارید
            </Typography>
            <div dir="rtl">
              <Stepper sx={{ pb: 4 }} activeStep={activeStep}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div style={{ paddingTop: "50px" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack}>قبل</Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={createNewConsultMutation.isPending}
                    >
                      {activeStep === steps.length - 1
                        ? "Place order"
                        : createNewConsultMutation.isPending
                        ? "لطفا صبر کنید ..."
                        : " بعدی"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
};

// const HtmlTooltip = styled(Checkout)(({theme}) => ({
//   appBar: {
//     position: "relative",
//   },
//   layout: {
//     width: "auto",
//     marginLeft: theme.spacing.unit * 2,
//     marginRight: theme.spacing.unit * 2,
//     [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
//       width: 600,
//       marginLeft: "auto",
//       marginRight: "auto",
//     },
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 3,
//     marginBottom: theme.spacing.unit * 3,
//     padding: theme.spacing.unit * 2,
//     [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
//       marginTop: theme.spacing.unit * 6,
//       marginBottom: theme.spacing.unit * 6,
//       padding: theme.spacing.unit * 3,
//     },
//   },
//   stepper: {
//     padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
//   },
//   buttons: {
//     display: "flex",
//     justifyContent: "flex-end",
//   },
//   button: {
//     marginTop: theme.spacing.unit * 3,
//     marginLeft: theme.spacing.unit,
//   },
// }));

export default Checkout;
