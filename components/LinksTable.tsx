import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import queries from "../queries";
import { formatRelative, subDays } from "date-fns";

interface Column {
  id: "address" | "banned_by_id" | "banned" | "created_at" | "description" | "domain_id" | "expire_in" | "id" | "password" | "target" | "updated_at" | "user_id" | "visit_count" | "link";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
}


const columns: readonly Column[] = [
  { id: "target", label: "Original URL", minWidth: 170 },
  {
    id: "created_at",
    label: "Created",
    minWidth: 100,
    format: (value: string) => formatRelative(subDays(new Date(value), 3), new Date(value))
  },
  {
    id: "link",
    label: "Short URL",
    minWidth: 170
  },
  {
    id: "visit_count",
    label: "Views",
    minWidth: 170,
    align: "right"
  }
];

interface Data extends Link {
  link: string;
}

function createData(
  address: string,
  banned_by_id: string | undefined,
  banned: boolean,
  created_at: string,
  description: string | undefined,
  domain_id: string | undefined,
  expire_in: number,
  id: string,
  password: string | undefined,
  target: string,
  updated_at: string,
  user_id: string | undefined,
  visit_count: number
): Data {
  const protocol = process.env.REACT_APP_CUSTOM_DOMAIN_USE_HTTPS ? "http" : "https";
  const link = protocol + "://" + process.env.REACT_APP_DEFAULT_DOMAIN + "/" + address;
  return {
    address,
    banned_by_id,
    banned,
    created_at,
    description,
    domain_id,
    expire_in,
    id,
    password,
    target,
    updated_at,
    user_id,
    visit_count,
    link
  };
}

// @ts-ignore
const LinksTable = ({ links, total }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = links.map((link: Link) => {
    return createData(
      link.address,
      link.banned_by_id,
      link.banned,
      link.created_at,
      link.description,
      link.domain_id,
      link.expire_in,
      link.id,
      link.password,
      link.target,
      link.updated_at,
      link.user_id,
      link.visit_count
    );
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Data) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.target}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "string"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default LinksTable;
