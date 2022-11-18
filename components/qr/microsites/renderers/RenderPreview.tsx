import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {handleDownloadFiles} from "./helper";
import DownloadIcon from "@mui/icons-material/Download";
import Dialog from "@mui/material/Dialog";
import {ColorTypes, FileType} from "../../types/types";
import RenderPreviewVideo from "./RenderPreviewVideo";
import RenderPreviewPdf from "./RenderPreviewPdf";

interface RenderPreviewProps {
  handleClose: () => void;
  colors: ColorTypes;
  type: string;
  preview: FileType;
  isWide: boolean;
}

export default function RenderPreview({isWide, handleClose, colors, preview, type}: RenderPreviewProps) {
  return (
    <Dialog onClose={handleClose} open={true}>
      <DialogContent sx={{ maxWidth: isWide ? '550px' : 'calc(100% - 10px)', overflow: 'hidden' }}>
        {type === 'image' && <Box sx={{ overflow: 'auto', width: 'calc(100% + 13px)' }}>
          <Box sx={{ maxWidth: '500px' }} component="img" alt="image" src={preview.content} />
        </Box>}
        {type === 'video' && <RenderPreviewVideo content={preview.content} type={preview.type} />}
        {type === 'pdf' && <RenderPreviewPdf content={preview.content} asDialog />}
        <Box sx={{ textAlign: 'center' }}>
        <Button
          sx={{ mt: '10px', color: colors.p, background: colors.s, '&:hover': {color: colors.s, background: colors.p} }}
          variant="outlined"
          onClick={() => handleDownloadFiles(preview, type)}
          startIcon={<DownloadIcon />}
        >
          {'Download'}
        </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
