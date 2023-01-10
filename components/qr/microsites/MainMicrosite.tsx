import {ReactNode, useEffect, useMemo, useState} from "react";
import Fab from '@mui/material/Fab';
import ShareIcon from '@mui/icons-material/Share';
import Box from "@mui/material/Box";
import RenderIcon from "../helperComponents/RenderIcon";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import capitalize from "@mui/utils/capitalize";
import {Divider, useMediaQuery} from "@mui/material";
import {alpha} from "@mui/material/styles";
import {download} from "../../../handlers/storage";
import {RWebShare} from "react-web-share";
import {handleFont} from "./renderers/helper";

import dynamic from "next/dynamic";
import {useTheme} from "@mui/system";
import {DEFAULT_COLORS} from "../constants";

const Notifications = dynamic(() => import('../helperComponents/Notifications'));

interface MicrositesProps {
  children: ReactNode; data: any;
}

interface DimsProps {
  parentWidth: string; parentHeight: string;
}

export default function MainMicrosite({children, data}: MicrositesProps) {
  const [backImg, setBackImg] = useState<any>(undefined);
  const [foreImg, setForeImg] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [containerDimensions, setContainerDimensions] = useState<DimsProps | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

  const isWide: boolean = useMediaQuery("(min-width:490px)", {noSsr: true});
  const theming = useTheme();

  const getFiles = async (key: string, item: string) => {
    try {
      const fileData = await download(key, data.isSample);
      if (item === 'backgndImg') {
        setBackImg(fileData);
      } else {
        setForeImg(fileData);
      }
    } catch {
      if (item === 'backgndImg') {
        setBackImg(null);
      } else {
        setForeImg(null);
      }
      setError(true);
    }
  }

  const qrType = useMemo(() => data.type || data.qrType, []); // eslint-disable-line react-hooks/exhaustive-deps
  const isBorder = useMemo(() => data.layout?.includes('Border'), [data.layout]);
  const isInverse = useMemo(() => data.layout?.includes('Inverse'), [data.layout]);
  const isSoft = useMemo(() => data.layout?.toLowerCase().includes('soft'), [data.layout]);

  const isScrolling = containerDimensions && isBorder && window ? window.visualViewport?.width !== window.innerWidth : false;

  useEffect(() => {
    if (data.backgndImg) {
      setLoading(true);
      if (Array.isArray(data.backgndImg)) {
        getFiles(data.backgndImg[0].Key, 'backgndImg');
      } else {
        setBackImg(data.backgndImg);
      }
    } else if (backImg) {
      setBackImg(undefined);
    }

    if (data.foregndImg) {
      setLoading(true);
      if (Array.isArray(data.foregndImg)) {
        getFiles(data.foregndImg[0].Key, 'foregndImg');
      } else {
        setForeImg(data.foregndImg);
      }
    } else if (foreImg) {
      setForeImg(undefined);
    }
  }, [data.backgndImg, data.foregndImg]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (window.top !== window) {
      const width = window.innerWidth - 4;
      setContainerDimensions({parentWidth: `${width}px`, parentHeight: `${window.innerHeight}px`});
      const percent = Math.ceil(width * 100 / 475);
      if (/Chrome/.test(navigator.userAgent)) { // @ts-ignore
        document.body.style.zoom = percent / 100; // zoom is not a standard but works fine for Chrome
      } else {
        document.body.style.transform = `scale(${percent / 100})`;
        document.body.style.transformOrigin = '0 0';
        document.body.style.width = `${100 + percent}%`;
      }
      // @ts-ignore
      window.top.postMessage(JSON.stringify({ready: true}), process.env.REACT_APP_QRCO_URL);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if ((backImg !== undefined && !data.foregndImg) || (foreImg !== undefined && !data.backgndImg) || (foreImg !== undefined && backImg !== undefined)) {
      setLoading(false);
    }
  }, [backImg, foreImg]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {error && (
        <Notifications
          title="Something went wrong"
          message="Failed loading the microsite's data"
          vertical="bottom"
          horizontal="center"
          onClose={() => setError(false)}/>
      )}
      {loading && (
        <Box sx={{display: 'flex', position: 'fixed', width: '100%', justifyContent: 'center', zIndex: 10, bottom: '35px'}}>
          <CircularProgress size={20} sx={{mr: '5px', color: theme => theme.palette.primary.main}}/>
          <Typography sx={{...handleFont(data, 'm'), fontSize: '17px', color: theme => theme.palette.primary.main}}>
            {'Loading data. Please wait...'}
          </Typography>
        </Box>
      )}
      {!containerDimensions && (<Box sx={{position: 'fixed', p: 0, m: 0, width: '100%', height: '270px',
        background: theme => !backImg ? alpha(theme.palette.primary.main, 0.9) : 'none'
      }}>
        {backImg && (
          <Box component="img" alt="backgimage" src={backImg.content || backImg}
            sx={{
              filter: 'opacity(0.87) contrast(0.75) blur(5px)',
              width: 'calc(100% + 20px)',
              maxHeight: '100%',
              objectFit: 'cover',
              position: 'fixed',
              top: '-185px',
              left: '-10px'
            }}
          />
        )}
      </Box>)}
      <Box sx={{
        top: 0,
        border: !containerDimensions ? theme => `solid 1px ${theme.palette.text.disabled}` : 'none',
        boxShadow: !containerDimensions ? '0px 7px 25px 0px rgb(0 0 0 / 50%)' : 'none',
        position: 'relative',
        backgroundColor: !data.backgroundType || data.backgroundType === 'single' ? (data.backgroundColor || '#fff') : '#fff',
        backgroundImage: !data.backgroundType ? 'unset' : data.backgroundType === 'gradient' ?
          (`linear-gradient(${data.backgroundDirection || '180deg'}, ${data.backgroundColor || DEFAULT_COLORS.p}, ${data.backgroundColorRight || DEFAULT_COLORS.s})`) : '#fff',
        left: '50%',
        transform: 'translate(-50%, 0)',
        maxWidth: isWide ? '475px' : '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}>
        <Box sx={{ width: '100%', minHeight: `calc(100vh - ${(Boolean(qrType) ? 29 : 2) + (!isBorder ? 0 : 10)}px)`, background: 'transparent'}}>
          <Box sx={{height: '200px'}}>
            <Box sx={{
              backgroundClip: 'padding-box !important', width: '475px', left: isScrolling && foreImg ? '-2px' : 'unset',
              height: `${!isInverse ? 200 : 228}px`, position: 'fixed', right: 0,
              borderTop: !isBorder ? 'unset' : 'solid 10px transparent',
              borderLeft: !isBorder ? 'unset' : 'solid 10px transparent',
              borderRight: !isBorder ? 'unset' : 'solid 10px transparent',
              borderRadius: isBorder || isSoft ? `${isBorder ? '24px 24px' : '0 0'} ${isSoft ? '24px 24px' : '0 0'}` : 'unset',
              background: theme => !backImg ? theme.palette.primary.main : 'unset',
              clipPath: !isInverse ? 'unset' : (!isBorder ? 'path("M 0 0 H 475 V 230 Q 465 201 440 200 L 35 200 Q 8 202 0 230 z")' :
                'path("M 10 0 H 465 V 230 Q 465 201 440 200 L 35 200 Q 8 202 10 230 z")')
            }} component={backImg ? 'img' : 'div'} alt="bannerImg" src={backImg?.content || backImg}/>
            {data.shortlinkurl !== undefined && (
              <RWebShare data={{text: "(Shared from theqr.link)", url: data.shortlinkurl, title: "The QR Link"}} onClick={() => {
                // TODO
              }}>
                <Fab
                  size="small" color="secondary" aria-label="add"
                  sx={{position: 'fixed', top: 147, right: 16, color:  theme => theme.palette.secondary.main,
                    backgroundColor:  theme => theme.palette.primary.main, border: 'solid 3px #fff',
                    '&:hover': {color:  theme => theme.palette.primary.main, background: theme => theme.palette.secondary.main}
                  }}>
                  <ShareIcon/>
                </Fab>
              </RWebShare>
            )}
          </Box>
          {(!data.backgroundType || (data.backgroundType === 'single' && (!data.backgroundColor || ['#fff', '#ffffff'].includes(data.backgroundColor)))) && (
            <Box sx={{
              width: '100%',
              background: theme => `linear-gradient(rgba(0,0,0,0), ${alpha(theme.palette.secondary.main, 0.25)})`,
              height: '250px',
              position: 'absolute',
              bottom: 0
            }} />
          )}
          <Box sx={{
            width: '100%',
            minHeight: !containerDimensions ? `calc(100vh - ${(Boolean(qrType) ? 229 : 220) + (!isBorder ? 0 : 20)}px)` :
              `calc(${containerDimensions.parentHeight} + ${230 + (Boolean(qrType) ? 8 : 9) - (!isBorder ? 0 : 20)}px)`}}>
            {foreImg && (
              <Box sx={{width: '100%', textAlign: !data.layout || !data.layout.includes('Left') ? 'center' : 'unset'}}>
                <Box
                  component="img"
                  alt="foregimage"
                  src={foreImg.content || foreImg}
                  sx={{
                    ml: !data.layout || !data.layout.includes('Left') ? 'unset' : '20px',
                    transform: 'translate(0, -50px)',
                    width: '100px',
                    height: '100px',
                    borderRadius: data.foregndImgType === undefined || data.foregndImgType === 'circle' ? '50px' : data.foregndImgType === 'smooth' ? '20px' : '3px',
                    border: 'solid 4px #fff'
                  }}
                />
              </Box>
            )}
            <Box sx={{mt: Boolean(foreImg) ? '-70px' : 0, backgroundClip: 'padding-box !important',
              borderLeft: !isBorder ? 'unset' : 'solid 10px transparent',
              borderRight: !isBorder ? 'unset' : 'solid 10px transparent'}}>
              {children}
            </Box>
          </Box>
        </Box>
        {Boolean(qrType) && (
          <Box sx={{width: '100%'}}>
            <Divider sx={{mx: 2}} />
            <Box sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '20px',
              mb: !isBorder ? 0 : '10px',
              color: theme => theme.palette.secondary.main
            }}>
              <RenderIcon icon={qrType} enabled color={theming.palette.secondary.main}/>
              <Typography sx={{ml: '5px', ...handleFont(data, 'm'), fontSize: '17px'}}>
                {(qrType !== 'video' ? (qrType !== 'vcard+' ? (qrType !== 'link' ? capitalize(qrType) : 'Link-in-Bio') : 'vCard Plus') : 'Videos')}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export type {MicrositesProps};
