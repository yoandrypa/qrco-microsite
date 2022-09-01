import { useContext, useEffect } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LinksTable from "./LinksTable";
import AppBar from "./AppBar";
import LinksCreateForm from "./LinksCreateForm";
import { UserContext } from "../utils/contexts";
import Context from "./context/Context";

export default function Home({ linksData, domainsData, userInformation, signOut }: any) {
  const { data, total } = JSON.parse(linksData);
  const domains = JSON.parse(domainsData);

  // @ts-ignore
  const { setUserInfo } = useContext(Context);

  useEffect(() => {
    setUserInfo(userInformation);
  }, []);

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
              {({ user }) => <LinksCreateForm user={user} domains={domains} />}
            </UserContext.Consumer>
          </Grid>
          {data &&
            <Grid item xs={12}>
              <UserContext.Consumer>
                {({ user }) => <LinksTable links={data} total={total} user={user} domains={domains} />}
              </UserContext.Consumer>
            </Grid>
          }
        </Grid>
      </Container>
    </Box>
  );
};
