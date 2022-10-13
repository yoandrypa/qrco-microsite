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
}

export default function RenderPreview({handleClose, colors, preview, type}: RenderPreviewProps) {
  return (
    <Dialog onClose={handleClose} open={true}>
      <DialogContent sx={{ maxWidth: '388px' }}>
        {type === 'image' && <Box sx={{ maxWidth: '340px' }} component="img" alt="image" src={preview.content} />}
        {type === 'video' && <RenderPreviewVideo content={preview.content} type={preview.type} />}
        {type === 'pdf' && <RenderPreviewPdf content={preview.content} asDialog />}
        <Button
          sx={{ mt: '10px', width: '100%', color: colors.p, background: colors.s, '&:hover': {color: colors.s, background: colors.p} }}
          variant="outlined"
          onClick={() => handleDownloadFiles(preview)}
          startIcon={<DownloadIcon />}
        >
          {'Download'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
