import React, {useState} from "react";

import { useLocation, useNavigate } from "react-router-dom";

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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ReferenceResultPage() {

    let location = useLocation();
    const referenceInformation = location.state.referenceData;
    const [reference, setreference] = useState(JSON.parse(referenceInformation))

    console.log(reference);
  return (
    <>
      <CssBaseline />
      <Container >
        <Paper elevation={12} sx={{ py: 8, mb: { xs: 0, md: 8 } }}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <CheckCircleIcon color="primary" sx={{fontSize: "100px", textAlign: "center", width: "100%"}} />
              <Typography
                sx={{ py: 2 }}
                fontSize={{xs: "20px", sm: "26px", md: "38px"}}
                align="center"
              >
               مشاوره شما به درستی ثبت شد
              </Typography>

              <Typography
                sx={{ py: 2, px: {xs: 4, sm: 6, md: 12} }}
                fontSize={16}
                align="center"
              >
                به شماره ثبت شده در سیستم یک پیامک حاوی کد رهگیری و ساعت و زمان مشاوره ارسال خواهد شد 
                در صورت عدم ارسال پیامک نگران نباشید , رزرو شما به درستی در این مرحله انجام شده و همکاران ما با شما تماس خواهند گرفت 
                فقط لطفا کد رهگیری زیر را به خاطر داشته باشید 
              </Typography>
            </Grid2>


            <Grid2 offset={3} size={6}>
                <Box sx={{backgroundColor: "#d5d5d5", px: 3,py: 2, borderRadius: "20px", maxWidth: 400}}>
                  <Typography align="center">کد رهگیری</Typography>
                  <Typography sx={{pt: 1}} fontWeight={800} align="center">{reference.follow_up_code}</Typography>
                </Box>
            </Grid2>


            <Grid2 size={12}>
              <Typography sx={{pb:2, pt:3}} align="center">
                  تاریخ مصاحبه  {reference?.time_slot?.date} 
              </Typography>

              <Typography align="center">
                زمان مصاحبه {reference?.time_slot?.startTime}
              </Typography>
            </Grid2>
          </Grid2>
        </Paper>
      </Container>
    </>
  );
}
