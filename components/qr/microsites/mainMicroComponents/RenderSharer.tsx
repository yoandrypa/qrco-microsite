import {MouseEvent, useEffect, useState} from "react";
import {RWebShare} from "react-web-share";
import Fab from "@mui/material/Fab";
import ShareIcon from "@mui/icons-material/Share";
import Button from '@mui/material/Button';

import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";

import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";

interface SharerProps {
  baseURL: string;
  position: string;
  height: string;
  width?: string;
  topHeight?: string;
  qrCode?: any;
}

export default function RenderSharer({baseURL, position, height, width, topHeight, qrCode}: SharerProps) {
  const [anchor, setAnchor] = useState<undefined | HTMLElement>(undefined);
  const [showQr, setShowQr] = useState<boolean>(false);
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

  const renderButton = (command?: (event: MouseEvent<HTMLElement>) => void) => {
    return (
      <Fab
        size="small" color="secondary" aria-label="add"
        onClick={command}
        sx={{
          position: 'fixed', ...pos, color: theme => theme.palette.secondary.main,
          backgroundColor: theme => theme.palette.primary.main, border: 'solid 3px #fff',
          '&:hover': {color: theme => theme.palette.primary.main, background: theme => theme.palette.secondary.main}
        }}>
        <ShareIcon/>
      </Fab>
    );
  }

  useEffect(() => {
    if (showQr) { setAnchor(undefined); }
  }, [showQr]);

  if (!qrCode) {
    return (
      <RWebShare data={{text: "Shared from QRLynk", url: baseURL, title: "Share this QRLynk"}}>
        {renderButton()}
      </RWebShare>
    );
  }

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  return (
    <>
      {renderButton(handleOpen)}
      {anchor && (
        <Menu
          id="menuButton"
          MenuListProps={{ 'aria-labelledby': 'menuButton' }}
          anchorEl={anchor}
          open
          onClose={() => setAnchor(undefined)}
        >
          <MenuItem key="qrOption" onClick={() => setShowQr(true)}>
            <ListItemIcon><Box component="img" alt="qr" src={qrCode.content || qrCode} sx={{width: '28px'}}/></ListItemIcon>
            <ListItemText>Show QR Code</ListItemText>
          </MenuItem>
          <RWebShare data={{text: "Shared from QRLynk", url: baseURL, title: "Share this QRLynk"}}>
            <MenuItem key="shareOption">
              <ListItemIcon><ShareIcon /></ListItemIcon>
              <ListItemText>Share</ListItemText>
            </MenuItem>
          </RWebShare>
        </Menu>
      )}
        {showQr && (
          <Popover
            open
            anchorOrigin={{vertical: 'center', horizontal: 'center'}}
            transformOrigin={{vertical: 'center', horizontal: 'center'}}
            onClose={() => setShowQr(false)}
          >
            <Box sx={{width: {sm: '450px', xs: '100%'}, p: 2, textAlign: 'center'}}>
              <Box component="img" alt="qr" src={qrCode.content || qrCode}/>
              <Button sx={{mt: 2}} color="primary" variant="outlined" onClick={() => setShowQr(false)}>
                {'Close'}
              </Button>
            </Box>
          </Popover>
        )
      }
    </>
  );
}
