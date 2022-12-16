import {ReactNode, useEffect, useState} from "react";
import Fab from '@mui/material/Fab';
import ShareIcon from '@mui/icons-material/Share';
import Box from "@mui/material/Box";
import RenderIcon from "../helperComponents/RenderIcon";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import capitalize from "@mui/utils/capitalize";
import {useMediaQuery} from "@mui/material";
import {alpha} from "@mui/material/styles";

import {ColorTypes} from "../types/types";
import {DEFAULT_COLORS} from "../constants";
import {download} from "../../../handlers/storage";
import {RWebShare} from "react-web-share";
import {getColors} from "./renderers/helper";

import dynamic from "next/dynamic";

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

  const colors = getColors(data) as ColorTypes;

  const isWide: boolean = useMediaQuery("(min-width:490px)", {noSsr: true});

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
      const width = window.innerWidth;
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

  const qrType = data.type || data.qrType;

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
        <Box sx={{
          display: 'flex',
          position: 'fixed',
          width: '100%',
          justifyContent: 'center',
          zIndex: 10,
          bottom: '45px'
        }}>
          <CircularProgress size={20} sx={{mr: '5px', color: colors?.p || DEFAULT_COLORS.p}}/>
          <Typography sx={{fontSize: 'small', color: theme => theme.palette.text.disabled}}>
            {'Loading data. Please wait...'}
          </Typography>
        </Box>
      )}
      <Box sx={{
        position: 'fixed',
        p: 0,
        m: 0,
        width: '100%',
        height: '270px',
        background: !backImg ? alpha(colors?.p || DEFAULT_COLORS.p, 0.9) : 'none'
      }}>
        {backImg && (
          <Box
            component="img"
            alt="backgimage"
            src={backImg.content || backImg}
            sx={{
              filter: 'opacity(0.87) contrast(0.75) blur(5px)',
              width: 'calc(100% + 20px)',
              maxHeight: '100%',
              objectFit: 'cover',
              position: 'fixed',
              top: '-185px',
              left: '-10px'
            }}/>
        )}
      </Box>
      <Box sx={{
        top: 0,
        border: !containerDimensions ? theme => `solid 1px ${theme.palette.text.disabled}` : 'none',
        boxShadow: !containerDimensions ? '0px 7px 25px 0px rgb(0 0 0 / 50%)' : 'none',
        position: 'relative',
        backgroundColor: !data.backgroundType || data.backgroundType === 'single' ? (data.backgroundColor || '#fff') : '#fff',
        backgroundImage: !data.backgroundType ? 'unset' : data.backgroundType === 'gradient' ?
          (`linear-gradient(${data.backgroundDirection || '180deg'}, ${data.backgroundColor || '#0f4d8c'}, ${data.backgroundColorRight || '#99c4f0'})`) : '#fff',
        left: '50%',
        transform: 'translate(-50%, 0)',
        maxWidth: isWide ? '475px' : '100%',
        overflowX: 'hidden'
      }}>
        <Box sx={{
          width: '475px',
          height: '200px',
          background: !backImg && colors ? colors.p : 'none'
        }}>
          {backImg && (
            <Box
              component="img"
              alt="backgimage"
              src={backImg.content || backImg}
              sx={{width: '475px', height: '200px', position: 'absolute', right: 0}}/>
          )}
          {data.shortlinkurl !== undefined && (
            <RWebShare
              data={{text: "(Shared from theqr.link)", url: data.shortlinkurl, title: "The QR Link"}}
              onClick={() => {
                //TODO
              }}
            >
              <Fab
                size="small" color="secondary" aria-label="add"
                sx={{
                  position: 'absolute',
                  top: 147,
                  right: 16,
                  color: colors?.s || DEFAULT_COLORS.s,
                  backgroundColor: colors?.p || DEFAULT_COLORS.p,
                  border: 'solid 3px #fff',
                  '&:hover': {color: colors?.p || DEFAULT_COLORS.p, background: colors?.s || DEFAULT_COLORS.s}
                }}>
                <ShareIcon/>
              </Fab>
            </RWebShare>
          )}
        </Box>
        {foreImg && (
          <Box sx={{width: '100%', position: 'absolute', top: '150px', textAlign: 'center'}}>
            <Box
              component="img"
              alt="foregimage"
              src={foreImg.content || foreImg}
              sx={{
                width: '100px',
                height: '100px',
                borderRadius: data.foregndImgType === undefined || data.foregndImgType === 'circle' ? '50px' : data.foregndImgType === 'smooth' ? '20px' : '3px',
                border: 'solid 4px #fff'
              }}
            />
          </Box>
        )}
        {(!data.backgroundType || (data.backgroundType === 'single' && (!data.backgroundColor || ['#fff', '#ffffff'].includes(data.backgroundColor)))) && (
          <Box sx={{
            width: '100%',
            background: `linear-gradient(rgba(0,0,0,0), ${alpha(colors?.s || DEFAULT_COLORS.s, 0.25)})`,
            height: '250px',
            position: 'absolute',
            bottom: 0
          }} />
        )}
        <Box sx={{
          width: '100%',
          minHeight: !containerDimensions ?
            `calc(100vh - ${foreImg ? 256 : 226}px)` :
            `calc(${containerDimensions.parentHeight} + ${foreImg ? 202 : 233}px)`,
          mt: foreImg ? '30px' : 0
        }}>
          {children}
        </Box>
        {Boolean(qrType) && (
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '20px',
            color: colors?.s || DEFAULT_COLORS.s
          }}>
            <RenderIcon icon={qrType} enabled color={colors?.s || DEFAULT_COLORS.s}/>
            <Typography sx={{ml: '5px'}}>
              {(qrType !== 'video' ? (qrType !== 'vcard+' ? (qrType !== 'link' ? capitalize(qrType) : 'Link-in-Bio') : 'vCard Plus') : 'Videos')}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export type {MicrositesProps};
