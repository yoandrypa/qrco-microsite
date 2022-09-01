import { useContext, useEffect } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LinksTable from "./LinksTable";
import AppBar from "./AppBar";
import LinksCreateForm from "./LinksCreateForm";
import Context from "./context/Context";

export default function Home({ linksData, domainsData, userInformation }: any) {
  const { data, total } = JSON.parse(linksData);
  const domains = JSON.parse(domainsData);

  // @ts-ignore
  const { setUserInfo, logout } = useContext(Context);

  useEffect(() => {
    setUserInfo(userInformation);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar signOut={logout} />
      <br />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LinksCreateForm user={userInformation} domains={domains} />
          </Grid>
          {data &&
            <Grid item xs={12}>
              <LinksTable links={data} total={total} user={userInformation} domains={domains} />
            </Grid>
          }
        </Grid>
      </Container>
    </Box>
  );
};
