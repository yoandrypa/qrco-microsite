// @ts-ignore
import Box from "@mui/material/Box";
import DomainsTable from "./DomainsTable";
import DomainsCreateForm from "./DomainsCreateForm";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

// @ts-ignore
const SettingsDomain = ({ realIp, domains, user }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            You can set a custom domain for your short URLs, so instead of{" "}
            <b>{publicRuntimeConfig.REACT_APP_DEFAULT_DOMAIN}/shorturl</b> you can have{" "}
            <b>example.com/shorturl.</b>
          </Typography>
          <Typography>
            Point your domain A record to <b>{realIp}</b> then add the domain
            via form below:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <DomainsCreateForm user={user} />
        </Grid>
        <br />
        <Grid item xs={12}>
          <DomainsTable domains={domains} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsDomain;
