import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinksTable from "./QrTable";
import Context from "../context/Context";

import { useRouter } from "next/router";

export default function QrHome({ qrsData, userInformation }: any) {
  const { data, total } = JSON.parse(qrsData);

  const router = useRouter();

  // @ts-ignore
  const { userInfo, setUserInfo, setLoading } = useContext(Context);

  useEffect(() => {
    if (router.query.login) {
      router.push("/", undefined, { shallow: false });
    }
    if (!userInfo) {
      setUserInfo(userInformation);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/*<LinksCreateForm user={userInformation} domains={domains} />*/}
        </Grid>
        {data &&
          <Grid item xs={12}>
            {/*<LinksTable links={data} total={total} user={userInformation} domains={domains} />*/}
          </Grid>
        }
      </Grid>
    </Box>
  );
};
