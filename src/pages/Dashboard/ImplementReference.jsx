import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import momentJalaali from "moment-jalaali";
import { Calendar } from "react-datepicker2";
import { toast } from "react-toastify";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// API
import {
  getReferenceById,
  getAllAvailableTimeSlots,
  implementSessionAndUpdateReference,
} from "../../api";

// utils
import createTimeSlot from "../../utils/createTimeSlot";

import {
  Box,
  Typography,
  MenuItem,
  Paper,
  Card,
  Container,
  CircularProgress,
  Button,
  Divider,
  InputLabel,
  CssBaseline,
  Select,
  Grid2,
  useMediaQuery,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";

// Get time slot
const slots = createTimeSlot(60, 15);

// get Reference types
const referenceTypeEnum = ["HOZORI", "ONLINE", "BY_TELEPHONE"];
const consultReasonFromUser = ["EZDEVAJ", "PISH_AZ_BARDARI"];

export default function ImplementReference() {
  let location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.only("xs"));
  // const navigate = useNavigate();

  // Access the client
  const queryClient = useQueryClient();

  // States
  const [calendarValue, setcalendarValue] = useState(momentJalaali());
  const [selectedDateState, setSelectedDateState] = useState(
    momentJalaali().locale("fa").format("jYYYY/jM/jD")
  );
  const [timeSlotItem, settimeSlotItem] = useState(null);
  const [formData, setformData] = useState({
    ref_type: referenceTypeEnum[0],
    consult_reason: consultReasonFromUser[0],
  });

  // Get reference From API by Id
  const { data, isSuccess } = useQuery({
    queryKey: ["reference", location.state.referenceId],
    queryFn: () =>
      getReferenceById({ referenceId: location.state.referenceId }),
  });

  // Update Reference
  const implementSessionMutaion = useMutation({
    mutationFn: implementSessionAndUpdateReference,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reference"] });
      toast.success("ساعت و روز مصاحبه به همراه دیگر اطلاعات به درستی ثبت شد");
      navigate("/dashboard/reference-result", {state: {referenceData: JSON.stringify(data.data)}})
    },
    onError: (error) => {
      console.log(error)
      toast.error("متاسفانه در ثبت اطلاعات مشکلی پیش آمده,  دوباره امتحان کنید");
    }
  });

  // Get Time Slot From API
  const {
    data: timeSlotData,
    isSuccess: timeSlotIsSuccess,
    isLoading: timeSlotIsLoading,
    isError: timeSlotIsError,
  } = useQuery({
    queryKey: ["time-slot", selectedDateState],
    queryFn: () =>
      getAllAvailableTimeSlots({ currentTimeSlot: selectedDateState }),
  });

  useEffect(() => {
    console.log(location.state);
    if (!location.state.referenceId) {
      toast.error("اشتباهی پیش آمده");
    }
  }, [location]);

  useEffect(() => {
    if (data && isSuccess) {
      console.log({ data });
      console.log({ timeSlotData });
    }
  }, [isSuccess, data, timeSlotData]);

  // get time Slot
  useEffect(() => {
    if (timeSlotData && timeSlotIsSuccess) {
      const slots = timeSlotData?.data?.result.map((i) => {
        return { ...i, isSelected: false };
      });

      settimeSlotItem(slots);
    }
  }, [timeSlotIsSuccess, timeSlotData]);

  const calendarHandler = (selectedDate) => {
    setcalendarValue(selectedDate);

    setSelectedDateState(selectedDate.locale("fa").format("jYYYY/jM/jD"));
    console.log(selectedDateState);
  };

  // Handle card click to toggle selection
  const handleSelectSlot = (index, slot) => {
    if (slot.isBooked) {
      alert("this time is booked by user, you can not change that");
      return false;
    }
    const updatedSlots = timeSlotItem.map(
      (slot, i) => {
        return { ...slot, isSelected: i === index ? !slot.isSelected : false };
      }
      // i === index ? { ...slot, isSelected: !slot.isSelected } : slot
    );
    settimeSlotItem(updatedSlots);
    // console.log(timeSlot);
  };

  // Form Submit Function handler
  const formSubmitHandler = () => {
    // which TimeSlot Selected
    const selectedTimeSlotId = timeSlotItem.filter(
      (item) => item.isSelected === true
    );
    console.log(selectedTimeSlotId);

    // check if any time-slot selected or not
    if (!selectedTimeSlotId[0]) {
      toast.error("لطفا یک بازه زمانی رو برای ساعت مصاحبه انتخاب کنید");
      return false;
    }

    implementSessionMutaion.mutate({
      consult_reason: formData.consult_reason,
      ref_type: formData.ref_type,
      time_slot_id: selectedTimeSlotId[0]?._id,
      reference_id: location.state.referenceId,
    });
  };

  const enabledRange = {
    min: momentJalaali().startOf("day"),
  };

  return (
    <>
      <CssBaseline />
      <Container disableGutters={matchesXs}>
        <Paper elevation={12} sx={{ py: 8, mb: { xs: 0, md: 8 } }}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <Typography
                sx={{ py: 2 }}
                component="h1"
                variant="h5"
                align="center"
              >
                زمان مشاوره رو انتخاب کنید
              </Typography>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Calendar
                value={calendarValue}
                isGregorian={false}
                min={enabledRange.min}
                onChange={(value) => calendarHandler(value)}
              />
            </Grid2>

            <Grid2
              sx={{ paddingTop: { xs: "40px", md: 0 } }}
              size={{ xs: 12, md: 6 }}
            >
              <div
                id="timeslot_box"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                  maxHeight: "385px",
                  // minHeight: "385px",
                  overflowY: "auto",
                  paddingBottom: "50px",
                  paddingTop: "25px",
                  marginRight: matchesXs ? "0px" : "30px",
                  backgroundColor: "rgb(40 28 103 / 13%)",
                  borderRadius: "15px",
                }}
              >
                {timeSlotIsError ? (
                  <div>An error occurred: SERVER BROKEN</div>
                ) : null}
                <>
                  {timeSlotIsLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        p: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <CircularProgress size="3rem" />
                    </Box>
                  ) : (
                    <>
                      {timeSlotItem &&
                        timeSlotItem.map((slot, index) => (
                          <Card
                            key={index}
                            onClick={() => handleSelectSlot(index, slot)}
                            style={{
                              width: "300px",
                              padding: "16px",
                              opacity: slot.isBooked ? 0.4 : 1,
                              borderRadius: "50px",
                              color: slot.isSelected ? "#fff" : "black",
                              cursor: slot.isBooked ? "not-allowed" : "pointer",
                              backgroundColor: slot.isSelected
                                ? "rgb(33 48 127)"
                                : "rgb(245 245 245)",
                            }}
                          >
                            {/* {slot.isBooked && (
                              <Typography>This Slot Booked By User</Typography>
                            )} */}
                            <Typography variant="body1">{`شروع: ${slot.startTime} - پایان: ${slot.endTime}`}</Typography>
                          </Card>
                        ))}
                    </>
                  )}
                </>
              </div>
            </Grid2>

            <Grid2
              sx={{ paddingTop: "30px", px: { xs: "10px", md: "60px" } }}
              size={12}
            >
              <Divider variant="middle" />
              <Typography
                sx={{ py: 6 }}
                component="h1"
                variant="h5"
                align="center"
              >
                نوع مشاوره رو انتخاب کنید
              </Typography>
            </Grid2>
            {/* FORM Container */}
            <Grid2
              container
              spacing={6}
              sx={{ px: 6, pb: 6, justifyContent: "center", width: "1000%" }}
            >
              <Grid2 item xs={{ xs: 12, sm: 6 }}>
                <div dir="rtl">
                  <InputLabel sx={{ textAlign: "right", pb: 1 }} id="ref_type">
                    نوع مشاوره
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 230 }}
                    value={formData.ref_type}
                    name="ref_type"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="HOZORI">حضوری</MenuItem>
                    <MenuItem value="BY_TELEPHONE">تلفن</MenuItem>
                    <MenuItem value="ONLINE">آنلاین ( تماس تصویری )</MenuItem>
                  </Select>
                </div>
              </Grid2>

              <Grid2 item xs={{ xs: 12, sm: 6 }}>
                <div dir="rtl">
                  <InputLabel
                    sx={{ textAlign: "right", pb: 1 }}
                    id="consult_reason"
                  >
                    دلیل مشاوره
                  </InputLabel>
                  <Select
                    sx={{ minWidth: 230 }}
                    value={formData.consult_reason}
                    name="consult_reason"
                    onChange={(e) =>
                      setformData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="PISH_AZ_BARDARI">پیش از بارداری</MenuItem>
                    <MenuItem value="EZDEVAJ">پیش از ازدواج</MenuItem>
                  </Select>
                </div>
              </Grid2>
            </Grid2>

            <Grid2 sx={{ paddingTop: "30px", textAlign: "center" }} size={12}>
              <Divider variant="middle" />
              <Typography
                sx={{ py: 6, px: { xs: 4, sm: 8, md: 15 } }}
                fontSize={16}
                align="center"
              >
                در صورت ثبت موفقیت آمیز, برای شما یک پیامک شامل اطلاعات جلسه
                مشاوره شما برای شما ارسال خواهد شد و در زمان مشخص شده برای جلسه
                مشاوره با شماره موبایل شما که در سیستم ثبت کرده اید تماس گرفته
                خواهد شد
              </Typography>
              <Button
                sx={{ px: 8, py: 1 }}
                onClick={formSubmitHandler}
                variant="contained"
                disabled={implementSessionMutaion.isPending}
                endIcon={<SendIcon />}
              >
                {implementSessionMutaion.isPending ? "صبر کنید ..." : "ثبت کنید"}
              </Button>
            </Grid2>
          </Grid2>
        </Paper>
      </Container>
    </>
  );
}
