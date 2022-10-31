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
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {ColorTypes, FileType} from "../types/types";
import RenderIcon from "../helperComponents/RenderIcon";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import {alpha, styled} from "@mui/material/styles";

import {DEFAULT_COLORS} from "../constants";
import {download} from "../../../handlers/storage";

interface MicrositesProps {
  children: ReactNode;
  type?: string;
  colors?: ColorTypes;
  url?: string;
  badge?: string;
  backgndImg?: {Key: string;}[];
  foregndImg?: {Key: string;}[];
  foregndImgType?: string;
}

interface BtnProps {
  primary?: string;
  secondary?: string;
}

const Btn = styled(Button)(({primary, secondary}: BtnProps) => ({
  marginTop: '10px',
  width: '100%',
  color: primary,
  background: secondary,
  '&:hover': {color: secondary, background: primary}
}));

export default function MainMicrosite({children, colors, url, badge, type, backgndImg, foregndImg, foregndImgType}: MicrositesProps) {
  const [share, setShare] = useState<boolean>(false);
  const [navigate, setNavigate] = useState<string | null>(null);
  const [backImg, setBackImg] = useState<FileType | null>(null);
  const [foreImg, setForeImg] = useState<FileType | null>(null);

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

  const getFiles = async (key: string, item: string) => {
    try {
        const fileData = await download(key);
        if (item === 'backgndImg') {
          // @ts-ignore
          setBackImg(fileData);
        } else {
          // @ts-ignore
          setForeImg(fileData);
        }
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    if (navigate) {
      handleShare();
      window.open(`${navigate}${url}`, '_blank');
    }
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (backgndImg && !backImg) {
      getFiles(backgndImg[0].Key,'backgndImg');
    }
  }, [backgndImg]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (foregndImg && !foreImg) {
      getFiles(foregndImg[0].Key, 'foregndImg');
    }
  }, [foregndImg]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box sx={{
        p: 0,
        m: 0,
        width: '100%',
        height: '270px',
        background: !backImg ? alpha(colors ? colors.p : DEFAULT_COLORS.p, 0.9) : 'none' }}>
        {backImg && (
          <Box
            component="img"
            alt="backgimage"
            src={backImg.content}
            sx={{
              filter: 'opacity(0.87) contrast(0.75) blur(5px)',
              width: '100%',
              maxHeight: '100%',
              objectFit: 'cover'
          }}/>
        )}
      </Box>
      <Card sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: {md: '460px', xs: '100%'}
      }}>
        <CardMedia title="">
          {!colors ? (
            <Image src="/qr/vcard+.png" height={220} width={460} alt="image"/>
          ) : (
            <Box sx={{
              width: '460px',
              height: '200px',
              background: !backImg ? colors.p : 'none'
            }}>
              {backImg && <Box component="img" alt="backgimage" src={backImg.content} sx={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }}/>}
              {url !== undefined && (<SpeedDial
                ariaLabel="SpeedDial"
                direction="down"
                sx={{
                  position: 'absolute',
                  top: 130,
                  right: 16,
                  '& .MuiFab-primary': {
                    height: '45px',
                    width: '45px',
                    backgroundColor: colors.s, color: colors.p,
                    '&:hover': {backgroundColor: colors.s, color: colors.p}
                  }
                }}
                icon={<SpeedDialIcon/>}
              >
                <SpeedDialAction
                  key="share"
                  onClick={handleShare}
                  icon={<RenderIcon icon="social" enabled/>}
                  tooltipTitle="Share"
                  sx={{ color: colors.p }}
                />
              </SpeedDial>)}
            </Box>
          )}
          {type !== undefined && (
            <Typography
              sx={{
                position: 'absolute',
                width: '100%',
                marginTop: '-105px',
                pr: 2,
                display: 'flex',
                justifyContent: 'right',
                fontWeight: 'bold',
                fontSize: '20px',
                color: colors?.s || DEFAULT_COLORS.s
              }}
            >
              <Box sx={{ mr: '5px', mt: '2px' }}>
                <RenderIcon icon={type} enabled color={colors?.s || DEFAULT_COLORS.s} />
              </Box>
              {(type !== 'video' ? type : 'videos').toUpperCase()}
            </Typography>
          )}
          {foreImg && (
            <Box sx={{ width: '100%', position: 'absolute', top: '150px', textAlign: 'center' }}>
            <Box
              component="img"
              alt="foregimage"
              src={foreImg.content}
              sx={{
                width: '100px',
                height: '100px',
                borderRadius: foregndImgType === undefined || foregndImgType === 'circle' ? '50px' : foregndImgType === 'smooth' ? '20px' : '3px',
                border: 'solid 4px #fff'
              }}
            />
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
          marginLeft: '10px'
        }}>
          <Typography sx={{color: colors?.p, fontWeight: 'bold'}}>{badge}</Typography>
        </Box>)}
        <Box sx={{
          height: {
            sm: `calc(100vh - ${(foreImg ? 35 : 0) + (!colors ? 311 : 206)}px)`,
            xs: `calc(100vh - ${(foreImg ? 35 : 0) + (!colors ? 271 : 166)}px)` },
          overflow: 'auto',
          mt: foreImg ? '35px' : 0
        }}>
          {children}
        </Box>
        {share && colors && (
          <Dialog onClose={handleShare} open={true}>
            <DialogTitle>
              <Typography>{'Share this shortlink using...'}</Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{width: '300px'}}>
                <Btn
                  primary={colors.p}
                  secondary={colors.s}
                  variant="contained"
                  startIcon={<FacebookIcon/>}
                  onClick={() => handleNavigate('https://www.facebook.com/sharer/sharer.php?u=')}
                >
                  {'Facebook'}
                </Btn>
                <Btn
                  primary={colors.p}
                  secondary={colors.s}
                  variant="contained"
                  onClick={() => handleNavigate('https://twitter.com/share?url=')}
                  startIcon={<TwitterIcon/>}
                >
                  {'Twitter'}
                </Btn>
                <Btn
                  primary={colors.p}
                  secondary={colors.s}
                  variant="contained"
                  onClick={() => handleNavigate('mailto:?body=')}
                  startIcon={<AlternateEmailIcon/>}
                >
                  {'Email'}
                </Btn>
                <Btn
                  primary={colors.p}
                  secondary={colors.s}
                  variant="contained"
                  onClick={copy}
                  startIcon={<ContentCopyIcon/>}
                >
                  {'Copy to clipboard'}
                </Btn>
              </Box>
            </DialogContent>
          </Dialog>
        )}
      </Card>
    </>
  );
}
