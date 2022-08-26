import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

interface State {
  password: string;
  showPassword: boolean;
}

const LinksCreateFormOptions = () => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="domain-select-label">Domain</InputLabel>
          <Select
            labelId="domain-select-label"
            id="domain-select"
            value={""}
            label="Domain"
            onChange={() => null}
            size="small"
            fullWidth
          >
            <MenuItem value="1">Domain 1</MenuItem>
            <MenuItem value="2">Domain 2</MenuItem>
            <MenuItem value="3">Domain 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="address-text"
          value={null}
          label="/"
          onChange={() => null}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="password-text-label">Password</InputLabel>
          <OutlinedInput
            id="password-text"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            size="small"
          />
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="expires-in-text"
          value={""}
          label="Expires in"
          onChange={() => null}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          id="description-text"
          value={""}
          label="Description"
          onChange={() => null}
          size="small"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default LinksCreateFormOptions;
