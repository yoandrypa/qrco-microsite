import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DangerousIcon from '@mui/icons-material/Dangerous';
import { CircularProgress, useMediaQuery } from "@mui/material";

import MainMicrosite from "./MainMicrosite";
import { handleFont } from "./renderers/helper";
import { download } from "../../../handlers/storage";
import { FileType } from "../types/types";
import RenderPreview from "./renderers/RenderPreview";
import RenderTitleDesc from "./contents/RenderTitleDesc";
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
  const mediaFiles = useRef<any>({});
  // const indexPreview = useRef<{ field: number, index: number }>({ field: 0, index: 0 });
  const [indexPreview, setIndexPreview] = useState<{ field: number, index: number }>({ field: 0, index: 0 });
  const isWide = useMediaQuery("(min-width:600px)", { noSsr: true });
  const isHeight = useMediaQuery("(min-height:600px)", { noSsr: true });
  const isWide400 = useMediaQuery("(min-width:400px)", { noSsr: true });
  const [virtualFields, setVirtualFields] = useState<Array<Field> | []>([])
  // @ts-ignore
  const forceUpdate = useCallback(() => setUnusedState({}), []);

  const fieldLength = (): number => {
    return newData.fields[indexPreview.field].files.length | 0;
  }

  const renderMediaContent = (content: string | undefined, width: any, index: number, fileIndex: number) => {
    if (content === "loading" || content === undefined) {
      return <CircularProgress size={20} />
    }
    return (
      <Box
        key={`media_${index}_${fileIndex}`}
        component="img"
        src={content}
        alt="image"
        sx={{
          width,
          cursor: 'pointer',
          borderRadius: '4px',
          '&:hover': { boxShadow: '0 0 5px 5px #849abb' }
        }}
        onClick={() => {
          //TODO: onClick of the preview
          setIndexPreview({ index: fileIndex, field: index });
          setPreview(mediaFiles.current[`media_${index}_${fileIndex}`]);
        }}
      />
    )
  }
  const getImages = useCallback((files: object[] | string[], index: number) => {

    try {
      files.forEach(async (file: any, indexFile: number) => {
        mediaFiles.current[`media_${index}_${indexFile}`] = "loading"
        forceUpdate();
        const data = typeof file !== "string" ? await download(file.Key, newData.isSample) : file;
        //@ts-ignore
        console.log("data loaded");
        mediaFiles.current[`media_${index}_${indexFile}`] = data;
        forceUpdate();
      });
    } catch (error) {
      console.log({ error });
      console.log("error");
    }
  }, [forceUpdate, newData.fields, newData.isSample]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let tempFields: Field[] = [];
    if (!newData.fields)
      return;
    newData.fields.forEach((field: any, i: number) => {
      switch (field.type) {
        case 'media':
        case 'video':
        case 'gallery':
          const emptyArray = new Array(field.files.length).fill('false');
          tempFields.push({ type: field.type, files: emptyArray });
          getImages(field.files, i);
          break;
        case 'contact':
          tempFields.push({
            type: "contact",
            message: field.message,
            title: field.title,
            buttonText: field.buttonText,
            email: field.email
          });
          break;
        case 'text':
          tempFields.push({ type: "text", text: field.text, title: field.title });
          break;
        default:
          console.log("default");
      }
    });
    setVirtualFields(tempFields)
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
                messagePlaceholder={field.message || 'Say something nice here'}
                title={field.title || 'You can left your message here'}
                email={field.email!}
                micrositeUrl={newData.shortlinkurl}
              />
            </Grid>);
          }
          if (['media', 'gallery', 'video'].includes(field.type)) {
            const { colNumber, width } = calcColNumber(field.files?.length || 0);
            return (
              <Grid container item xs={12} key={index} spacing={1} >
                {field.files?.map((file: FileType | string, fileIndex: number) => {
                  const content = typeof mediaFiles.current[`media_${index}_${fileIndex}`] === "string" ? mediaFiles.current[`media_${index}_${fileIndex}`] : mediaFiles.current[`media_${index}_${fileIndex}`]?.content;
                  if (!file) {
                    return (
                      <Box key={`media_${index}_${fileIndex}`} sx={{
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
                        {renderMediaContent(content, width, index, fileIndex)}
                      </Tooltip>
                    </Grid>
                  );
                })}
              </Grid>
            );
          }
        })
        }
      </Grid>
      {preview && (
        <RenderPreview
          handleNext={() => {
            const field = indexPreview.field;
            const index = indexPreview.index === newData.fields[field].files.length - 1 ?
              indexPreview.index :
              indexPreview.index + 1;
            const content = mediaFiles.current[`media_${field}_${index}`];
            setIndexPreview({ ...indexPreview, index });
            setPreview(content);//! check tis out
          }}
          handlePrev={() => {
            const field = indexPreview.field;
            const index = indexPreview.index === 0 ?
              indexPreview.index :
              indexPreview.index - 1;
            const content = mediaFiles.current[`media_${field}_${index}`];
            setIndexPreview({ ...indexPreview, index });
            setPreview(content);//! check tis out

          }}
          position={indexPreview.index}
          amount={fieldLength()}
          isWide={isWide}
          isHeight={isHeight}
          preview={preview}
          handleClose={() => setPreview(null)}
          type="image"
          sx={{ ...handleFont(newData, 'm') }}
        />
      )}
    </MainMicrosite>
  );
}

export default LinkedLabel;
