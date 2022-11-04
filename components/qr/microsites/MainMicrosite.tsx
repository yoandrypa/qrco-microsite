import { ReactNode, useEffect, useState } from "react";
import Fab from '@mui/material/Fab';
import ShareIcon from '@mui/icons-material/Share';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { ColorTypes, FileType } from "../types/types";
import RenderIcon from "../helperComponents/RenderIcon";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

import { alpha } from "@mui/material/styles";

import { DEFAULT_COLORS } from "../constants";
import { download } from "../../../handlers/storage";
import Notifications from "../helperComponents/Notifications";
import { RWebShare } from "react-web-share";

interface MicrositesProps {
  children: ReactNode;
  type?: string;
  colors?: ColorTypes;
  url?: string;
  badge?: string;
  backgndImg?: { Key: string; }[];
  foregndImg?: { Key: string; }[];
  foregndImgType?: string;
}

export default function MainMicrosite({ children, colors, url, badge, type, backgndImg, foregndImg, foregndImgType }: MicrositesProps) {
  const [backImg, setBackImg] = useState<any>(undefined);
  const [foreImg, setForeImg] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getFiles = async (key: string, item: string) => {
    try {
      const fileData = await download(key);
      if (item === 'backgndImg') {
        setBackImg(fileData);
      } else {
        setForeImg(fileData);
      }
    } catch {
      if (item === 'backgndImg') {
        setBackImg(null);
      } else {
        setForeImg(null);
      }
      setError(true);
    }
  }

  useEffect(() => {
    if (backgndImg && !backImg) {
      setLoading(true);
      getFiles(backgndImg[0].Key, 'backgndImg');
    }
    if (foregndImg && !foreImg) {
      setLoading(true);
      getFiles(foregndImg[0].Key, 'foregndImg');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if ((backImg !== undefined && !foregndImg) || (foreImg !== undefined && !backgndImg) || (foreImg !== undefined && backImg !== undefined)) {
      setLoading(false);
    }
  }, [backImg, foreImg]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {error && (
        <Notifications
          title="Something went wrong"
          message="Failed loading the microsite's data"
          vertical="bottom"
          horizontal="center"
          onClose={() => setError(true)} />
      )}
      {loading && (
        <Box sx={{ display: 'flex', position: 'absolute', width: '100%', justifyContent: 'center', zIndex: 10, bottom: '45px' }}>
          <CircularProgress size={20} sx={{ mr: '5px', color: colors?.p || DEFAULT_COLORS.p }} />
          <Typography sx={{ fontSize: 'small', color: theme => theme.palette.text.disabled }}>
            {'Loading data. Please wait...'}
          </Typography>
        </Box>
      )}
      <Box sx={{
        p: 0,
        m: 0,
        width: '100%',
        height: '270px',
        background: !backImg ? alpha(colors?.p || DEFAULT_COLORS.p, 0.9) : 'none'
      }}>
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
            }} />
        )}
      </Box>
      <Card sx={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translate(-50%, 0)",
        maxWidth: { md: '475px', xs: '100%' }
      }}>
        <CardMedia title="">
          <Box sx={{
            width: '475px',
            height: '200px',
            background: !backImg && colors ? colors.p : 'none'
          }}>
            {backImg && (
              <Box
                component="img"
                alt="backgimage"
                src={backImg.content}
                sx={{ width: '475px', height: '200px', objectFit: 'cover' }} />
            )}
            {url !== undefined && (
              <RWebShare
                data={{
                  text: "(Shared from theqr.link)",
                  url: url,
                  title: "The QR Link",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Fab
                  size="small" color="secondary" aria-label="add"
                  // onClick={handleShare}
                  sx={{
                    position: 'absolute',
                    top: 215,
                    right: 16,
                    color: colors?.s || DEFAULT_COLORS.s,
                    backgroundColor: colors?.p || DEFAULT_COLORS.p,
                    '&:hover': { color: colors?.p || DEFAULT_COLORS.p, background: colors?.s || DEFAULT_COLORS.s }
                  }}>
                  <ShareIcon />
                </Fab>
              </RWebShare>
            )}
          </Box>
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
          borderRadius: '5px', // @ts-ignore
          boxShadow: theme => `5px 5px 2px 1px ${theme.palette.text.disabled}`,
          marginLeft: '10px'
        }}>
          <Typography sx={{ color: colors?.p, fontWeight: 'bold' }}>{badge}</Typography>
        </Box>)}
        <Box sx={{
          height: `calc(100vh - ${(foreImg ? 35 : 0) + 201}px)`,
          overflow: 'auto',
          mt: foreImg ? '35px' : 0
        }}>
          <Box sx={{ width: '100%', minHeight: `calc(100vh - ${foreImg ? 275 : 235}px)` }}>
            {children}
          </Box>
          {type !== undefined && (
            <Box sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '20px',
              color: colors?.s || DEFAULT_COLORS.s
            }}>
              <RenderIcon icon={type} enabled color={colors?.s || DEFAULT_COLORS.s} />
              <Typography sx={{ ml: '5px' }}>
                {(type !== 'video' ? type : 'videos').toUpperCase()}
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
}
