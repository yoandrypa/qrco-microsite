import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

import {FileType} from "../../types/types";
import RenderPreviewVideo from "./RenderPreviewVideo";
import RenderPreviewPdf from "./RenderPreviewPdf";
import {handleDownloadFiles} from "./helper";
import RenderPreviewImage from "./RenderPreviewImage";

interface RenderPreviewProps {
  handleClose: () => void;
  type: string;
  preview: FileType | string;
  position?: number;
  amount?: number;
  handleNext?: () => void;
  handlePrev?: () => void;
  isWide: boolean;
  isHeight?: boolean;
  sx: object;
}

export default function RenderPreview({ handlePrev, handleNext, position, amount, isWide, isHeight, handleClose,
                                        preview, type, sx }: RenderPreviewProps) {
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
                type={!isString ? preview.type : 'VIDEO'}/>
            )}
            {type === 'pdf' && <RenderPreviewPdf content={isString ? preview : preview.content} asDialog/>}
            <Button
              sx={{
                mt: 1,
                color: theme => theme.palette.primary.main,
                background: isString ? preview : preview.content,
                '&:hover': {color: theme => theme.palette.secondary.main, background: theme => theme.palette.primary.main},
                ...sx
              }}
              variant="outlined"
              onClick={() => { if (typeof preview !== 'string') {handleDownloadFiles(preview, type)}} }
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
