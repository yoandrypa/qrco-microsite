import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LinksTable from "./LinksTable";
import AppBar from "./AppBar";
import React, { useState } from "react";
import LinksCreateForm from "./LinksCreateForm";
import { UserContext } from "../utils/contexts";

export default function Home({ linksData }: any) {
  const { data, total } = JSON.parse(linksData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <UserContext.Consumer>
        {({ signOut }) => <AppBar signOut={signOut} />}
      </UserContext.Consumer>
      <br />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UserContext.Consumer>
              {({ user }) => <LinksCreateForm user={user} />}
            </UserContext.Consumer>
          </Grid>
          {data &&
            <Grid item xs={12}>
              <LinksTable links={data} total={total} />
            </Grid>
          }
        </Grid>
      </Container>
    </Box>
  );
};
