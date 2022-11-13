import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import pluralize from "pluralize";
import TypeSelector from "./qr/helperComponents/TypeSelector";
import {useRouter} from "next/router";

interface SampleProp {
  newData: string[];
}

const SamplesList = ({newData}: SampleProp) => {
  const [baseUrl, setBaseUrl] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    if (window) {
      setBaseUrl(window.location.href);
    }
  }, []);

  const goTo = async (payload: string) => {
    await router.push(`/sample/${payload}`, undefined);
  }

  return (
    <>
      <CssBaseline/>
      <Box
        component="img"
        alt="backgimage"
        src="/background_samples.png"
        sx={{
          width: '100%',
          height: '185px',
          objectFit: 'cover'
        }} />
      <Container sx={{width: '100%', mt: '-70px'}}>
        <Box sx={{p: 3, width: '100%'}}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'inline-flex', color: theme => theme.palette.primary.dark }}>
            {'MICROSITE'}
          </Typography>
          <Typography variant="h4" sx={{ display: 'inline-flex', color: theme => theme.palette.text.disabled, ml: 1}}>
            {'EXAMPLES'}
          </Typography>
          <Typography sx={{ mb: 2, color: theme => theme.palette.text.disabled }}>
            {`${pluralize('microsite', newData.length, true)} found`}
          </Typography>
          <Grid container spacing={1}>
            {newData.map((x: string) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={`item${x}`}>
                <TypeSelector handleSelect={goTo} label={x} icon={x} baseUrl={baseUrl} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  )
};

export default SamplesList;
