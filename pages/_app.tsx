import type { AppProps } from "next/app";
import { useState } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Head from 'next/head';

import { IntlProvider } from "react-intl";
import { themeConfig } from "../utils/theme";

import "../styles/globals.css";

import { MAIN_CONFIG } from "../consts";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mainConfig, setMainConfig] = useState(MAIN_CONFIG);
  const [messages, setMessages] = useState(undefined);
  const { locale, theme } = mainConfig;
  // @ts-ignore
  const mainTheme = createTheme(themeConfig(theme));

  return (
    <>
      <Head>
        <title>The QR Link | Dynamic QR code</title>
        <link rel="icon" href="/ebanuxQr.svg" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={mainTheme}>
            <IntlProvider locale={locale} messages={messages}>
              <Component {...pageProps} />
            </IntlProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
