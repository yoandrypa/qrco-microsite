import {ReactNode, useEffect, useState} from "react";
import Fab from '@mui/material/Fab';
import ShareIcon from '@mui/icons-material/Share';
import Box from "@mui/material/Box";
import {ColorTypes} from "../types/types";
import RenderIcon from "../helperComponents/RenderIcon";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

import {alpha} from "@mui/material/styles";

import {DEFAULT_COLORS} from "../constants";
import {download} from "../../../handlers/storage";
import Notifications from "../helperComponents/Notifications";
import {RWebShare} from "react-web-share";
import {useMediaQuery} from "@mui/material";
import capitalize from "@mui/utils/capitalize";

interface MicrositesProps {
  children: ReactNode;
  type?: string;
  colors?: ColorTypes;
  url?: string;
  backgndImg?: { Key: string; }[];
  foregndImg?: { Key: string; }[];
  foregndImgType?: string;
  isSample?: boolean;
}

interface DimsProps {
  parentWidth: number; parentHeight: number;
}

export default function MainMicrosite({children, colors, url, type, backgndImg, foregndImg, foregndImgType, isSample}: MicrositesProps) {
  const [backImg, setBackImg] = useState<any>(undefined);
  const [foreImg, setForeImg] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [containerDimensions, setContainerDimensions] = useState<DimsProps | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

  const isWide: boolean = useMediaQuery("(min-width:490px)", {noSsr: true});

  const getFiles = async (key: string, item: string) => {
    try {
      const fileData = await download(key, isSample);
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
    if (backgndImg && !backImg) {
      setLoading(true);
      getFiles(backgndImg[0].Key, 'backgndImg');
    }
    if (foregndImg && !foreImg) {
      setLoading(true);
      getFiles(foregndImg[0].Key, 'foregndImg');
    }
    if (window.top !== window) { // that is to say we are iframed!!!
      // @ts-ignore
      window.top.postMessage( // @ts-ignore
        JSON.stringify({ready: true}), process.env.REACT_APP_QRCO_URL
      );
    }

    const handler = (event: any) => {
      if (event.origin === process.env.REACT_APP_QRCO_URL) {
        try {
          const data = JSON.parse(event.data)
          if (data.parentWidth !== undefined) {
            const {parentWidth, parentHeight} = data;
            setContainerDimensions({parentWidth, parentHeight});
            const width = +(parentWidth.endsWith('px') ? parentWidth.slice(0, -2) : parentWidth);
            const percent = Math.ceil(width * 100 / 475);
            if (/Chrome/.test(navigator.userAgent)) { // @ts-ignore
              document.body.style.zoom = percent / 100; // zoom is not a standard but works fine for Chrome
            } else {
              document.body.style.transform = `scale(${percent / 100})`;
              document.body.style.transformOrigin = '0 0';
              document.body.style.width = `${100 + percent}%`;
            }
          }
        } catch (e) {
          console.error(e)
        }
      }
    }

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if ((backImg !== undefined && !foregndImg) || (foreImg !== undefined && !backgndImg) || (foreImg !== undefined && backImg !== undefined)) {
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
            src={backImg.content}
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
        background: '#fff',
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
              src={backImg.content}
              sx={{width: '475px', height: '200px', position: 'absolute', right: 0}}/>
          )}
          {url !== undefined && (
            <RWebShare
              data={{text: "(Shared from theqr.link)", url: url, title: "The QR Link",}}
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
              src={foreImg.content}
              sx={{
                width: '100px',
                height: '100px',
                borderRadius: foregndImgType === undefined || foregndImgType === 'circle' ? '50px' : foregndImgType === 'smooth' ? '20px' : '3px',
                border: 'solid 4px #fff'
              }}
            />
          </Box>
        )}
        <Box sx={{
          width: '100%',
          background: `linear-gradient(rgba(0,0,0,0), ${alpha(colors?.s || DEFAULT_COLORS.s, 0.25)})`,
          height: '250px',
          position: 'absolute',
          bottom: 0
        }}
        />
        <Box sx={{
          width: '100%',
          minHeight: !containerDimensions ?
            `calc(100vh - ${foreImg ? 256 : 226}px)` :
            `calc(${containerDimensions.parentHeight} + ${foreImg ? 202 : 232}px)`,
          mt: foreImg ? '30px' : 0
        }}>
          {children}
        </Box>
        {type !== undefined && (
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '20px',
            color: colors?.s || DEFAULT_COLORS.s
          }}>
            <RenderIcon icon={type} enabled color={colors?.s || DEFAULT_COLORS.s}/>
            <Typography sx={{ml: '5px'}}>
              {(type !== 'video' ? (type !== 'vcard+' ? (type !== 'link' ? capitalize(type) : 'Link-in-Bio') : 'vCard Plus') : 'Videos')}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
