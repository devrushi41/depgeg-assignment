import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@material-ui/core";
import { StyledTableCell } from "./styledTableCell";

const columns = [
  { id: "type", label: "Type", sort: false },
  { id: "name", label: "Name", sort: true },
  { id: "height", label: "Height", sort: true },
  { id: "mass", label: "Mass", sort: true },
  { id: "hair_color", label: "Hair Color", sort: true },
  { id: "skin_color", label: "Skin Color", sort: true },
  { id: "eye_color", label: "Eye Color", sort: true },
  { id: "year", label: "Birth Year", sort: true },
  { id: "gender", label: "Gender", sort: true },
  { id: "home world", label: "Home World", sort: true },
];

export default function CustomTableHead({
  className,
  order,
  orderBy,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <>
      <TableHead className={className}>
        <TableRow>
          {columns.map((column) => (
            <StyledTableCell
              key={column.id}
              align="center"
              className="table-cell"
              sortDirection={orderBy === column.id ? order : false}
            >
              {column.sort ? (
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              ) : (
                column.label
              )}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}
