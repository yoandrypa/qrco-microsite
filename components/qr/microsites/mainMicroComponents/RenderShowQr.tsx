import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {memo} from 'react';

interface RenderQrProps {
  handlePreviewQr: () => void;
  qrImg: any;
  height: string;
  iframed: boolean;
}

const downloadAsSVG = async (imageSrc: any) => {
  let imageURL:string;

  if (imageSrc.content) {
    const image = await fetch(imageSrc.content);
    const imageBlog = await image.blob();
    imageURL = URL.createObjectURL(imageBlog);
  } else {
    const imageBlog = new Blob([imageSrc], {type : 'image/svg+xml'});
    imageURL = URL.createObjectURL(imageBlog);
  }

  const element = document.createElement('a');
  element.href = imageURL;
  element.download = 'qrLynk.svg';
  document.body.appendChild(element);
  element.click();
  element.remove();
};

function RenderShowQr({handlePreviewQr, qrImg, height, iframed}: RenderQrProps) {

  // noinspection JSDeprecatedSymbols
  return (
    <Box sx={{width: '100%', p: 2, height: `calc(${height} - 5px)`, background: '#fff'}}>
      <Box sx={{ translate: '0 calc(50% - 135px)', textAlign: 'center'}}>
        <Box component="img" src="logo.svg" sx={{width: '70%', mb: '45px'}} />
        <Box
          component="img"
          alt="qrLynkImage"
          src={qrImg.content || `data:image/svg+xml;base64,${btoa(qrImg)}`}
          sx={{
            border: 'solid 1px #d7d7d7',
            borderRadius: '4px',
            position: 'relative'
          }}
        />
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', mt: 2}}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handlePreviewQr}>Back</Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={async () => downloadAsSVG(qrImg)}>Download as SVG</Button>
        </Box>
      </Box>
      {iframed && (
        <Typography sx={{position: 'absolute', bottom: '20px', textAlign: 'center', color: theme => theme.palette.text.disabled}}>
          {'You are seeing the embedded version of this app. Some widgets might differ from their final functionality. Be advised.'}
        </Typography>
      )}
    </Box>
  );
}

const notIf = (current: RenderQrProps, next: RenderQrProps) => current.qrImg === next.qrImg;

export default memo(RenderShowQr, notIf);
