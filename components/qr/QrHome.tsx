import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Context from "../context/Context";

import { useRouter } from "next/router";
import QrList from "./QrList";

export default function QrHome({ qrData, userInformation }: any) {
  const { qrs } = JSON.parse(qrData);

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
        {qrs &&
          <Grid item xs={12}>
            {/*@ts-ignore*/}
            <QrList qrs={qrs} />
          </Grid>
        }
      </Grid>
    </Box>
  );
};
