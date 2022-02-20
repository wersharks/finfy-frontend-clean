import { useState } from "react";
import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

function Crypto() {
  const [crypto, setCrypto] = useState(["No record exists"]);
  const [state, setState] = useState("loading");
  axios
    .get("http://172.16.63.149:8080/crypto/info", {
      headers: {
        authorization: "Token " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setCrypto(response.data.data);
      console.log(response.data.data);
      setState("loaded");
    });

  const handleBuy = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });

    axios
      .post("http://172.16.63.149:8080/crypto/buy", {
        login: data.get("username"),
        password: data.get("password"),
      })
      .then(function (response) {
        console.log(response.data.data);
      })
      .catch(function (error) {
        if (error.response) {
          alert("Try again");
        }
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {state === "loading" ? (
        <MDAlert>Loading...</MDAlert>
      ) : (
        <MDBox mt={6} mb={3}>
          <Grid container spacing={3} justifyContent="center">
            {crypto.map((crypt) => (
              <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia component="img" height="140" image={crypt.img} alt="green iguana" />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {crypt.crypto}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Value:
                        {crypt.val}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Change:
                        {crypt.change}%
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Box component="form" noValidate onSubmit={handleBuy} sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      id="amount"
                      label="Enter amount in fin coins to buy"
                      name="amount"
                      autoFocus
                      fullWidth
                      sx={{ padding: "2%" }}
                    />
                    <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                      Buy Now
                    </Button>
                  </Box>
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

export default Crypto;
