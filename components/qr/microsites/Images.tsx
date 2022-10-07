import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

import MainMicrosite from "./MainMicrosite";
import {getColors, handleDownloadFiles} from "./renderers/helper";
import {download} from "../../../handlers/storage";
import {FileType} from "../types/types";

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
      // getContent(newData.files[0].Key);
      getImages(newData.files);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const colors = useMemo(() => (getColors(newData)), []); // eslint-disable-line react-hooks/exhaustive-deps

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
    <MainMicrosite colors={colors} url={newData.shortlinkurl}>
      <Box sx={{width: '100%', textAlign: 'center', mt: '-35px', color: colors.s}}>
        {images.current.length ? (
          <Typography sx={{fontWeight: 'bold'}}>
            {newData.files?.length !== images.current.length ? `Loaded ${images.current.length}/${newData.files?.length}...` : `${images.current.length} images`}
          </Typography>
        ) : (
          <Typography>{'Please wait...'}</Typography>
        )}
      </Box>

      <Grid container spacing={1} sx={{mt: 2, p: 2}}>
        {/* @ts-ignore */}
        {images.current.length ? images.current.map((x: FileType) => {
          const img = x.content;
          return (
            <Grid item xs={colNumber} sx={{mx: 'auto', my: 'auto', textAlign: 'center'}} key={`item${img}`}>
              <Tooltip title="Click to enlarge">
                <Box
                  key={`img${img}`}
                  component="img"
                  src={img}
                  alt="image"
                  sx={{width: `${width}px`, cursor: 'pointer'}}
                  onClick={() => setPreview(x)} />
                </Tooltip>
              </Grid>
            )
          }
        ) : null}
      </Grid>
      {preview && (
        <Dialog onClose={() => setPreview(null)} open={true}>
          <DialogContent sx={{ maxWidth: '398px' }}>
            <Box sx={{ maxWidth: '350px' }} component="img" alt="image" src={preview.content} />
            <Button
              sx={{ mt: '10px', width: '100%', color: colors.p, background: colors.s, '&:hover': {color: colors.s, background: colors.p} }}
              variant="outlined"
              onClick={() => handleDownloadFiles(preview)}
              startIcon={<DownloadIcon />}
            >
              {'Download'}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </MainMicrosite>
  );
}

export default Images;
