import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import FormControl from "@mui/material/FormControl";
import React from "react";
import { generateId, isValidUrl } from "../utils";
import Router from "next/router";
import * as LinkHandler from "../handlers/links";
import * as UserHandler from "../handlers/users";
import LinksCreateFormOptions from "./LinksCreateFormOptions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface State {
  target: string;
  user_id: string;
}

const initialState = (user: { attributes: { sub: string }; }) => {
  return {
    target: "",
    user_id: user?.attributes?.sub
  };
};

const LinksCreateForm = ({ user }: any) => {
  const [values, setValues] = React.useState<State>(initialState(user));
  const [checked, setChecked] = React.useState(false);

  const handleCreateLink = async () => {
    try {
      const address = await generateId();
      const userData = await UserHandler.find(user?.attributes?.sub);
      const link = await LinkHandler.create({ body: { ...values, customurl: address }, user: userData });//queries.link.create({ ...values, address });
      if (link) {
        setValues(initialState(user));
        await Router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const validUrl = (values.target && !isValidUrl(values.target)) === true

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="input-link">Link</InputLabel>
      <OutlinedInput
        error={validUrl}
        id="input-link"
        size="small"
        type="text"
        value={values.target}
        onChange={handleChange("target")}
        label="Link"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="create new short link"
              onClick={handleCreateLink}
              edge="end"
              disabled={validUrl}
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <FormControlLabel control={
        <Checkbox
          checked={checked}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setChecked(event.target.checked);
          }}
        />}
                        label="Show advanced options"
      />
      {checked && <LinksCreateFormOptions />}
    </FormControl>
  );
};
export default LinksCreateForm;
