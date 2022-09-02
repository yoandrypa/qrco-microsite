import {ReactNode, cloneElement, useCallback, useMemo} from 'react';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import QrCodeIcon from '@mui/icons-material/QrCode';
import HomeIcon from '@mui/icons-material/Home';

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
  userInfo: any;
  handleLogout: () => void;
}

export default function AppWrapper(props: QrWrapperProps) {
  const { children, userInfo, handleLogout } = props;

  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push({ pathname: '/', query: { login: true } });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNavigation = useCallback(() => {
    router.push((router.pathname === '/' ? '/qr/type' : '/'), undefined, { shallow: true });
  }, [router.pathname]);  // eslint-disable-line react-hooks/exhaustive-deps

  const isLoggin = useMemo(() => (router.pathname === '/' && !Boolean(userInfo)), [userInfo, router.pathname]);

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar component="nav" sx={{ background: '#fff' }}>
          <Container>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', color: theme => theme.palette.text.primary }}>
              <Box sx={{ display: 'flex' }}>
                <Box component="img" alt="EBANUX" src="/ebanuxQr.svg" sx={{ width: '40px' }} />
                <Typography sx={{ my: 'auto', ml: '5px', fontSize: '25px', fontWeight: 'bold' }}>QR Link</Typography>
              </Box>
              {!isLoggin && (<Box>
                <Button
                  startIcon={router.pathname === '/' ? <QrCodeIcon /> : <HomeIcon />}
                  onClick={handleNavigation}
                  variant="outlined"
                  sx={{height: '28px', my: 'auto'}}>
                  {router.pathname === '/' ? 'QR Editor' : 'Go Home'}
                </Button>
                {!Boolean(userInfo) ? (
                  <Button
                    startIcon={<LoginIcon />}
                    onClick={handleLogin}
                    variant="contained"
                    sx={{ height: '28px', mr: '5px', my: 'auto' }}>
                    Login
                  </Button>
                ) : (
                  <Button
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    variant="contained"
                    sx={{ height: '28px', marginLeft: '10px', my: 'auto' }}>
                    Logout
                  </Button>
                )}
              </Box>)}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Container sx={{ width: '100%' }}>
        <Box sx={{ height: '60px' }}/> {/* Aims to fill the header's gap */}
        <Box sx={{ p: 2, width: router.pathname === '/' && !isLoggin ? '100%' : { sm: '780px', xs: 'calc(100% - 20px)' }, mx: 'auto', minHeight: 'calc(100vh - 110px)' }}>
          {children}
        </Box>
        {!isLoggin && (<Box sx={{ height: '40px', mt: '10px' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ my: 'auto', display: { sm: 'block', xs: 'none' } }}>
              {'Powered by'}
            </Typography>
            <Box component="img" alt="EBANUX" src="/ebanux.svg" sx={{ width: '95px', mt: '-2px', ml: '7px' }} />
          </Box>
        </Box>)}
      </Container>
    </>
  );
}
