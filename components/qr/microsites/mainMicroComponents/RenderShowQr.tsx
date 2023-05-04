import {MouseEvent, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import PublicIcon from '@mui/icons-material/Public';
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from "@mui/material/IconButton";
import {useTheme} from "@mui/system";

import Notifications from "../../helperComponents/Notifications";
import {clearDataStyles, handleButtons, handleFont} from "../renderers/helper";

interface RenderQrProps {
  qrImg: any;
  data: any;
}

const getImageData = async (imageSrc: any) => {
  let imageURL:string;

  if (imageSrc.content) {
    const image = await fetch(imageSrc.content);
    const imageBlog = await image.blob();
    imageURL = URL.createObjectURL(imageBlog);
  } else {
    const imageBlog = new Blob([imageSrc], {type : 'image/svg+xml'});
    imageURL = URL.createObjectURL(imageBlog);
  }

  return imageURL;
}

const downloadAsSVG = async (imageSrc: any) => {
  const imageURL = await getImageData(imageSrc);

  const element = document.createElement('a');
  element.href = imageURL;
  element.download = 'qrLynk.svg';
  document.body.appendChild(element);
  element.click();
  element.remove();
};

const downloadAsImage = async (imageSrc: any, asPng: boolean) => {
  const imageURL = await getImageData(imageSrc);

  const elem = document.getElementById('qrCodeLynkImage'); // @ts-ignore
  const h = elem?.height; // @ts-ignore
  const w = elem?.width;

  const imageToHandle = document.createElement('img');
  const canvas = document.createElement('canvas');
  imageToHandle.onload = () => { // @ts-ignore
    canvas.setAttribute('width', w); // @ts-ignore
    canvas.setAttribute('height', h);
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d'); // @ts-ignore
    context.clearRect(0, 0, w, h); // @ts-ignore
    context.drawImage(imageToHandle, 0, 0, h, w);
    const imgData = canvas.toDataURL( `image/${asPng ? 'png' : 'jpeg'}`, 1);
    const anchor = document.createElement('a');
    anchor.download = `qrLynk.${asPng ? 'png' : 'jpg'}`;
    anchor.href = imgData;
    anchor.click();
    anchor.remove();
    imageToHandle.remove();
    canvas.remove();
  }
  imageToHandle.src = imageURL;
}

function RenderShowQr({qrImg, data}: RenderQrProps) {
  const [anchor, setAnchor] = useState<undefined | HTMLElement>(undefined);
  const [url, setURL] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const theme = useTheme();

  const styled = clearDataStyles(data);

  const handleOpenAnchor = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  useEffect(() => {
    if (window) {
      const index = data.shortlinkurl.lastIndexOf('/');
      if (index !== -1 && !data.isSample) {
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
        {url.length > 0 && (
          <Box sx={{display: 'flex', width: '100%', borderRadius: '4px 4px 0 0', mt: 3, mb: 2, justifyContent: 'center'}}>
            <PublicIcon sx={{mt: 1, mr: '2px', color: theme.palette.text.disabled}} fontSize="small" />
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
          id="qrCodeLynkImage"
          alt="qrLynkImage"
          src={qrImg.content || `data:image/svg+xml;base64,${btoa(qrImg)}`}
          sx={{
            border: 'solid 1px #ccc',
            borderRadius: '4px',
            position: 'relative'
          }}
        />
        <Button
          variant="contained" startIcon={<DownloadIcon />} onClick={handleOpenAnchor}
          sx={{...handleFont(styled, 'b'), ...handleButtons(styled, theme), fontSize: '16px'}}>
          {'Download'}
        </Button>
      </Box>
      {anchor && (
        <Popover
          id="downloadPopover"
          open
          anchorEl={anchor}
          onClose={() => setAnchor(undefined)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Box sx={{ p: 1, width: '230px' }}>
            <Box sx={{mb: '10px', display: 'flex', justifyContent: 'center'}}>
              <DownloadIcon color="primary" sx={{mt: '5px', mr: '5px'}}/>
              <Typography sx={{...handleFont(styled, 'm')}}>{'Download as'}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Button
                id="buttonPNG"
                variant="contained"
                sx={{width: '100%', ...handleFont(styled, 'b'), ...handleButtons(styled, theme), fontSize: '16px'}}
                onClick={async () => downloadAsImage(qrImg, true)}>PNG</Button>
              <Button
                id="buttonJPG"
                variant="contained"
                sx={{ml: '5px', width: '100%', ...handleFont(styled, 'b'), ...handleButtons(styled, theme), fontSize: '16px'}}
                onClick={async () => downloadAsImage(qrImg, false)}>JPG</Button>
              <Button
                id="buttonSVG"
                variant="contained"
                sx={{ml: '5px', width: '100%', ...handleFont(styled, 'b'), ...handleButtons(styled, theme), fontSize: '16px'}}
                onClick={async () => downloadAsSVG(qrImg)}>SVG</Button>
            </Box>
          </Box>
        </Popover>
      )}
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

export default RenderShowQr;
