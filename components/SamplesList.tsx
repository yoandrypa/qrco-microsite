import { ReactElement, cloneElement, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TypeSelector from "./qr/helperComponents/TypeSelector";
import { useRouter } from "next/router";

interface SampleProp {
  newData: string[];
}

interface Props {
  window?: () => Window;
  children: ReactElement;
}

const height = "95px";

function ElevationScroll({ children, window }: Props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });
  return cloneElement(children, { elevation: trigger ? 5 : 0 });
}

const SamplesList = ({ newData }: SampleProp) => {
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
      <CssBaseline />
      <ElevationScroll>
        <AppBar component="nav" sx={{ background: "#fff", height }}>
          <Container sx={{ my: "auto" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", color: theme => theme.palette.text.primary }}>
              <Box sx={{ display: "flex" }}>
                <Box component="img" alt="EBANUX" src="/ebanuxQr.svg" sx={{ width: "40px" }} />
                <Typography sx={{ my: "auto", ml: "5px", fontSize: "28.8px", fontWeight: "bold" }}>{'The QR Link'}</Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Container sx={{ width: '100%' }}>
        <Box sx={{ height }} />
        <Box sx={{ p: 3, width: '100%' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'inline-flex', color: theme => theme.palette.primary.dark }}>
            {'MICROSITE'}
          </Typography>
          <Typography variant="h4" sx={{ display: 'inline-flex', color: theme => theme.palette.text.disabled, ml: 1 }}>
            {'SAMPLES'}
          </Typography>
          <Typography sx={{ mb: 2, color: theme => theme.palette.text.disabled }}>
            {`${newData.length} sample${newData.length !== 1 ? 's' : ''} found`}
          </Typography>
          <Grid container spacing={1}>
            {newData.map((x: any) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={`item${x.file}`}>
                <TypeSelector handleSelect={goTo} label={x.name} description={x.desc} icon={x.type} baseUrl={baseUrl} fileName={x.file} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  )
};

export default SamplesList;
