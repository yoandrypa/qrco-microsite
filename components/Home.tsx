import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SendIcon from "@mui/icons-material/Send";
import LinksTable from "./LinksTable";
import AppBar from "./AppBar";
import React, { useState } from "react";
import queries from "../queries";
import Router from "next/router";
import { generateId } from "../utils";

interface State {
  target: string;
  user_id: string;
}

export default function Home({ user, signOut, linksData }: any) {
  const [links, total] = JSON.parse(linksData);
  const [values, setValues] = React.useState<State>({
    target: "",
    user_id: user?.attributes?.sub
  });
  const handleClickCreateLink = async () => {
    try {
      const address = await generateId();
      const link = await queries.link.create({ ...values, address });
      if (link) {
        setValues({
          target: "",
          user_id: user?.attributes?.sub
        });
        Router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar signOut={signOut} />
      <br />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="input-link">Link</InputLabel>
              <OutlinedInput
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
                      onClick={handleClickCreateLink}
                      edge="end"
                      disabled={values.target === ""}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          {links &&
            <Grid item xs={12}>
              <LinksTable links={links} total={total} />
            </Grid>
          }
        </Grid>
      </Container>
    </Box>
  );
};
