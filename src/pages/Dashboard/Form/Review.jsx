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
  ListItemText,
  Grid
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

  const consultResult = useFormStore(
    (state) => state.consultResult
  );


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <h1>{consultResult.consultId}</h1>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom >
            Payment details
          </Typography>
          <Grid container>
            <h1> {consultResult.consultResult ? 'yesss' : 'noooo'} </h1>
          </Grid>
        </Grid>
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