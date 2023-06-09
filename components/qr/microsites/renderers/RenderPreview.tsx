import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

import {handleDownloadFiles} from "./helper";
import {FileType} from "../../types/types";

import dynamic from "next/dynamic";

const RenderPreviewVideo = dynamic(() => import("./RenderPreviewVideo"));
const RenderPreviewPdf = dynamic(() => import("./RenderPreviewPdf"));
const RenderPreviewImage = dynamic(() => import("./RenderPreviewImage"));

interface RenderPreviewProps {
  handleClose: () => void;
  type: string;
  preview: FileType | string;
  position?: number;
  amount?: number;
  handleNext?: () => void;
  handlePrev?: () => void;
  handleFullScreen?: () => void;
  isWide: boolean;
  isHeight?: boolean;
  sx: object;
}

export default function RenderPreview(
  { handlePrev, handleNext, position, amount, isWide, isHeight, handleClose, preview, type, sx, handleFullScreen }
    : RenderPreviewProps
) {
  const wide = isWide && isHeight;
  const isString = typeof preview === 'string';

  return (
    <Dialog onClose={handleClose} open={true} fullScreen={type === 'image' ? !wide : false}>
      <DialogContent sx={{
        minWidth: isWide ? '550px' : '100%',
        minHeight: isWide ? 'calc(100% - 10px)' : 'unset',
        overflow: 'hidden',
        p: wide ? 1 : 0
      }}>
        {type === 'image' ? (
          <RenderPreviewImage
            isWide={isWide} type={type} preview={preview} handleClose={handleClose} amount={amount}
            handlePrev={handlePrev} handleNext={handleNext} position={position} isHeight={isHeight} />
        ) : (
          <Box sx={{p: 1}}>
            {type === 'video' && (
              <RenderPreviewVideo
                content={isString ? preview : preview.content}
                type={!isString ? preview.type : 'VIDEO'} />
            )}
            {type === 'pdf' && <RenderPreviewPdf content={isString ? preview : preview.content} />}
            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
              <Button
                sx={{
                  color: theme => theme.palette.primary.main,
                  background: isString ? preview : preview.content,
                  '&:hover': {
                    color: theme => theme.palette.secondary.main,
                    background: theme => theme.palette.primary.main
                  },
                  ...sx
                }}
                variant="outlined"
                onClick={() => handleDownloadFiles(preview, type)}
                startIcon={<DownloadIcon/>}
              >
                {'Download'}
              </Button>
              {type === 'pdf' && handleFullScreen !== undefined && (<Button
                sx={{color: theme => theme.palette.primary.main,
                  background: isString ? preview : preview.content,
                  '&:hover': {
                    color: theme => theme.palette.secondary.main,
                    background: theme => theme.palette.primary.main
                  },
                  ...sx
                }}
                variant="outlined"
                onClick={handleFullScreen}
              >
                {'Full screen'}
              </Button>)}
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
