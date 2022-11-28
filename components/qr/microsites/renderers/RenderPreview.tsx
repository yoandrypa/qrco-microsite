import {TouchEvent, useEffect, useRef, useState} from "react";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import {styled} from "@mui/material/styles";

import {ColorTypes, FileType} from "../../types/types";
import RenderPreviewVideo from "./RenderPreviewVideo";
import RenderPreviewPdf from "./RenderPreviewPdf";
import {handleDownloadFiles} from "./helper";

interface RenderPreviewProps {
  handleClose: () => void;
  colors: ColorTypes;
  type: string;
  preview: FileType;
  position?: number;
  amount?: number;
  handleNext?: () => void;
  handlePrev?: () => void;
  isWide: boolean;
  isHeight?: boolean;
}

const IconBtn = styled(IconButton)(() => ({
  position: 'absolute', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgb(255 255 255 / 55%)'
}));

export default function RenderPreview({ handlePrev, handleNext, position, amount, isWide, isHeight, handleClose,
                                        colors, preview, type }: RenderPreviewProps) {
  const [full, setFull] = useState<boolean>(false);
  const [zoom, setZoom] = useState<boolean>(true);
  const [scroll, setScroll] = useState<number>(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const posic = useRef<number>(0);

  const wide = isWide && isHeight;

  const imageLoaded = () => { // @ts-ignore
    if (imgRef.current.clientWidth > imgRef.current.clientHeight) { // horizontal
      setScroll(1); // @ts-ignore
    } else if (imgRef.current.clientWidth < imgRef.current.clientHeight) { // vertical
      setScroll(-1);
    } else { // both
      setScroll(0);
    }
  };

  const touchEnd = (event: TouchEvent) => { // @ts-ignore
    if (amount !== undefined && amount > 1) { // @ts-ignore
      if (handlePrev !== undefined && event.target.x === 0 && event.target.x === posic.current) {
        handlePrev(); // @ts-ignore
      } else if (handleNext !== undefined && event.target.x === imgRef.current.x && event.target.x === posic.current) {
        handleNext();
      } // @ts-ignore
      posic.current = event.target.x;
    }
  }

  useEffect(() => {
    if (full) {
      setFull(false);
    }
  }, [isWide, isHeight]);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dialog onClose={handleClose} open={true} fullScreen={type === 'image' ? !wide || full : false}>
      <DialogContent sx={{
        maxWidth: isWide && !full ? '550px' : '100%',
        maxHeight: isWide ? 'calc(100% - 10px)' : 'unset',
        overflow: 'hidden',
        p: wide ? 1 : 0
      }}>
        {type === 'image' && (
          <>
            <Box sx={{
              position: !full ? (!isWide || !isHeight ? 'absolute' : 'unset') : 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              overflowX: ((isHeight && isWide) || isHeight) && scroll !== -1 ? 'auto' : 'hidden',
              overflowY: ((isHeight && isWide) || isWide) && scroll !== 1 ? 'auto' : 'hidden'
            }}>
              <Box ref={imgRef} component="img" alt="image" src={preview.content} onLoad={imageLoaded} onTouchEndCapture={touchEnd}
                   sx={{height: (isHeight && isWide) || isHeight ? '100%' : 'unset', width: isWide && !isHeight ? '100%' : 'unset'}}/>
            </Box>
            <>
              <Tooltip title="Close">
                <IconBtn sx={{top: '10px', left: '10px'}} onClick={handleClose}>
                  <CloseIcon />
                </IconBtn>
              </Tooltip>
              {wide && (
                <Tooltip title={full ? 'Exit full screen' : 'Full screen'}>
                  <IconBtn sx={{top: '50px', right: '10px'}} onClick={() => setFull((prev: boolean) => (!prev))}>
                    {!full ? <FullscreenIcon /> : <FullscreenExitIcon />}
                  </IconBtn>
                </Tooltip>
              )}
              <Tooltip title="Download">
                <IconBtn sx={{top: '10px', right: '10px'}} onClick={() => handleDownloadFiles(preview, type)}>
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
                <IconBtn sx={{bottom: (isHeight && isWide) ? '30px' : '10px', left: '10px'}} onClick={handlePrev}>
                  <ArrowBackIosNewIcon />
                </IconBtn>
                </Tooltip>
                <Tooltip title="Next">
                  <IconBtn sx={{bottom: (isHeight && isWide) ? '30px' : '10px', right: '10px'}} onClick={handleNext}>
                    <ArrowForwardIosIcon />
                  </IconBtn>
                </Tooltip>
              </>)}
            </>
          </>
        )}
        {type !== 'image' && (
          <Box sx={{p: 1}}>
            {type === 'video' && <RenderPreviewVideo content={preview.content} type={preview.type}/>}
            {type === 'pdf' && <RenderPreviewPdf content={preview.content} asDialog/>}
            <Button
              sx={{
                mt: 1,
                color: colors.p,
                background: preview.content,
                '&:hover': {color: colors.s, background: colors.p}
              }}
              variant="outlined"
              onClick={() => handleDownloadFiles(preview, type)}
              startIcon={<DownloadIcon/>}
            >
              {'Download'}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
