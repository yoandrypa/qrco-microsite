import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {memo, useEffect, useState} from 'react';
import {handleButtons, handleFont} from "../renderers/helper";
import {useTheme} from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Notifications from "../../helperComponents/Notifications";

interface RenderQrProps {
  qrImg: any;
  data: any;
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

function RenderShowQr({qrImg, data}: RenderQrProps) {
  const [url, setURL] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const theme = useTheme();

  useEffect(() => {
    if (window) {
      const index = data.shortlinkurl.lastIndexOf('/');
      if (index !== -1) {
        const {origin} = window.location;
        setURL(`${origin}${!origin.endsWith('/') ? '/' : ''}${data.shortlinkurl.slice(index + 1)}`);
      } else {
        setURL(window.location.href);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // noinspection JSDeprecatedSymbols
  return (
    <Box sx={{width: '100%', p: 2, background: '#fff'}}>
      <Box sx={{textAlign: 'center'}}>
        <Box component="img" src="/logo.svg" sx={{width: '130px', mt: 2, mb: 1, py: '5px', px: 3}} />
        {url.length > 0 && (
          <Box sx={{display: 'flex', width: '100%', borderRadius: '4px 4px 0 0', pt: 1, justifyContent: 'center'}}>
            <Typography sx={{my: 'auto'}}>{url}</Typography>
            <Tooltip title="Copy URL">
              <IconButton onClick={() => {
                try {
                navigator.clipboard.writeText(url);
                setCopied(true);
              } catch {
                console.log('Copy failed');
              }
              }}><ContentCopyIcon /></IconButton>
            </Tooltip>
          </Box>
        )}
        <Box
          component="img"
          alt="qrLynkImage"
          src={qrImg.content || `data:image/svg+xml;base64,${btoa(qrImg)}`}
          sx={{
            border: 'solid 1px #ccc',
            borderRadius: '4px',
            position: 'relative'
          }}
        />
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', mt: 2}}>
          <Button
            variant="outlined" startIcon={<DownloadIcon />} onClick={async () => downloadAsSVG(qrImg)}
            sx={{...handleFont(data, 'd'), ...handleButtons(data, theme)}}>
            {'Download as SVG'}
          </Button>
        </Box>
      </Box>
      {copied && (
        <Notifications
          autoHideDuration={2500}
          message="Copied!"
          vertical="bottom"
          horizontal="center"
          severity="success"
          onClose={() => setCopied(false)}/>
      )}
    </Box>
  );
}

const notIf = (current: RenderQrProps, next: RenderQrProps) => current.qrImg === next.qrImg;

export default memo(RenderShowQr, notIf);
