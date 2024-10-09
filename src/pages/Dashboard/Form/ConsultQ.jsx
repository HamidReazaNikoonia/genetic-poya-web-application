import React from 'react';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';


import {
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Grid2 as Grid,
} from "@mui/material";

import {useFormStore} from "../../../store/useFormStore";

function ConsultQ() {


  const consultQuestions = useFormStore((state) => state.consultQuestions)
  const updateconsultQuestions = useFormStore((state) => state.updateconsultQuestions)


  const handleChange = (e) => {
    updateconsultQuestions({name: e.target.name, value: e.target.checked});
  }

  return (
    <React.Fragment>
      <Typography sx={{pb:4}} align="center" fontSize={18} gutterBottom>
        در صورت وجود هر یک از موارد زیر در بستگان خود انتخاب کنید
      </Typography>

      <Typography sx={{pb:2}} align="right" fontSize={16} gutterBottom>
          مشکلات شنوایی, اختلال بینایی, اختلال ذهنی یا عقب ماندگی, تاخیر در تکامل و رشد, اختلال در حرکت اندام ها 
      </Typography>
      <Grid container spacing={2} rowSpacing={4}>
        
        <Grid sx={{pt: 4}}  item xs={12}>
          <div dir="rtl">
          <Grid container spacing={4}>
          <FormControlLabel
            control={<Checkbox color="secondary"  name="1" onChange={handleChange} checked={consultQuestions["1"]} />}
            label="خودتان"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" name="2" onChange={handleChange} checked={consultQuestions["2"]} />}
            label="فرزندان"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" name="3" onChange={handleChange} checked={consultQuestions["3"]} />}
            label="خواهر یا برادر"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" name="4" onChange={handleChange} checked={consultQuestions["4"]} />}
            label="خواهر زاده های پسر خانوم"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" name="5" onChange={handleChange} checked={consultQuestions["5"]} />}
            label="دایی خانوم"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" name="6" onChange={handleChange} checked={consultQuestions["6"]} />}
            label="پسر خاله خانوم"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" name="7" onChange={handleChange} checked={consultQuestions["7"]} />}
            label="پدر بزرگ مادری خانوم"
          />
          <FormControlLabel
            control={<Checkbox color="secondary" name="8" onChange={handleChange} checked={consultQuestions["8"]} />}
            label="پدر و مادر زوجین"
          />
          {/* <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="خودتان"
          /> */}
          </Grid>
          
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ConsultQ;