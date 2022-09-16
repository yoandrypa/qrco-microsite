import {ReactElement, ReactNode, cloneElement, useCallback, useMemo, useState, MouseEvent} from 'react';
import Head from 'next/head';

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
import FirstPageIcon from '@mui/icons-material/FirstPage';
import useMediaQuery from "@mui/material/useMediaQuery";

import {useRouter} from 'next/router';
import Link from 'next/link'

import {PARAM_QR_TEXT, QR_TYPE_ROUTE} from "./qr/constants";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

interface Props {
  window?: () => Window;
  children: ReactElement;
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
  userInfo?: any;
  handleLogout?: () => void;
  clearData?: (clear: true) => void;
}

export default function AppWrapper(props: QrWrapperProps) {
  const { children, userInfo, handleLogout, clearData } = props;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isWide = useMediaQuery('(min-width:600px)', { noSsr: true });
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push({ pathname: '/', query: { login: true } }, '/');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNavigation = useCallback(() => {
    if (clearData !== undefined) {
      clearData(true);
    }
    router.push((router.pathname === '/' ? QR_TYPE_ROUTE : '/'), undefined, { shallow: true });
  }, [router.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const isLoggin = useMemo(() => (
    router.pathname === '/' && router.query[PARAM_QR_TEXT] === undefined && !Boolean(userInfo)
  ), [userInfo, router.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Head>
        <title>The QR Link</title>
        <link rel="icon" href="/ebanuxQr.svg" />
      </Head>
      <CssBaseline />
      {!isLoggin && (<ElevationScroll {...props}>
        <AppBar component="nav" sx={{ background: '#fff' }}>
          <Container>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', color: theme => theme.palette.text.primary }}>
              <Link href={{ pathname: !Boolean(userInfo) ? QR_TYPE_ROUTE : '/' }}>
                <Box sx={{ display: 'flex', cursor: 'pointer' }}>
                  <Box component="img" alt="EBANUX" src="/ebanuxQr.svg" sx={{ width: '40px' }} />
                  <Typography sx={{ my: 'auto', ml: '5px', fontSize: '25px', fontWeight: 'bold' }}>The QR Link</Typography>
                </Box>
              </Link>
              {router.query[PARAM_QR_TEXT] === undefined && (<>
                {isWide ? (<>
                  {!Boolean(userInfo) ? (
                    <Button
                      startIcon={<LoginIcon />}
                      onClick={handleLogin}
                      variant="contained"
                      sx={{ height: '28px', mr: '5px', my: 'auto' }}>
                      {'Login'}
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex' }}>
                      <Button
                        startIcon={router.pathname === '/' ? <QrCodeIcon /> : <FirstPageIcon />}
                        onClick={handleNavigation}
                        variant="outlined"
                        sx={{height: '28px', my: 'auto'}}>
                        {router.pathname === '/' ? 'Create QR' : 'Admin'}
                      </Button>
                      <Button
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        variant="contained"
                        sx={{ height: '28px', ml: '10px', my: 'auto' }}>
                        {'Logout'}
                      </Button>
                    </Box>
                  )}
                </>) : (<>
                  <IconButton
                    size="large"
                    aria-label="responsive-user-menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                  >
                    {!Boolean(userInfo) && (
                      <MenuItem key="loginMenuItem" onClick={handleLogin}>
                        <LoginIcon />
                        <Typography textAlign="center">{'Login'}</Typography>
                      </MenuItem>
                    )}
                    {Boolean(userInfo) && (
                      <MenuItem key="navigateMenuItem" onClick={handleNavigation}>
                        {router.pathname === '/' ? <QrCodeIcon /> : <FirstPageIcon />}
                        <Typography textAlign="center">{router.pathname === '/' ? 'Create QR' : 'Admin'}</Typography>
                      </MenuItem>
                    )}
                    {Boolean(userInfo) && <Divider/>}
                    {Boolean(userInfo) && (
                      <MenuItem key="logoutMenuItem" onClick={handleLogout}>
                        <LogoutIcon />
                        <Typography textAlign="center">{'Logout'}</Typography>
                      </MenuItem>
                    )}
                  </Menu>
                </>)}
              </>)}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>)}
      <Container sx={{ width: '100%' }}>
        <Box sx={{ height: '60px' }}/> {/* Aims to fill the header's gap */}
        <Box sx={{ p: 2, width: { sm: '100%', xs: 'calc(100% - 20px)' }, mx: 'auto', minHeight: 'calc(100vh - 110px)' }}>
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
