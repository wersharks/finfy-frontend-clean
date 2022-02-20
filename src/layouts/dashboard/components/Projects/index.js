/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Data

import axios from "axios";
import { useState } from "react";

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

function Projects() {
  const [history, setHistory] = useState([]);
  axios
    .get("http://34.68.150.75:8080/finance/history", {
      headers: {
        authorization: "Token " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setHistory(response.data.data);
    });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell align="right">Inital Amount</StyledTableCell>
            <StyledTableCell>Final Amount</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell scope="row">{row.type}</StyledTableCell>
              <StyledTableCell scope="row">{row.initialAmt}</StyledTableCell>
              <StyledTableCell>{row.finalAmt}</StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Projects;
