import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

import {ColorTypes, FileType} from "../../types/types";
import RenderPreviewVideo from "./RenderPreviewVideo";
import RenderPreviewPdf from "./RenderPreviewPdf";
import {handleDownloadFiles} from "./helper";
import RenderPreviewImage from "./RenderPreviewImage";

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

export default function RenderPreview({ handlePrev, handleNext, position, amount, isWide, isHeight, handleClose,
                                        colors, preview, type }: RenderPreviewProps) {
  const wide = isWide && isHeight;

  return (
    <Dialog onClose={handleClose} open={true} fullScreen={type === 'image' ? !wide : false}>
      <DialogContent sx={{
        minWidth: isWide ? '550px' : '100%',
        minHeight: isWide ? 'calc(100% - 10px)' : 'unset',
        overflow: 'hidden',
        p: wide ? 1 : 0
      }}>
        {type === 'image' ? (
          <RenderPreviewImage isWide={isWide} type={type} preview={preview} handleClose={handleClose} amount={amount}
                              handlePrev={handlePrev} handleNext={handleNext} position={position} isHeight={isHeight} />
        ) : (
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
