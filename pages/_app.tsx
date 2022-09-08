import type { AppProps } from "next/app";
import { useState } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { IntlProvider } from "react-intl";
import { themeConfig } from "../utils/theme";

import "@aws-amplify/ui-react/styles.css";
import "../styles/globals.css";

import AppContextProvider from "../components/context/AppContextProvider";
import { MAIN_CONFIG } from "../consts";
import Loading from "../components/Loading";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mainConfig, setMainConfig] = useState(MAIN_CONFIG);
  const [messages, setMessages] = useState(undefined);
  const { locale, theme } = mainConfig;
  // @ts-ignore
  const mainTheme = createTheme(themeConfig(theme));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={mainTheme}>
        <AppContextProvider>
          <IntlProvider locale={locale} messages={messages}>
            <Component {...pageProps} />
            <Loading />
          </IntlProvider>
        </AppContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
