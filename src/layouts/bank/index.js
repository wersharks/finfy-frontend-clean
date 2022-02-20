import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { useState } from "react";

function Bank() {
  const [history, setHistory] = useState([]);
  axios
    .get("http://34.68.150.75:8080/bank/history", {
      headers: {
        authorization: "Token " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log(response.data.data);
      setHistory(response.data.data);
      console.log(history);
    });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const deposits = [
    {
      value: "Fixed Deposit",
      label: "Fixed Deposit",
    },
    {
      value: "Classic Deposit",
      label: "Classic Deposit",
    },
  ];
  const [deposit, setdeposit] = useState("Classic Deposit");
  const handleChange = (event) => {
    setdeposit(event.target.value);
  };
  const handleDeposit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      amount: data.get("amount"),
      inves_type: deposit,
    });
    axios
      .post(
        "http://34.68.150.75:8080/bank/deposit",
        {
          amount: data.get("amount"),
          inves_type: deposit,
        },
        {
          headers: {
            authorization: "Token " + localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        alert("Deposit Successful");
      })
      .catch(function (error) {
        if (error.response) {
          alert("Try again.");
        }
      });
  };
  const handleWithdraw = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get("withdraw"),
    });
    axios
      .post(
        "http://34.68.150.75:8080/bank/withdraw",
        {
          id: data.get("withdraw"),
        },
        {
          headers: {
            authorization: "Token " + localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        if (response.data.code === 1) {
          alert("Withdraw Successful");
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        if (error.response) {
          alert("Try again.");
        }
      });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Balance"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid component={Paper} elevation={6} item xs={12} lg={12} sx={{ mt: 5, ml: 4 }}>
                  <h3>Deposit Form</h3>
                  <Box
                    sx={{
                      my: 1,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box component="form" onSubmit={handleDeposit} noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        id="outlined-select-deposit"
                        select
                        label="Select"
                        value={deposit}
                        onChange={handleChange}
                        helperText="Select the amount of deposit you want to make "
                      >
                        {deposits.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="amount"
                        label="Enter Amount you want to Deposit"
                        type="amount"
                        id="amount"
                      />
                      <Button type="submit" fullWidth sx={{ mt: 3, mb: 2, color: "white" }}>
                        Deposit
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid component={Paper} elevation={6} item xs={12} lg={12} sx={{ mt: 5, ml: 4 }}>
                  <h3>Withdraw Form</h3>
                  <Box
                    sx={{
                      my: 1,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box component="form" onSubmit={handleWithdraw} noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="withdraw"
                        label="Enter id of the transaction you want to withdraw"
                        type="text"
                        id="withdraw"
                      />
                      <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                        Withdraw
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Deposit Type</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right">Principle</StyledTableCell>
              <StyledTableCell>Current</StyledTableCell>
              <StyledTableCell>ROI</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell scope="row">{row.invesType}</StyledTableCell>
                <StyledTableCell scope="row">{row.id}</StyledTableCell>
                <StyledTableCell scope="row">{row.inveStat}</StyledTableCell>
                <StyledTableCell scope="row">{row.principle}</StyledTableCell>
                <StyledTableCell>{row.current}</StyledTableCell>
                <StyledTableCell align="right">{row.roi}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
}

export default Bank;
