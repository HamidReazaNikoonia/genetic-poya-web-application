import React, { useState } from "react";
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

import {
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  Box,
  InputLabel,
  Grid2 as Grid,
} from "@mui/material";


import {useFormStore} from "../../../store/useFormStore";

function InformationForm() {
  // States
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [gender, setgender] = useState("W");
  // const [mariageType, setMariageType] = useState("NON_FAMILY");
  // const [parentMariageType, setParentMariageType] = useState("NON_FAMILY");


  // const firstName = useFormStore((state) => state.firstName)
  // const updateFirstName = useFormStore((state) => state.updateFirstName)

  const formData = useFormStore((state) => state.formData)
  const updateformData = useFormStore((state) => state.updateformData)



  return (
    <React.Fragment>
      <Typography align="center" variant="h6" gutterBottom>
        اطلاعات عمومی
      </Typography>
      <Grid container spacing={2} rowSpacing={4}>
        <Grid item xs={12} sm={6}>
          <div dir="rtl">
            <TextField
              required
              id="firstName"
              name="firstName"
              label="نام"
              fullWidth
              value={formData.firstName}
              onChange={e => updateformData({value: e.target.value, name: e.target.name})}
              autoComplete="fname"
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div dir="rtl">
            <TextField
              required
              id="lastName"
              name="lastName"
              label="نام خانوادگی"
              fullWidth
              autoComplete="lname"
              value={formData.lastName}
              onChange={e => updateformData({value: e.target.value, name: e.target.name})}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            required
            id="age"
            name="age"
            label="سن"
            fullWidth
            value={formData.age}
            onChange={e => updateformData({value: e.target.value, name: e.target.name})}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <InputLabel  sx={{ textAlign: "right", pb: 1 }} id="gender-select-label">جنسیت</InputLabel> */}
          <div dir="rtl">
            <Select
              sx={{ minWidth: 230 }}
              value={formData.gender}
              name="gender"
              onChange={e => updateformData({value: e.target.value, name: e.target.name})}
            >
              <MenuItem value="W">زن</MenuItem>
              <MenuItem value="M">مرد</MenuItem>
            </Select>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel  sx={{ textAlign: "right", pb: 1 }} id="mariage-type-select-label">نوع ازدواج خودتان</InputLabel>
          <div dir="rtl">
            <Select
              sx={{ minWidth: 230 }}
              id="mariage-type-select-label"
              value={formData.mariageType}
              name="mariageType"
              onChange={e => updateformData({value: e.target.value, name: e.target.name})}
            >
              <MenuItem value="FAMILY">فامیلی</MenuItem>
              <MenuItem value="NON_FAMILY">غریبه</MenuItem>
            </Select>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
         <InputLabel  sx={{ textAlign: "right", pb: 1 }} id="parent-mariage-type-select-label">نوع ازدواج پدر و مادر</InputLabel>
         <div dir="rtl">
            <Select
              sx={{ minWidth: 230 }}
              id="parent-mariage-type-select-label"
              value={formData.parentMariageType}
              name="parentMariageType"
              onChange={e => updateformData({value: e.target.value, name: e.target.name})}
            >
              <MenuItem value="FAMILY">فامیلی</MenuItem>
              <MenuItem value="NON_FAMILY">غریبه</MenuItem>
            </Select>
          </div>
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export default InformationForm;
