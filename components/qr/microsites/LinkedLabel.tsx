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
import RenderPreview from "./renderers/RenderPreview";
import RenderTitleDesc from "./renderers/RenderTitleDesc";

interface LinkedLabelProps {
  newData: any;
}

interface Field {
  type: "text"| "media";
  files?: FileType[]| string[];
  title?: string;
  text?: string;

}

function LinkedLabel({newData}: LinkedLabelProps) {
  const [_, setUnusedState] = useState(); // eslint-disable-line no-unused-vars
  const [preview, setPreview] = useState<FileType | string | null>(null);
  const [hideTooltip, setHideTooltip] = useState<boolean>(false);
  const fields = useRef<Field[]>([]);
  const index = useRef<{field: number, index: number }>({ field:0, index:0 });

  const isWide = useMediaQuery("(min-width:600px)", { noSsr: true });
  const isHeight = useMediaQuery("(min-height:600px)", { noSsr: true });
  const isWide400 = useMediaQuery("(min-width:400px)", { noSsr: true });

  // @ts-ignore
  const forceUpdate = useCallback(() => setUnusedState({}), []);
  console.log({newData})

  const getImages = (files: object[] | string[],index:number ) => {
    try {//@ts-ignore
      const media=[];
      files.forEach(async (file: any) => {
        const data = typeof file !== "string" ? await download(file.Key, newData.isSample) : file;
        media.push(data);
      });//@ts-ignore
      fields.current[index].files = media;
      forceUpdate();
    } catch {
      console.log("error");
    }
  }

  useEffect(() => {
    fields.current = [];
    newData.fields?.forEach((field: any, i: number) => {
      if (field.type === "media") {
        fields.current.push({ type: "media", files: [] });
        getImages(field.files, i);
      } else {
        fields.current.push({ type: "text", text: field.text, title: field.title });
      }
    });
  }, [newData.fields]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {// ! for now
    setHideTooltip(window.top !== window);
  }, []);

  const calcColNumber = ( length:number) => { 
    let colNumber = length;
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
    return {colNumber, width};
  }   


  return (
    <MainMicrosite data={newData}>
      <Box sx={{width: '100%', p: 2, textAlign: 'center', color: theme => theme.palette.secondary.main}}>
        <RenderTitleDesc newData={{...newData}} />
      </Box>
      <Grid container >{/* @ts-ignore */}
        {fields.current.map((field, index) => {
          if (field.type === "text") {
            return (
              <Grid item xs={12} key={index} >
                <RenderTitleDesc newData={{...newData,title: field.title, about: field.text}} />
              </Grid>
            );
          } else if (field.type === "media") {
            console.log({field})
            return (
              <Grid container item xs={12} key={index} spacing={1} >
                {field.files?.map((file: FileType | string, fileIndex: number) => {
                  if (!file){
                    return (
                      <Box key={`mainIt${fileIndex}`} sx={{
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
                  const img = typeof file === "string" ? file : file.content;
                  const {colNumber, width} = calcColNumber(field.files?.length || 0);
                  return (
                    <Grid
                      item
                      xs={colNumber}
                      sx={{
                        mx: 'auto',
                        my: 'auto',
                        textAlign: 'center',
                        zIndex: 1000
                      }}
                      key={`item-${fileIndex}`}>
                      <Tooltip
                        title="Click to enlarge"
                        disableHoverListener={hideTooltip}>
                        <Box
                          key={`img-${fileIndex}`}
                          component="img"
                          src={img}
                          alt="image"
                          sx={{
                            width,
                            cursor: 'pointer',
                            borderRadius: '4px',
                            '&:hover': { boxShadow: '0 0 5px 5px #849abb' }
                          }}
                          onClick={() => { //TODO: onClick of the preview
                            // index.current = fileNumber;
                            // setPreview(x);
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  );
                })}
                {/* <RenderPreview files={x.files} /> */}
              </Grid>
            );
          }
        })
        }
      </Grid>      
    </MainMicrosite>
  );
}

export default LinkedLabel;
