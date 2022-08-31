import type { AppProps } from 'next/app';
import { StyledEngineProvider } from '@mui/material/styles';
import '@aws-amplify/ui-react/styles.css';
import '../styles/globals.css';
import QrContext from '../components/qr/QrContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <QrContext>
        <Component {...pageProps} />
      </QrContext>
    </StyledEngineProvider>
  );
}
