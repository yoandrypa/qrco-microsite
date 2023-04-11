import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useMediaQuery} from "@mui/material";
import {alpha} from "@mui/material/styles";
import dynamic from "next/dynamic";

import {download} from "../../../handlers/storage";
import {DimsProps, handleFont} from "./renderers/helper";
import {DEFAULT_COLORS} from "../constants";
import RenderSharer from "./mainMicroComponents/RenderSharer";
import RenderTop from "./mainMicroComponents/RenderTop";

const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));
const RenderFooter = dynamic(() => import("./mainMicroComponents/RenderFooter"));
const RenderMicrositeBackgroundImage = dynamic(() => import("./mainMicroComponents/RenderMicrositeBackgroundImage"));
const Notifications = dynamic(() => import("../helperComponents/Notifications"));
const RenderBackgroundIfWideScreen = dynamic(() => import("./mainMicroComponents/RenderBackgroundIfWideScreen"));
const CircularProgress = dynamic(() => import("@mui/material/CircularProgress"));
const RenderShowQr = dynamic(() => import("./mainMicroComponents/RenderShowQr"));

interface MicrositesProps {
  children: ReactNode; data: any;
}

export default function MainMicrosite({children, data}: MicrositesProps) {
  const [backImg, setBackImg] = useState<any>(undefined);
  const [foreImg, setForeImg] = useState<any>(undefined);
  const [qrCodeImg, setQrCodeImg] = useState<any>(undefined);
  const [showQr, setShowQr] = useState<boolean>(false);
  const [micrositeBackImage, setMicrositeBackImage] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [containerDimensions, setContainerDimensions] = useState<DimsProps | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);

  const isWide: boolean = useMediaQuery("(min-width:490px)", {noSsr: true});

  const counter = useRef<number>(0);
  const baseURL = useRef<string>('');

  const getFiles = async (key: string, item: string) => {
    try {
      const fileData = await download(key, data.isSample);
      if (item === 'qrCodeImg') {
        setQrCodeImg(fileData);
      } else if (item === 'micrositeBackImage') {
        setMicrositeBackImage(fileData);
      } else if (item === 'backgndImg') {
        setBackImg(fileData);
      } else {
        setForeImg(fileData);
      }
      counter.current -= 1;
    } catch {
      if (item === 'qrCodeImg') {
        setQrCodeImg(null);
      } else if (item === 'micrositeBackImage') {
        setMicrositeBackImage(null);
      } else if (item === 'backgndImg') {
        setBackImg(null);
      } else {
        setForeImg(null);
      }
      counter.current -= 1;
      setError(true);
    } finally {
      if (counter.current === 0) {
        setLoading(false);
      }
    }
  }

  const qrType = useMemo(() => data.type || data.qrType, []); // eslint-disable-line react-hooks/exhaustive-deps
  const isBorder = useMemo(() => data.layout?.includes('Border'), [data.layout]);

  useEffect(() => {
    if (!data.iframed && data.qrForSharing) {
      if (Array.isArray(data.qrForSharing)) {
        counter.current += 1;
        getFiles(data.qrForSharing[0].Key, 'qrCodeImg');
      }
    } else if (data.qrCodeImg) {
      setQrCodeImg(data.qrCodeImg);
    }

    if (data.backgndImg) {
      if (Array.isArray(data.backgndImg)) {
        setLoading(true);
        counter.current += 1;
        getFiles(data.backgndImg[0].Key, 'backgndImg');
      } else {
        setBackImg(data.backgndImg);
      }
    } else if (backImg) {
      setBackImg(undefined);
    }

    if (data.micrositeBackImage) {
      if (Array.isArray(data.micrositeBackImage)) {
        setLoading(true);
        counter.current += 1;
        getFiles(data.micrositeBackImage[0].Key, 'micrositeBackImage');
      } else {
        setMicrositeBackImage(data.micrositeBackImage);
      }
    } else if (micrositeBackImage) {
      setMicrositeBackImage(undefined);
    }

    if (data.foregndImg) {
      if (Array.isArray(data.foregndImg)) {
        setLoading(true);
        counter.current += 1;
        getFiles(data.foregndImg[0].Key, 'foregndImg');
      } else {
        setForeImg(data.foregndImg);
      }
    } else if (foreImg) {
      setForeImg(undefined);
    }
  }, [data.backgndImg, data.foregndImg, data.micrositeBackImage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    baseURL.current = window.location.href;

    if (window.top !== window) {
      const width = window.innerWidth - 4;
      const height = window.innerHeight;
      setContainerDimensions({parentWidth: `${width}px`, parentHeight: `${height}px`});
      const percent = Math.ceil(width * 100 / 475);

      if (/Chrome/.test(navigator.userAgent)) { // @ts-ignore
        document.body.style.zoom = percent / 100; // zoom is not a standard but works fine for Chrome
      } else {
        document.body.style.transform = 'scale(0.65)'; // `scale(${percent / 100})`
        document.body.style.transformOrigin = '0 0';
        document.body.style.width = `${100 + percent}%`; // `${100 + percent}%`
        document.body.style.height = `${height}px`;
      }
      // @ts-ignore
      window.top.postMessage(JSON.stringify({ready: true}), process.env.REACT_APP_QRCO_URL);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const minHeight = !containerDimensions ? '100vh' : '993px';
  const omitBanner = data.layout?.includes('banner') || data.layout?.includes('empty') || false;
  const width = isWide ? '475px' : '100%';

  const renderProfile = () => {
    let size = 100 as number; // aims to the default size

    switch (data.profileImageSize) {
      case 'small': { size = 70; break; }
      case 'medium': { size = 130; break; }
      case 'large': { size = 170; break; }
    }

    let translation = Math.floor(size / 2);
    let profileHeight = translation - 20;
    let mb = 'unset';

    if (data.profileImageVertical === 'upper') {
      profileHeight = 10;
      switch (data.profileImageSize) {
        case 'small': { translation += 35; break; }
        case 'medium': { translation += 65; break; }
        case 'large': { translation += 85; break; }
        default: { translation += 50; break; }
      }
    } else if (data.profileImageVertical === 'top') {
      profileHeight = 10;
      switch (data.profileImageSize) {
        case 'small': {
          translation += 155;
          if (omitBanner) { mb = '-124px'; }
          break;
        }
        case 'medium': {
          translation += 125;
          if (omitBanner) { mb = '-60px'; }
          break;
        }
        case 'large': {
          translation += 105;
          if (omitBanner) { mb = '-24px'; }
          break;
        }
        default: {
          translation += 140;
          if (omitBanner) { mb = '-92px'; }
          break;
        }
      }
    }

    let top = 'unset';
    let outTop = 'unset';
    let mt = Math.floor(size / 2);

    if (data.profileImageVertical === 'upper') {
      profileHeight = 0;
      outTop = '-15px';
      top = 'unset';
      switch (data.profileImageSize) {
        case 'small': { mt += 35; break;}
        case 'medium': { mt += 65; break; }
        case 'large': { mt += 85; break; }
        default: { mt = 84; break; }
      }
    } else if (data.profileImageVertical === 'top') {
      outTop = '-15px';
      profileHeight = 0;
      mt = 0;
      top = '-178px';
    }
    mt *= -1;

    const profileSX = {width: '100%', mb, mt: outTop, height: `${profileHeight}px`, textAlign: !data.layout || !data.layout.includes('Left') ? 'center' : 'unset'} as any;

    // if (showQr) {
    //   profileSX.background = '#fff';
    //   profileSX.mt = '-6px';
    // }

    return (
      <Box sx={profileSX}>
        <Box
          component="img"
          alt="foregimage"
          src={foreImg.content || foreImg}
          sx={{
            ml: !data.layout || !data.layout.includes('Left') ? 'unset' : '20px', border: 'solid 7px #fff',
            position: 'relative',
            mt: `${mt}px`,
            top,
            width: `${size}px`, height: `${size}px`,
            borderRadius: data.foregndImgType === undefined || data.foregndImgType === 'circle' ? `${size / 2}px` : data.foregndImgType === 'smooth' ? '20px' : '3px'
          }}
        />
      </Box>
    );
  }

  const isBackgroundImg = useMemo(() => data.backgroundType === 'image' && Boolean(micrositeBackImage), [data.backgroundType, micrositeBackImage]);

  const handleQrPreview = () => {
    setShowQr((prev: boolean) => !prev);
  };

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
      {!containerDimensions && <RenderBackgroundIfWideScreen backImg={backImg || micrositeBackImage} />}
      {isBackgroundImg && (
        <RenderMicrositeBackgroundImage micrositeBackImage={micrositeBackImage} data={data} height={minHeight} width={width} />
      )}
      {data.shortlinkurl !== undefined && (data.sharerPosition === 'downLeft' || data.sharerPosition === 'downRight') && (
        <RenderSharer baseURL={baseURL.current} height={minHeight} position={data.sharerPosition} topHeight={data.upperHeight} handlePreviewQr={qrCodeImg ? handleQrPreview : undefined} width={width} />
      )}
      <Box sx={{
        position: 'relative',
        top: 0, left: '50%', transform: 'translate(-50%, 0)',
        border: !containerDimensions ? theme => `solid 1px ${theme.palette.text.disabled}` : 'none',
        boxShadow: !containerDimensions ? '0px 7px 25px 0px rgb(0 0 0 / 50%)' : 'none',
        backgroundColor: !showQr ? (isBackgroundImg ? 'transparent' : (!data.backgroundType || data.backgroundType === 'single' ? (data.backgroundColor || '#fff') : '#fff')) : '#fff',
        backgroundImage: !showQr ? (isBackgroundImg ? undefined : (!data.backgroundType ? 'unset' : (data.backgroundType === 'gradient' ?
          (`linear-gradient(${data.backgroundDirection || '180deg'}, ${data.backgroundColor || DEFAULT_COLORS.s}, ${data.backgroundColorRight || DEFAULT_COLORS.p})`) : '#fff'))) : undefined,
        maxWidth: width, minHeight, overflowX: 'hidden'
      }}>
        <Box sx={{ minHeight: data.footerKind !== 'noFooter' ? `calc(${minHeight} - 30px)` : minHeight }}> {/* this is the content holder */}
          {!data.noInfoGradient && (!data.backgroundType || (data.backgroundType === 'single' && (!data.backgroundColor || ['#fff', '#ffffff'].includes(data.backgroundColor)))) && (
            <Box sx={{
              width: '100%',
              background: theme => `linear-gradient(rgba(0,0,0,0), ${alpha(theme.palette.secondary.main, 0.25)})`,
              height: '250px',
              position: 'absolute',
              bottom: 0
            }} />
          )}
          {data.shortlinkurl !== undefined && data.sharerPosition !== 'no' && data.sharerPosition !== 'downLeft' && data.sharerPosition !== 'downRight' && (
            <RenderSharer baseURL={baseURL.current} height={minHeight} position={data.sharerPosition} topHeight={data.upperHeight} handlePreviewQr={qrCodeImg ? handleQrPreview : undefined} />
          )}
          <RenderTop backImg={backImg} foreImg={foreImg} width={width} containerDimensions={containerDimensions}
                     isBorder={isBorder} omitBanner={omitBanner} data={data} />
          {foreImg && !data?.layout?.includes('empty') ? renderProfile() : <Box sx={{width: '37px', height: '5px'}} />}
          <Box sx={{
            backgroundClip: 'padding-box !important',
            borderLeft: !isBorder ? 'unset' : 'solid 10px transparent',
            borderRight: !isBorder ? 'unset' : 'solid 10px transparent'
          }}>
            {!showQr ? (<>
              {!data.layout?.includes('entire') ? children : (
                <RenderSectWrapper layout={data.layout} sx={{ml: '20px', mt: '20px', width: 'calc(100% - 37px)', pt: 2}}>{children}</RenderSectWrapper>
              )}
            </>) : <RenderShowQr qrImg={qrCodeImg} handlePreviewQr={handleQrPreview} data={data} />}
          </Box>
        </Box>
        {data.footerKind !== 'noFooter' && Boolean(qrType) && <RenderFooter data={data} qrType={qrType} isBorder={isBorder} />}
      </Box>
    </>
  );
}
