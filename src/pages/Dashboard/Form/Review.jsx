import React from "react";
// import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Grid from '@material-ui/core/Grid';

import {
  Typography,
  List,
  ListItem,
  Divider,
  Grid2 as Grid,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { useFormStore } from "../../../store/useFormStore";

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
  { name: "Shipping", desc: "", price: "Free" },
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

function Review() {
  const consultResult = useFormStore((state) => state.consultResult);

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={1}>
      <Typography sx={{ pt: 4 }} textAlign="right" variant="h6" gutterBottom>
          نتیجه اولیه شما
        </Typography>
      <Divider  />
        
        

        <Grid item sx={{pt:4}} xs={12}>
          <Typography textAlign="center" variant="h5">
            {consultResult.consultResult
              ? "شما به مشاوره نیاز دارید"
              : "شما نیازی به مشاوره ندارید"}
          </Typography>
        </Grid>

        {consultResult.consultResult && (
          <Grid item xs={12} sx={{px: 6}}>
            <Typography textAlign="center" fontSize={16}>
              شما با کلیک کردن روی دکمه رزرو مشاوره بعد از پرداخت کردن, زمان مشاوره رو انتخاب کنید
            </Typography>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

// const HtmlTooltip = styled(Review)(({theme}) => ({
//   listItem: {
//     padding: `${theme.spacing.unit}px 0`,
//   },
//   total: {
//     fontWeight: "700",
//   },
//   title: {
//     marginTop: theme.spacing.unit * 2,
//   },
// }));

export default Review;
