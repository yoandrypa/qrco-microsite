import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import {ColorTypes, FileType} from "../../types/types";
import RenderPreviewVideo from "./RenderPreviewVideo";
import RenderPreviewPdf from "./RenderPreviewPdf";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import {handleDownloadFiles} from "./helper";
import Typography from "@mui/material/Typography";

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

export default function RenderPreview({
                                        handlePrev,
                                        handleNext,
                                        position,
                                        amount,
                                        isWide,
                                        isHeight,
                                        handleClose,
                                        colors,
                                        preview,
                                        type
                                      }: RenderPreviewProps) {
  return (
    <Dialog onClose={handleClose} open={true} fullScreen={type === 'image' ? !isWide || !isHeight : false}>
      <DialogContent sx={{maxWidth: isWide ? '550px' : '100%', overflow: 'hidden', p: isWide && isHeight ? 1 : 0}}>
        {type === 'image' && (
          <>
            <Box sx={{
              position: !isWide || !isHeight ? 'absolute' : 'unset',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              overflowX: (isHeight && isWide) || isHeight ? 'auto' : 'hidden',
              overflowY: (isHeight && isWide) || isWide ? 'auto' : 'hidden'
            }}>
              <Box component="img" alt="image" src={preview.content} sx={{
                height: (isHeight && isWide) || isHeight ? '100%' : 'unset',
                width: isWide && !isHeight ? '100%' : 'unset'
              }}/>
            </Box>
            <>
              <IconButton sx={{position: 'absolute', top: '10px', left: '10px'}} onClick={handleClose}>
                <CloseIcon sx={{backgroundColor: 'rgb(255 255 255 / 55%)', borderRadius: '50%'}}/>
              </IconButton>
              <IconButton sx={{position: 'absolute', top: '10px', right: '10px'}}
                          onClick={() => handleDownloadFiles(preview, type)}>
                <DownloadIcon sx={{backgroundColor: 'rgb(255 255 255 / 55%)', borderRadius: '50%'}}/>
              </IconButton>
              {amount !== undefined && amount > 1 && (<>
                <Box></Box>
                <Typography sx={{
                  position: 'absolute',
                  top: '10px',
                  left: 'calc(50% - 10px)',
                  backgroundColor: 'rgb(255 255 255 / 55%)',
                  px: '5px',
                  fontSize: 'smaller'
                }}>{`${position}/${amount}`}</Typography>
                <IconButton sx={{position: 'absolute', bottom: (isHeight && isWide) ? '30px' : '10px', left: '10px'}}
                            onClick={handlePrev}>
                  <ArrowBackIosNewIcon sx={{backgroundColor: 'rgb(255 255 255 / 55%)', borderRadius: '50%'}}/>
                </IconButton>
                <IconButton sx={{position: 'absolute', bottom: (isHeight && isWide) ? '30px' : '10px', right: '10px'}}
                            onClick={handleNext}>
                  <ArrowForwardIosIcon sx={{backgroundColor: 'rgb(255 255 255 / 55%)', borderRadius: '50%'}}/>
                </IconButton>
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
