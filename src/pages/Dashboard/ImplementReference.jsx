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
  CssBaseline,
} from "@mui/material";

export default function ImplementReference() {
  let location = useLocation();
  // const navigate = useNavigate();


  useEffect(() => {
    console.log(location.state);
    if (!location.state.referenceId) {
      toast.error("اشتباهی پیش آمده")
    }
  }, [location]);


  return (
    <>
      <CssBaseline />
      <h1>hamid {location.state.referenceId}</h1>
    </>
  );
}
