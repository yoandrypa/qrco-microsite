import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { formatRelative, subDays } from "date-fns";
import Link from "next/link";
import { generateShortLink } from "../utils";
import Stack from "@mui/material/Stack";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PieChartIcon from "@mui/icons-material/PieChart";
import EditIcon from "@mui/icons-material/Edit";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyIcon from "@mui/icons-material/Key";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface Column {
  id: "address" |
    "banned_by_id" |
    "banned" |
    "created_at" |
    "description" |
    "domain_id" |
    "expire_in" |
    "id" |
    "password" |
    "target" |
    "updated_at" |
    "user_id" |
    "visit_count" |
    "link" |
    "actions";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: string) => any;
}

interface State {
  search: string;
}

const columns: readonly Column[] = [
  {
    id: "target",
    label: "Original URL",
    minWidth: 310,
    maxWidth: 310,
    format: (value: string) => (
      <Link href={value}>
        <a style={{ color: "blue" }}>
          <Typography noWrap>{value}</Typography>
        </a>
      </Link>
    )
  },
  {
    id: "created_at",
    label: "Created",
    minWidth: 140,
    maxWidth: 140,
    format: (value: string) => formatRelative(subDays(new Date(value), 3), new Date(value))
  },
  {
    id: "link",
    label: "Short URL",
    minWidth: 170,
    maxWidth: 170,
    format: (value: string) => <Link href={value}><a style={{ color: "blue" }}>{value}</a></Link>
  },
  {
    id: "visit_count",
    label: "Views",
    minWidth: 10,
    maxWidth: 10,
    align: "right"
  },
  {
    id: "actions",
    label: "",
    minWidth: 130,
    maxWidth: 130,
    align: "left"
  }
];

interface Data extends LinkType {
  link: string;
  actions: any;
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
  const link = generateShortLink(address);
  const actions = (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end"
           divider={<Divider orientation="vertical" flexItem />}>
      {visit_count > 0 && <PieChartIcon fontSize="small" color="info" onClick={() => alert("Show stats")} />}
      {password && <KeyIcon fontSize="small" color="info" />}
      <QrCodeIcon fontSize="small" color="action" onClick={() => alert("Show QR")} />
      <EditIcon fontSize="small" color="warning" onClick={() => alert("Edit link")} />
      <DoNotDisturbIcon fontSize="small" color="error" onClick={() => alert("Banned link")} />
      <DeleteIcon fontSize="small" color="error" onClick={() => alert("Delete link")} />
    </Stack>
  );
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
    link,
    actions
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
}));

// @ts-ignore
const LinksTable = ({ links, total }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [values, setValues] = useState({
    search: ""
  });
  const [checked, setChecked] = React.useState(false);

  const rows = links.map((link: LinkType) => {
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

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} variant="outlined">
      <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
        <Grid item xs={0.1}></Grid>
        <Grid item xs={5.7}>
          <FormControl fullWidth>
            <InputLabel htmlFor="input-link-search">Search</InputLabel>
            <OutlinedInput
              id="input-link-search"
              size="small"
              type="text"
              value={values.search}
              onChange={handleChange("search")}
              label="Search"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="create new short link"
                    onClick={() => null} //TODO
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={1.2}>
          <FormControlLabel control={
            <Checkbox
              checked={checked}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setChecked(event.target.checked);
              }}
            />}
                            label="All links"
          />
        </Grid>
        <Grid item xs={1.0}>
          <IconButton>
            <ReplayIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </StyledTableCell>
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
                        <StyledTableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                        >
                          {column.format && typeof value === "string"
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
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
