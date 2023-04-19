import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import {handleDownloadFiles} from "./helper";
import DownloadIcon from "@mui/icons-material/Download";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {TouchEvent, useEffect, useRef, useState} from "react";
import {FileType} from "../../types/types";

interface Pos { x: number; y: number; }
interface Dims { width: number; height: number; }
interface ImageProps {
  isWide: boolean;
  isHeight?: boolean;
  amount?: number;
  type: string;
  preview: FileType | string;
  handleNext?: () => void;
  handlePrev?: () => void;
  handleClose: () => void;
  position?: number;
}

const IconBtn = styled(IconButton)(() => ({
  position: 'absolute', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgb(255 255 255 / 50%)',
  '&:hover': {backgroundColor: 'rgb(255 255 255 / 75%)'}
}));

export default function RenderPreviewImage({position, amount, isWide, isHeight, preview, type, handlePrev, handleNext, handleClose}: ImageProps) {
  const [zoom, setZoom] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);
  const posic = useRef<number>(-1);
  const imgRef = useRef<HTMLImageElement>(null);
  const dimensions = useRef<Dims | null>(null);
  const initial = useRef<Pos>({x:-1, y:-1});
  const direction = useRef<number>(0);

  const calcDimensions = () => {
    if (imgRef.current) {
      const container = imgRef.current.parentElement;
      dimensions.current = { // @ts-ignore
        width: container.offsetWidth, height: container.offsetHeight
      };
    }
  };

  const handleZoom = () => {
    setZoom((prev: boolean) => !prev);
  }

  const imageLoaded = () => {
    calcDimensions(); // @ts-ignore
    if (imgRef.current.clientWidth > imgRef.current.clientHeight) { // horizontal
      setScroll(1); // @ts-ignore
    } else if (imgRef.current.clientWidth < imgRef.current.clientHeight) { // vertical
      setScroll(-1);
    } else { // both
      setScroll(0);
    }
  };

  const touchEnd = (event: TouchEvent) => { // @ts-ignore
    if (amount !== undefined && amount > 1) {
      if (zoom) { // @ts-ignore
        if (handlePrev !== undefined && event.target.x === 0 && event.target.x === posic.current) {
          handlePrev(); // @ts-ignore
        } else if (handleNext !== undefined && event.target.x === imgRef.current.x && event.target.x === posic.current) {
          handleNext();
        }
      } else if (handleNext !== undefined && direction.current === 1) {
        handleNext();
      } else if (handlePrev !== undefined && direction.current === -1) {
        handlePrev();
      } // @ts-ignore
      posic.current = event.target.x;
    }
  };

  const handleMove = (event: TouchEvent) => {
    if (event.touches[0].clientX > initial.current.x) {
      direction.current = -1;
    } else if (event.touches[0].clientX < initial.current.x) {
      direction.current = 1;
    } else {
      direction.current = 0;
    }
  }

  const handleTouchStart = (event: TouchEvent) => {
    initial.current = {x: event.touches[0].clientX, y: event.touches[0].clientY};
  }

  useEffect(() => {
    posic.current = -1;
  }, [preview]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('resize', calcDimensions);
    return () => window.removeEventListener('resize', calcDimensions);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box sx={{
        position: !isWide || !isHeight ? 'absolute' : 'unset',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        maxHeight: isWide && isHeight ? 'calc(100vh - 85px)' : 'unset',
        overflowX: scroll !== -1 ? (((isHeight && isWide) || isHeight) && scroll !== -1 ? 'auto' : 'hidden') : 'auto',
        overflowY: ((isHeight && isWide) || isWide) && scroll !== 1 ? 'auto' : 'hidden'
      }}>
        <Box
          ref={imgRef} component="img" alt="image" src={typeof preview === 'string' ? preview : preview.content} onLoad={imageLoaded}
          onTouchEndCapture={touchEnd} onDoubleClick={handleZoom} onTouchMove={handleMove} onTouchStart={handleTouchStart}
          sx={{
            position: isWide ? "unset" : "absolute",
            top: isWide ? "unset" : "50%",
            transform: isWide ? "unset" : "translate(0, -50%)",
            height: zoom ? ((isHeight && isWide) || isHeight ? '100%' : 'unset') : 'unset',
            width: isWide ? (zoom ? 'unset' : '100%') : `${zoom ? 'unset' : `${dimensions.current ? `${dimensions.current.width}px` : '100%'}`}`
          }}/>
      </Box>
      <>
        <Tooltip title="Close">
          <IconBtn sx={{top: '10px', right: '10px'}} onClick={handleClose}>
            <CloseIcon />
          </IconBtn>
        </Tooltip>
        <Tooltip title={zoom ? 'Zoom in' : 'Zoom out'}>
          <IconBtn sx={{top: '50px', left: '10px'}} onClick={handleZoom}>
            {zoom ? <ZoomInMapIcon /> : <ZoomOutMapIcon />}
          </IconBtn>
        </Tooltip>
        <Tooltip title="Download">
          <IconBtn sx={{top: '10px', left: '10px'}} onClick={() => {
            if (typeof preview !== 'string') { handleDownloadFiles(preview, type); }
          }}>
            <DownloadIcon />
          </IconBtn>
        </Tooltip>
        {amount !== undefined && amount > 1 && (<>
          <Typography sx={{
            position: 'absolute',
            top: '10px',
            left: 'calc(50% - 10px)',
            backgroundColor: 'rgb(255 255 255 / 55%)',
            px: '5px',
            fontSize: 'smaller'
          }}>{`${((position || 0) + 1)}/${amount}`}</Typography>
          <Tooltip title="Previous">
            <IconBtn sx={{bottom: (isHeight && isWide) ? (zoom ? '30px' : '15px') : '10px', left: '10px'}} onClick={handlePrev}>
              <ArrowBackIosNewIcon />
            </IconBtn>
          </Tooltip>
          <Tooltip title="Next">
            <IconBtn sx={{bottom: (isHeight && isWide) ? (zoom ? '30px' : '15px') : '10px', right: '10px'}} onClick={handleNext}>
              <ArrowForwardIosIcon />
            </IconBtn>
          </Tooltip>
        </>)}
      </>
    </>
  );
}
