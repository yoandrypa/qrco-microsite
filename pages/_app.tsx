import type { AppProps } from 'next/app';
import { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { IntlProvider } from "react-intl";
import { themeConfig } from "../utils/theme";

import '@aws-amplify/ui-react/styles.css';
import '../styles/globals.css';

import QrContext from '../components/qr/QrContext';
import { MAIN_CONFIG } from '../consts';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mainConfig, setMainConfig] = useState(MAIN_CONFIG);
  const [messages, setMessages] = useState(undefined);
  const { locale, theme } = mainConfig;
  // @ts-ignore
  const mainTheme = createTheme(themeConfig(theme));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={mainTheme}>
        <QrContext>
          <IntlProvider locale={locale} messages={messages}>
            <Component {...pageProps} />
          </IntlProvider>
        </QrContext>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
