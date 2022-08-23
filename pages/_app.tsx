import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material/styles";
import "@aws-amplify/ui-react/styles.css";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
  );
}
