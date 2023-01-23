import type { AppProps } from "next/app";
import { useState } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Head from 'next/head';
import { themeConfig } from "../utils/theme";

import "../styles/globals.css";

import { MAIN_CONFIG } from "../consts";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mainConfig] = useState(MAIN_CONFIG);
  const { theme } = mainConfig;
  // @ts-ignore
  const mainTheme = createTheme(themeConfig(theme));

  return (
    <>
      <Head>
        <title>QRLynk | Pro QR codes</title>
        <link rel="icon" href="/qlIcon.png" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={mainTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
