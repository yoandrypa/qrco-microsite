import {RWebShare} from "react-web-share";
import Fab from "@mui/material/Fab";
import ShareIcon from "@mui/icons-material/Share";
import QrCodeIcon from '@mui/icons-material/QrCode';
import {useTheme} from "@mui/system";

interface SharerProps {
  baseURL: string;
  position?: string;
  height: string;
  width?: string;
  topHeight?: string;
  handlePreviewQr?: () => void;
}

const getSx = (pos: any, theme: any) => ({
  position: 'fixed', border: 'solid 3px #fff', ...pos,
  color: theme.palette.secondary.main, backgroundColor: theme.palette.primary.main,
  '&:hover': {color: theme.palette.primary.main, background: theme.palette.secondary.main}
});


export default function RenderSharer({baseURL, position, height, width, topHeight, handlePreviewQr}: SharerProps) {
  const theme = useTheme();

  let pos: any;

  if (position === 'upLeft') {
    pos = {top: '16px', left: '16px'};
  } else if (position === 'upRight') {
    pos = {top: '16px', right: '16px'};
  } else if (position === 'downLeft') {
    pos = {top: `calc(${height} - 52px)`, left: !width ? '16px' : `calc(50% - ${width} / 2 + 16px)`}; // these adjustments are meant to fix the fixed position properly in widescreen
  } else if (position === 'downRight') {
    pos = {top: `calc(${height} - 52px)`, right: !width ? '16px' : `calc(50% - ${width} / 2 + 16px)`};
  } else {
    pos = {top: '147px', right: '16px'};
    if (topHeight === 'medium') {
      pos.top = '207px';
    } else if (topHeight === 'wide') {
      pos.top = '265px';
    }
  }

  const renderQR = () => {
    if (!handlePreviewQr) {
      return undefined;
    }

    const sx = getSx(pos, theme);
    if (position === undefined || position === 'upRight') {
      sx.right = '63px';
    } else if (position === 'upLeft') {
      sx.left = '63px';
    } else if (position === 'downLeft') {
      sx.left = !width ? '63px' : `calc(50% - ${width} / 2 + 63px)`;
    } else if (position === 'downRight') {
      sx.right = !width ? '63px' : `calc(50% - ${width} / 2 + 63px)`;
    }
    return (
      <Fab size="small" color="secondary" aria-label="add" sx={sx} onClick={handlePreviewQr}>
        <QrCodeIcon/>
      </Fab>
    )
  }

  return (
    <>
      <RWebShare data={{text: "Shared from QRLynk", url: baseURL, title: "Share this QRLynk"}}>
        <Fab size="small" color="secondary" aria-label="add" sx={getSx(pos, theme)}>
          <ShareIcon/>
        </Fab>
      </RWebShare>
      {renderQR()}
    </>
  );
}
