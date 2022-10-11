import {ReactNode, useEffect, useState} from "react";
import Image from "next/image";

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {ColorTypes} from "../types/types";
import RenderIcon from "../helperComponents/RenderIcon";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";

interface MicrositesProps {
  children: ReactNode;
  colors?: ColorTypes;
  url?: string;
  badge?: string;
}

interface BtnProps {
  primary?: string;
  secondary?: string;
}

const Btn = styled(Button)(({primary, secondary}: BtnProps) => ({
  marginTop: '10px', width: '100%', color: primary, background: secondary, '&:hover': {color: secondary, background: primary}
}));

export default function MainMicrosite({children, colors, url, badge}: MicrositesProps) {
  const [share, setShare] = useState<boolean>(false);
  const [navigate, setNavigate] = useState<string | null>(null);

  const handleShare = () => {
    setShare(!share);
  };

  const handleNavigate = (destination: string) => {
    setNavigate(destination);
  };

  const copy = () => {
    try {
      navigator.clipboard.writeText(url || '');
    } catch {
      console.log('Copy failed')
    }
    handleShare();
  };

  useEffect(() => {
    if (navigate) {
      handleShare();
      window.open(`${navigate}${url}`, '_blank');
    }
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "460px"
    }}>
      <CardMedia title="">
        {!colors ? (
          <Image src="/qr/vcard+.png" height={220} width={460} alt="image"/>
        ) : (
          <Box sx={{ width: '460px', height: '120px', background: colors.p }}>
            {url !== undefined && (<SpeedDial
              ariaLabel="SpeedDial"
              direction="down"
              sx={{
                position: 'absolute',
                top: 32,
                right: 16,
                '& .MuiFab-primary': {
                  backgroundColor: colors.s, color: colors.p,
                  '&:hover': { backgroundColor: colors.s, color: colors.p }
                }
              }}
              icon={<SpeedDialIcon />}
            >
              <SpeedDialAction
                key="share"
                onClick={handleShare}
                icon={<RenderIcon icon="social" enabled />}
                tooltipTitle="Share"
              />
            </SpeedDial>)}
          </Box>
        )}
      </CardMedia>
      {badge && (<Box style={{
          position: 'fixed',
          marginTop: '-52px',
          padding: '10px',
          background: colors?.s,
          width: 'fit-content',
          borderRadius: '5px',
          // @ts-ignore
          boxShadow: theme => `5px 5px 2px 1px ${theme.palette.text.disabled}`,
          marginLeft: '10px'}}>
          <Typography sx={{ color: colors?.p, fontWeight: 'bold' }}>{badge}</Typography>
        </Box>)}
      <Box sx={{ maxHeight: `calc(100vh - ${!colors ? 275 : 170}px)`, overflow: 'auto' }}>
        {children}
      </Box>
      {share && colors && (
        <Dialog onClose={handleShare} open={true}>
          <DialogContent>
            <Typography>{'Share this shortlink using...'}</Typography>
            <Box sx={{ width: '300px' }}>
              <Btn
                primary={colors.p}
                secondary={colors.s}
                variant="contained"
                startIcon={<FacebookIcon />}
                onClick={() => handleNavigate('https://www.facebook.com/sharer/sharer.php?u=')}
              >
                {'Facebook'}
              </Btn>
              <Btn
                primary={colors.p}
                secondary={colors.s}
                variant="contained"
                onClick={() => handleNavigate('https://twitter.com/share?url=')}
                startIcon={<TwitterIcon />}
              >
                {'Twitter'}
              </Btn>
              <Btn
                primary={colors.p}
                secondary={colors.s}
                variant="contained"
                onClick={() => handleNavigate('mailto:?body=')}
                startIcon={<AlternateEmailIcon />}
              >
                {'Email'}
              </Btn>
              <Btn
                primary={colors.p}
                secondary={colors.s}
                variant="contained"
                onClick={copy}
                startIcon={<ContentCopyIcon />}
              >
                {'Copy to clipboard'}
              </Btn>
            </Box>
          </DialogContent>
        </Dialog>
      )}
      <Box>
        <Divider sx={{ my: 1, px: 1 }} />
        <Typography
          variant="caption"
          sx={{ pl: 1, color: theme => theme.palette.text.disabled, pb: 2 }}>{'Powered by Ebanux'}</Typography>
      </Box>
    </Card>
  );
}
