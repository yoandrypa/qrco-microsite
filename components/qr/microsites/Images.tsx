import {useCallback, useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DangerousIcon from '@mui/icons-material/Dangerous';
import {useMediaQuery} from "@mui/material";

import MainMicrosite from "./MainMicrosite";
import {handleFont} from "./renderers/helper";
import {download} from "../../../handlers/storage";
import {FileType} from "../types/types";

import dynamic from "next/dynamic";

const RenderPreview = dynamic(() => import("./renderers/RenderPreview"));
const RenderTitleDesc = dynamic(() => import("./renderers/RenderTitleDesc"));
const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

interface ImageProps {
  newData: any;
}

function Images({newData}: ImageProps) {
  const [_, setUnusedState] = useState(); // eslint-disable-line no-unused-vars
  const [preview, setPreview] = useState<FileType | string | null>(null);
  const [hideTooltip, setHideTooltip] = useState<boolean>(false);
  const images = useRef<FileType[] | string[]>([]);
  const index = useRef<number>(0);

  const isWide = useMediaQuery("(min-width:600px)", { noSsr: true });
  const isHeight = useMediaQuery("(min-height:600px)", { noSsr: true });
  const isWide400 = useMediaQuery("(min-width:400px)", { noSsr: true });

  // @ts-ignore
  const forceUpdate = useCallback(() => setUnusedState({}), []);
  const isSections = Boolean(newData.layout?.startsWith('sections'));

  const getImages = (files: object[] | string[]) => {
    try {
      files.forEach(async (x: any) => {
        const data = typeof x !== "string" ? await download(x.Key, newData.isSample) : x;
        if (images.current.length < newData.files.length) { // @ts-ignore
          images.current.push(data);
          forceUpdate();
        }
      });
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    images.current = [];
    if (newData.files?.length) {
      getImages(newData.files);
    } else {
      forceUpdate();
    }
  }, [newData.files]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setHideTooltip(window.top !== window);
  }, []);

  let colNumber = images.current.length;
  let width = '0';

  if (!newData.iframed) {
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
              <Typography sx={{color: theme => theme.palette.primary.main, width: '100%', textAlign: 'center', ...handleFont(newData, 'm')}}>
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
    <MainMicrosite data={newData}>
      <Box sx={{width: '100%', p: 2, textAlign: 'center', color: theme => theme.palette.secondary.main}}>
        {images.current.length ? (
          <Typography sx={{...handleFont(newData, 't')}}>
            {newData.files?.length !== images.current.length ? `Loaded ${images.current.length}/${newData.files?.length}...` : `${images.current.length} images`}
          </Typography>
        ) : (
          <Typography sx={{...handleFont(newData, 'm')}}>{'Please wait...'}</Typography>
        )}
        <Box sx={isSections ? {width: 'calc(100% + 5px)', ml: '-10px'} : undefined}>
          <RenderTitleDesc newData={newData} isSections={isSections} />
        </Box>
      </Box>
      {!isSections ? renderGallery() : (
        <Box sx={{width: 'calc(100% - 30px)', ml: 1}}>
          <RenderSectWrapper>{renderGallery()}</RenderSectWrapper>
        </Box>
      )}
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
          sx={{...handleFont(newData, 'm')}}
        />
      )}
    </MainMicrosite>
  );
}

export default Images;
