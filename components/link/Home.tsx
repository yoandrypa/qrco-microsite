import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinksTable from "./LinksTable";
import LinksCreateForm from "./LinksCreateForm";
import Context from "../context/Context";

import { useRouter } from "next/router";
import PleaseWait from "../PleaseWait";

export default function Home({ linksData, domainsData, userInformation }: any) {
  const { data, total } = JSON.parse(linksData);
  const domains = JSON.parse(domainsData);

  const router = useRouter();

  // @ts-ignore
  const { userInfo, setUserInfo } = useContext(Context);

  useEffect(() => {
    if (router.query.login) {
      const { path } = router.query;
      // @ts-ignore
      router.push(Boolean(path) ? path : '/', undefined, { shallow: false });
    }
    if (!userInfo) {
      setUserInfo(userInformation);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
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
    </Box>
  );
};
