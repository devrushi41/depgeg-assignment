import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TableCell } from "@material-ui/core";

export const StyledTableCell = withStyles((theme) => ({
  root: {
    minWidth: 70,
  },
  head: {
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
