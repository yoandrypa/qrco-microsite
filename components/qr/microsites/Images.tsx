import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DangerousIcon from '@mui/icons-material/Dangerous';

import MainMicrosite from "./MainMicrosite";
import {getColors} from "./renderers/helper";
import {download} from "../../../handlers/storage";
import {ColorTypes, FileType} from "../types/types";
import RenderPreview from "./renderers/RenderPreview";
import RenderAssetsDesc from "./renderers/RenderAssetsDesc";

interface ImageProps {
  newData: any;
}

function Images({newData}: ImageProps) {
  const [_, setUnusedState] = useState(); // eslint-disable-line no-unused-vars
  const [preview, setPreview] = useState<FileType | null>(null);
  const images = useRef<FileType[]>([]);

  // @ts-ignore
  const forceUpdate = useCallback(() => setUnusedState({}), []);

  const getImages = (files: object[]) => {
    try {
      files.forEach(async (x: any) => {
        const data = await download(x.Key);

        // @ts-ignore
        images.current.push(data);
        forceUpdate();
      });
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    images.current = [];
    if (newData.files?.length) {
      getImages(newData.files);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const colors = useMemo(() => (getColors(newData)), []) as ColorTypes; // eslint-disable-line react-hooks/exhaustive-deps

  let colNumber = images.current.length;
  let width = 0;

  if (colNumber === 0 || colNumber === 1) {
    colNumber = 12;
    width = 200;
  } else if (colNumber === 2) {
    colNumber = 6;
    width = 150;
  } else if (colNumber >= 3) {
    colNumber = 4;
    width = 120;
  }

  return (
    <MainMicrosite
      colors={colors}
      url={newData.shortlinkurl}
      type={newData.qrType}
      foregndImg={newData.foregndImg}
      backgndImg={newData.backgndImg}
      foregndImgType={newData.foregndImgType}>
      <Box sx={{width: '100%', mt: '10px', textAlign: 'center', color: colors.s}}>
        <RenderAssetsDesc newData={newData} colors={colors} />
        {images.current.length ? (
          <Typography sx={{fontWeight: 'bold'}}>
            {newData.files?.length !== images.current.length ? `Loaded ${images.current.length}/${newData.files?.length}...` : `${images.current.length} images`}
          </Typography>
        ) : (
          <Typography>{'Please wait...'}</Typography>
        )}
      </Box>
      <Grid container spacing={1} sx={{p: 2}}>
        {/* @ts-ignore */}
        {images.current.length ? images.current.map((x: FileType, fileNumber: number) => {
            if (!x) {
              return (
                <Box key={`mainIt${fileNumber}`} sx={{
                  mt: '5px',
                  width: 'calc(100% - 10px)',
                  ml: '5px',
                  p: 2,
                  border: `solid 1px ${colors.p}`,
                  borderRadius: '5px'
                }}>
                  <Typography sx={{color: colors.p, width: '100%', textAlign: 'center'}}>
                    <DangerousIcon sx={{ color: colors.s, mb: '-5px', mr: '5px' }} />
                    {'Error loading image.'}
                  </Typography>
                </Box>
              );
            }
            const img = x.content;
            return (
              <Grid item xs={colNumber} sx={{mx: 'auto', my: 'auto', textAlign: 'center'}} key={`item${img}`}>
                <Tooltip title="Click to enlarge">
                  <Box
                    key={`img${img}`}
                    component="img"
                    src={img}
                    alt="image"
                    sx={{
                      width: `${width}px`,
                      cursor: 'pointer',
                      '&:hover': {
                        border: theme => `solid 1px ${theme.palette.primary.light}`,
                        borderRadius: '2px',
                        p: '3px'
                      }
                    }}
                    onClick={() => setPreview(x)}/>
                </Tooltip>
              </Grid>
            )
          }
        ) : null}
      </Grid>
      {preview && (
        <RenderPreview preview={preview} handleClose={() => setPreview(null)} colors={colors} type="image"/>
      )}
    </MainMicrosite>
  );
}

export default Images;
