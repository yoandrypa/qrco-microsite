import {RWebShare} from "react-web-share";
import Fab from "@mui/material/Fab";
import ShareIcon from "@mui/icons-material/Share";

interface SharerProps {
  baseURL: string;
  position: string;
  height: string;
  topHeight?: string;
}

export default function RenderSharer({baseURL, position, height, topHeight}: SharerProps) {
  let pos: any;

  if (position === 'upLeft') {
    pos = {top: '16px', left: '16px'};
  } else if (position === 'upRight') {
    pos = {top: '16px', right: '16px'};
  } else if (position === 'downLeft') {
    pos = {top: `calc(${height} - 52px)`, left: '16px'};
  } else if (position === 'downRight') {
    pos = {top: `calc(${height} - 52px)`, right: '16px'};
  } else {
    pos = {top: '147px', right: '16px'};
    if (topHeight === 'medium') {
      pos.top = '207px';
    } else if (topHeight === 'wide') {
      pos.top = '265px';
    }
  }

  return (
    <RWebShare data={{text: "Shared from QRLynk", url: baseURL, title: "Share this QRLynk"}}>
      <Fab
        size="small" color="secondary" aria-label="add"
        sx={{position: 'fixed', ...pos, color:  theme => theme.palette.secondary.main,
          backgroundColor:  theme => theme.palette.primary.main, border: 'solid 3px #fff',
          '&:hover': {color:  theme => theme.palette.primary.main, background: theme => theme.palette.secondary.main}
        }}>
        <ShareIcon/>
      </Fab>
    </RWebShare>
  );
}
