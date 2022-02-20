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

function Projects() {
  const [history, setHistory] = useState(["No entry exists"]);
  axios
    .get("http://172.16.63.149:8080/finance/history", {
      headers: {
        authorization: "Token " + localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.data.code === 1) {
        setHistory(response.data.data);
      }
    });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Inital Amount</TableCell>
            <TableCell>Final Amount</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row) => (
            <TableRow key={row.name}>
              <TableCell scope="row">{row.type}</TableCell>
              <TableCell scope="row">{row.initialAmt}</TableCell>
              <TableCell>{row.finalAmt}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Projects;
