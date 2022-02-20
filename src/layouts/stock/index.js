import { useState } from "react";
import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import * as React from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Stock() {
  const [stock, setStock] = useState(["No record exists"]);
  const [state, setState] = useState("loading");
  axios
    .get("http://172.16.63.149:8080/stocks/info", {
      headers: {
        authorization: "Token " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setStock(response.data.data);
      setState("loaded");
    });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {state === "loading" ? (
        <MDAlert>Loading...</MDAlert>
      ) : (
        <MDBox mt={6} mb={3}>
          <Grid container spacing={3} justifyContent="center">
            {stock.map((stockSingle) => (
              <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default Stock;
