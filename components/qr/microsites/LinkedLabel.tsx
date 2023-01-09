import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useMediaQuery } from "@mui/material";

import MainMicrosite from "./MainMicrosite";
import { handleFont } from "./renderers/helper";
import { download } from "../../../handlers/storage";
import { FileType } from "../types/types";
import RenderPreview from "./renderers/RenderPreview";
import RenderTitleDesc from "./renderers/RenderTitleDesc";
import RenderContactForm from "../helperComponents/RenderContactForm";
import { randomUUID } from "crypto";

interface LinkedLabelProps {
  newData: any;
}

interface Field {
  type: "text" | "media" | "contact";
  files?: FileType[] | string[];
  title?: string;
  text?: string;
  message?: string;
  buttonText?: string;
  email?: string;
}

function LinkedLabel({ newData }: LinkedLabelProps) {
  const [_, setUnusedState] = useState(); // eslint-disable-line no-unused-vars
  const [preview, setPreview] = useState<FileType | string | null>(null);
  const [hideTooltip, setHideTooltip] = useState<boolean>(false);
  const fields = useRef<Field[]>([]);
  const index = useRef<{ field: number, index: number }>({ field: 0, index: 0 });

  const isWide = useMediaQuery("(min-width:600px)", { noSsr: true });
  const isHeight = useMediaQuery("(min-height:600px)", { noSsr: true });
  const isWide400 = useMediaQuery("(min-width:400px)", { noSsr: true });
  const [virtualFields, setvirtualFields] = useState<Array<Field> | []>([])
  // @ts-ignore
  const forceUpdate = useCallback(() => setUnusedState({}), []);

  const getImages = useCallback((files: object[] | string[], index: number) => {
    try {
      if (newData.fields[index].files.length === 0) {
        fields.current[index].files = [];
        forceUpdate();
        return;
      }
      files.forEach(async (file: any, indexFile: number) => {
        const data = typeof file !== "string" ? await download(file.Key, newData.isSample) : file;
        //@ts-ignore
        fields.current[index].files[indexFile] = data;
        forceUpdate();
      });
    } catch {
      console.log("error");
    }
  }, [forceUpdate, newData.fields, newData.isSample]);

  useEffect(() => {
    let tempFields: Field[] = [];
    newData.fields.forEach((field: any, i: number) => {
      if (field.type === "media") {
        const emptyArray = new Array(field.files.length).fill('false');
        tempFields.push({ type: "media", files: emptyArray });
        getImages(field.files, i);
      } else if (field.type === "contact") {
        tempFields.push({
          type: "contact",
          message: field.message,
          title: field.title,
          buttonText: field.buttonText,
          email: field.email
        });
      } else {
        tempFields.push({ type: "text", text: field.text, title: field.title });
      }
    });
    setvirtualFields(tempFields)
  }, [getImages, newData.fields]);

  useEffect(() => {// ! for now
    setHideTooltip(window.top !== window);
  }, []);

  const calcColNumber = (length: number) => {
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
    return { colNumber, width };
  }


  return (
    <MainMicrosite data={newData}>
      <Box sx={{ width: '100%', p: 2, textAlign: 'center', color: theme => theme.palette.secondary.main }}>
        <RenderTitleDesc newData={{ ...newData }} />
      </Box>
      <Grid container >
        {virtualFields.length > 0 && virtualFields.map((field, index) => {
          { console.log(field, index) }
          if (field.type === "text") {
            return (
              <Grid item xs={12} key={index} >
                <RenderTitleDesc newData={{ ...newData, title: field.title, about: field.text }} />
              </Grid>
            );
          }
          if (field.type === "contact") {
            return (<Grid item xs={12} key={index} spacing={1}>
              <RenderContactForm
                index={index}
                buttonText={field.buttonText || 'Send now'}
                messagePlaceholder={field.message || 'Lets keep in touch'}
                title={field.title || 'You can left your message here'}
              />
            </Grid>);
          }
          if (field.type === "media") {
            const { colNumber, width } = calcColNumber(field.files?.length || 0);
            return (
              <Grid container item xs={12} key={index} spacing={1} >
                {field.files?.map((file: FileType | string, fileIndex: number) => {
                  if (file === 'false')
                    return (<></>);
                  if (!file) {
                    return (
                      <Box key={`mainIt${fileIndex}`} sx={{
                        mt: '5px',
                        width: 'calc(100% - 10px)',
                        ml: '5px',
                        p: 2,
                        border: theme => `solid 1px ${theme.palette.primary.main}`,
                        borderRadius: '5px'
                      }}>
                        <Typography sx={{ color: theme => theme.palette.primary.main, width: '100%', textAlign: 'center', ...handleFont(newData, 'm') }}>
                          <DangerousIcon sx={{ color: theme => theme.palette.secondary.main, mb: '-5px', mr: '5px' }} />
                          {'Error loading image.'}
                        </Typography>
                      </Box>
                    );
                  }
                  const img = typeof file === "string" ? file : file.content;
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
