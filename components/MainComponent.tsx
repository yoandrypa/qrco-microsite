import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";

import { handleDesignerString } from "../helpers/qr/helpers";
import { ASSETS, GALLERY } from "./helpers/generalFunctions";
import MainMicrosite from "./qr/microsites/MainMicrosite";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getTheme from "./theming/themeHelper";
import { DEFAULT_COLORS } from "./qr/constants";

const Custom = dynamic(() => import("./qr/microsites/Custom"));
const Donations = dynamic(() => import("./qr/microsites/Donations"));
const Web = dynamic(() => import("./qr/microsites/Web"));
const SamplesList = dynamic(() => import("./SamplesList"));

export default function MainComponent({ newData }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(newData.isAnEmptyPreview === undefined ? newData : null);

  const iframed = useRef<boolean>(false);

  useEffect(() => {
    if (window.top !== window) { // @ts-ignore
      window.top.postMessage( // @ts-ignore
        JSON.stringify({ ready: true }), process.env.REACT_APP_QRCO_URL
      );
      iframed.current = true;
    }

    const handler = (event: any) => {
      if (event.origin === process.env.REACT_APP_QRCO_URL) {
        try {
          const data = typeof data === 'string' ? JSON.parse(event.data) : event.data;
          if (data.previewData !== undefined) {
            setData(data.previewData);
          }
        } catch (e) {
          console.error(e)
        }
      }
    }

    if (window) {
      window.addEventListener('message', handler);
    }
    setLoading(false);
    return () => window.removeEventListener('message', handler);
  }, []);

  if (loading) {
    return (
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography sx={{ mx: "auto" }}>{"Loading..."}</Typography>
          <Typography sx={{ color: theme => theme.palette.text.disabled, mx: "auto", }}>{"Please wait..."}</Typography>
        </Box>
      </Box>
    );
  }

  const renderMicrositeComponent = () => {
    if (['donation', 'donations'].includes(data?.qrType)) {
      return <Donations data={data} />;
    }

    if (["web", "twitter", "whatsapp", "facebook"].includes(data?.qrType)) {
      return <Web urlString={handleDesignerString(data.qrType, data)} />;
    }

    if (data?.samples) {
      return <SamplesList newData={data.samples} />;
    }

    if (["custom", "vcard+", "social", "business", "coupon", "findMe", "inventory", "linkedLabel", "link", "petId", ...ASSETS, ...GALLERY].includes(data?.qrType)) {
      return <Custom newData={{ ...data, iframed: iframed.current }} />;
    }

    return (
      <MainMicrosite data={{}}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", mt: '27px' }}>
          <EngineeringIcon color="primary" sx={{ mx: "auto", fontSize: "50px" }} />
          <Typography sx={{ mx: "auto" }}>{"Work in progress."}</Typography>
          <Typography sx={{ color: theme => theme.palette.text.disabled, mx: "auto" }}>
            {"This is going to be ready very soon."}
          </Typography>
        </Box>
      </MainMicrosite>
    );
  }

  return (
    <>
      {!data && newData.isAnEmptyPreview ? (
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <Typography sx={{ textAlign: 'center' }}>{'Preparing preview...'}</Typography>
        </Box>
      ) : (
        <ThemeProvider
          theme={createTheme(getTheme(data?.primary || DEFAULT_COLORS.p, data?.secondary || DEFAULT_COLORS.s, iframed.current))}>
          <CssBaseline />
          {renderMicrositeComponent()}
        </ThemeProvider>
      )}
    </>
  );
}
