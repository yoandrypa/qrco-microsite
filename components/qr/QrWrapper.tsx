import {ReactNode, cloneElement, useCallback, useContext} from 'react';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';

import Context from '../context/Context';

import {useRouter} from 'next/router';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll({ children, window }: Props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 1
  });
}

interface QrWrapperProps {
  children: ReactNode;
}

export default function QrWrapper(props: QrWrapperProps) {
  const { children } = props;

  const router = useRouter();

  // @ts-ignore
  const { userInfo } = useContext(Context);

  const handleLogin = useCallback(() => {
    router.push({ pathname: '/', query: { login: true } });
  }, []);

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar component="nav" sx={{ background: 'inherit' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', color: theme => theme.palette.text.primary }}>
            <Box sx={{ display: 'flex' }}>
              <Box component="img" alt="EBANUX" src="/ebanuxQr.svg" sx={{ width: '40px' }} />
              <Typography sx={{ my: 'auto', ml: '5px', fontSize: '25px', fontWeight: 'bold' }}>QR Link</Typography>
              {!Boolean(userInfo) && (
                <Button startIcon={<LoginIcon />} onClick={handleLogin}>
                  Login
                </Button>
              )}
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ my: 'auto', display: { sm: 'block', xs: 'none' } }}>
                {'Powered by'}
              </Typography>
              <Box component="img" alt="EBANUX" src="/ebanux.svg" sx={{ width: '95px', mt: '-2px', ml: '7px' }} />
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Container>
        <Toolbar/>
        <Box sx={{ p: 1, width: { sm: '780px', xs: 'calc(100% - 20px)' }, mx: 'auto' }}>
          {children}
        </Box>
      </Container>
    </>
  );
}
