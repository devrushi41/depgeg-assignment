import React, { useState, useEffect, useCallback } from "react";

import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Grid,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "./styles.js";
import axios from "axios";
import CustomTableHead from "./customTableHead";
import CustomTableCell from "./customTableCell";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function DataTable() {
  const [page, setPage] = useState(1);

  const [error, setError] = useState(false);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const url = "https://swapi.dev/api/people/?page=";

  const fetchPeople = useCallback(async () => {
    try {
      let response = await axios.get(url + page.toString());

      setData(response.data.results);
    } catch (err) {
      setError(true);
    }
  }, [setData, setCount, url, page]);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const classes = useStyles();

  if (error)
    return <Alert severity="error">There is an error at our end</Alert>;
  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="customized table">
          <CustomTableHead
            className={classes.tableHead}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy)).map(
              (person, index) => (
                <CustomTableCell person={person} key={index} />
              )
            )}
          </TableBody>
        </Table>
        <Grid
          container
          justify="center"
          className={classes.pagination}
          alignItems="center"
        >
          <Pagination
            count={Math.ceil(count / 10)}
            page={page}
            onChange={handleChange}
            color="secondary"
          />
        </Grid>
      </TableContainer>
    </>
  );
}
