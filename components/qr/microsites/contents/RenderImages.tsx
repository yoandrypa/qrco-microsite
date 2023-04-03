import {useCallback, useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DangerousIcon from "@mui/icons-material/Dangerous";
import Tooltip from "@mui/material/Tooltip";
import {useMediaQuery} from "@mui/material";

import {CustomProps, handleFont} from "../renderers/helper";
import {FileType} from "../../types/types";
import {download} from "../../../../handlers/storage";

import dynamic from "next/dynamic";

const RenderNoAssets = dynamic(() => import("../../helperComponents/RenderNoAssets"));
const CircularProgress = dynamic(() => import("@mui/material/CircularProgress"));
const RenderPreview = dynamic(() => import("../renderers/RenderPreview"));

export default function RenderImages({data, stylesData}: CustomProps) {
  const [_, setUnusedState] = useState(); // eslint-disable-line no-unused-vars
  const [hideTooltip, setHideTooltip] = useState<boolean>(false);
  const [preview, setPreview] = useState<FileType | string | null>(null);

  const images = useRef<FileType[] | string[]>([]);
  const index = useRef<number>(0);

  const isWide = useMediaQuery("(min-width:600px)", { noSsr: true });
  const isHeight = useMediaQuery("(min-height:600px)", { noSsr: true });
  const isWide400 = useMediaQuery("(min-width:400px)", { noSsr: true });

  // @ts-ignore
  const forceUpdate = useCallback(() => setUnusedState({}), []);

  const getImages = (files: object[] | string[]) => {
    try {
      files.forEach(async (x: any) => {
        const imgData = typeof x !== "string" ? await download(x.Key, data.isSample) : x;
        if (images.current.length < data.files.length) { // @ts-ignore
          images.current.push(imgData);
          forceUpdate();
        }
      });
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    images.current = [];
    if (data?.files?.length) {
      getImages(data.files);
    } else {
      forceUpdate();
    }
  }, [data?.files]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setHideTooltip(window.top !== window);
  }, []);

  let colNumber = images.current.length;
  let width = '0';

  if (!data?.iframed) {
    if (isWide) {
      if (colNumber === 0 || colNumber === 1) {
        colNumber = 12;
        width = '200px';
      } else if (colNumber === 2) {
        colNumber = 6;
        width = '150px';
      } else if (colNumber >= 3) {
        colNumber = 4;
        width = '120px';
      }
    } else {
      colNumber = isWide400 ? 6 : 12;
      width = '100%'
    }
  } else {
    colNumber = 6;
    width = '100%';
  }

  const renderGallery = () => (
    <Grid container spacing={1} sx={{p: 2}}>{/* @ts-ignore */}
      {images.current.length ? images.current.map((x: FileType | string, fileNumber: number) => {
        if (!x) {
          return (
            <Box key={`mainIt${fileNumber}`} sx={{
              mt: '5px',
              width: 'calc(100% - 10px)',
              ml: '5px',
              p: 2,
              border: theme => `solid 1px ${theme.palette.primary.main}`,
              borderRadius: '5px'
            }}>
              <Typography sx={{color: theme => theme.palette.primary.main, width: '100%', textAlign: 'center', ...handleFont(stylesData, 'm')}}>
                <DangerousIcon sx={{ color: theme => theme.palette.secondary.main, mb: '-5px', mr: '5px' }} />
                {'Error loading image.'}
              </Typography>
            </Box>
          );
        }
        const img = typeof x === 'string' ? x : x.content;
        return (
          <Grid item xs={colNumber} sx={{mx: 'auto', my: 'auto', textAlign: 'center', zIndex: 1000}} key={`item${img}`}>
            <Tooltip title="Click to enlarge" disableHoverListener={hideTooltip}>
              <Box
                key={`img${img}`}
                component="img"
                src={img}
                alt="image"
                sx={{
                  width,
                  cursor: 'pointer',
                  borderRadius: '4px',
                  '&:hover': { boxShadow: '0 0 5px 5px #849abb' }
                }}
                onClick={() => {
                  index.current = fileNumber;
                  setPreview(x)
                }}/>
            </Tooltip>
          </Grid>
        )}
      ) : null}
    </Grid>
  );

  return (
    <>
      <Box>
        {!data?.files?.length && <RenderNoAssets type="image" stylesData={stylesData} />}
        {Boolean(data?.files?.length) && images.current.length !== data?.files?.length && (
          <Box sx={{width: '100%', p: 2}}>
            <Box sx={{width: '100%', color: theme => theme.palette.secondary.main, display: 'flex', justifyContent: 'center'}}>
              <CircularProgress sx={{color: theme => theme.palette.primary.main, mr: '10px', my: 'auto'}}/>
              <Box>
                <Typography sx={{...handleFont(stylesData, 'm')}}>
                  {`Loaded ${images.current.length}/${data?.files?.length}...`}
                </Typography>
                <Typography sx={{...handleFont(stylesData, 'm')}}>{'Please wait...'}</Typography>
              </Box>
            </Box>
          </Box>
        )}
        {renderGallery()}
      </Box>
      {preview && (
        <RenderPreview
          handleNext={() => {
            index.current = index.current + 1 >= images.current.length ? 0 : index.current + 1;
            setPreview(images.current[index.current]);
          }}
          handlePrev={() => {
            index.current = index.current - 1 > 0 ? index.current - 1 : (images.current.length - 1);
            setPreview(images.current[index.current]);
          }}
          position={index.current}
          amount={images.current.length}
          isWide={isWide}
          isHeight={isHeight}
          preview={preview}
          handleClose={() => setPreview(null)}
          type="image"
          sx={{...handleFont(stylesData, 'm')}}
        />
      )}
    </>
  );
}
