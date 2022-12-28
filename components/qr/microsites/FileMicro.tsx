import {useCallback, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DangerousIcon from '@mui/icons-material/Dangerous';

import MainMicrosite from "./MainMicrosite";
import {handleFont, handleDownloadFiles} from "./renderers/helper";
import {download} from "../../../handlers/storage";
import {FileType} from "../types/types";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import RenderPreviewVideo from "./renderers/RenderPreviewVideo";
import RenderPreview from "./renderers/RenderPreview";
import RenderPreviewPdf from "./renderers/RenderPreviewPdf";
import {getExtension} from "../../helpers/generalFunctions";
import RenderTitleDesc from "./renderers/RenderTitleDesc";
import {useMediaQuery} from "@mui/material";

interface FileProps {
  newData: any;
}

// newData.qrType;

export default function FileMicro({ newData }: FileProps) {
  const [preview, setPreview] = useState<FileType | null>(null);
  const [_, setUnusedState] = useState(); // eslint-disable-line no-unused-vars
  const files = useRef<FileType[]>([]);
  const isWide: boolean = useMediaQuery("(min-width:600px)", { noSsr: true });
  const isWide400: boolean = useMediaQuery("(min-width:400px)", { noSsr: true });

  // @ts-ignore
  const forceUpdate = useCallback(() => setUnusedState({}), []);

  const getFiles = (filesInfo: object[] | string []) => {
    try {
      filesInfo.forEach(async (x: any) => {
        const key: string = x.Key;
        const fileData = typeof x !== "string" ? await download(key, newData.isSample) : x; // @ts-ignore
        files.current.push(fileData);
        forceUpdate();
      });
    } catch {
      console.log("error");
    }
  }

  const renderHint = (type: string, index: number) => {
    const kind = newData.qrType === 'audio' ? 'Audio track' : newData.qrType === 'video' ? 'Video track' : 'PDF document';
    return (
      <Typography color="primary" sx={{ width: '100%', textAlign: 'center', ...handleFont(newData, 'm') }}>
        <Typography sx={{ fontWeight: 'bold', display: 'inline-block', mr: 1 }}>
          {kind}
        </Typography>
        {<Typography sx={{display: 'inline-block', ...handleFont(newData, 'm')}}>
          {newData.files?.length ? `${index}/${newData.files.length} (${type.toUpperCase()})` : 'No files to show'}
        </Typography>}
      </Typography>
    );
  };

  useEffect(() => {
    files.current = [];
    if (newData.files?.length) {
      getFiles(newData.files);
    } else {
      forceUpdate();
    }
    return () => {
      files.current = [];
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainMicrosite data={newData}>
      <Box sx={{ p: 2 }}>
        <RenderTitleDesc newData={newData} />
        <Box sx={{ color: theme => theme.palette.secondary.main, textAlign: 'center' }}>
          {newData.files?.length && <Typography sx={{...handleFont(newData, 'm')}}>{'items'}</Typography>}
        </Box>
        {/* @ts-ignore */}
        {files.current.length ? files.current.map((x: FileType, index: number) => {
          const fileNumber = index + 1;
          return (
            <Box key={`mainIt${fileNumber}`} sx={{
              mt: '5px',
              width: 'calc(100% - 10px)',
              ml: '5px',
              p: 2,
              border: theme => `solid 1px ${theme.palette.primary.main}`,
              borderRadius: '5px'
            }}>
              {x ? (
                <>
                  {renderHint(getExtension(x.type), fileNumber)}
                  {newData.qrType === 'audio' && (
                    <audio preload="none" controls key={`audio${fileNumber}`} style={{ width: '100%' }}>
                      <source src={x.content} type={x.type} />
                      {'Your browser can not play audio files. :('}
                    </audio>
                  )}
                  {newData.qrType === 'video' && index === 0 && (
                    <RenderPreviewVideo content={x.content} type={x.type} />
                  )}
                  {newData.qrType === 'pdf' && index == 0 && (
                    <RenderPreviewPdf content={x.content} />
                  )}
                  <Box sx={{ display: 'flex', mb: 2, flexDirection: isWide400 ? 'row' : 'column' }}>
                    <Button
                      sx={{
                        width: '100%',
                        color: theme => theme.palette.primary.main,
                        background: theme => theme.palette.secondary.main,
                        '&:hover': { color: theme => theme.palette.secondary.main, background: theme => theme.palette.primary.main },
                        ...handleFont(newData, 'b')
                      }}
                      variant="outlined"
                      onClick={() => handleDownloadFiles(x, newData.qrType)}
                      startIcon={<DownloadIcon />}
                    >
                      {`Download ${newData.qrType} ${fileNumber}`}
                    </Button>
                    {['video', 'pdf'].includes(newData.qrType) && index !== 0 && (
                      <Button
                        sx={{
                          width: isWide400 ? '30%' : '100%',
                          ml: isWide400 ? '5px' : 0,
                          mt: isWide400 ? 0 : '5px',
                          color: theme => theme.palette.primary.main,
                          background: theme => theme.palette.secondary.main,
                          '&:hover': { color: theme => theme.palette.secondary.main, background: theme => theme.palette.primary.main },
                          ...handleFont(newData, 'b')
                        }}
                        variant="outlined"
                        onClick={() => setPreview(x)}
                      >
                        {'Preview'}
                      </Button>
                    )}
                  </Box>
                </>
              ) : (
                <Typography sx={{ color: theme => theme.palette.primary.main, width: '100%', textAlign: 'center', ...handleFont(newData, 'm') }}>
                  <DangerousIcon sx={{ color: theme => theme.palette.secondary.main, mb: '-5px', mr: '5px' }} />
                  {'Error loading asset.'}
                </Typography>
              )}
            </Box>
          );
        }) : (
          newData.files?.length ? (
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', mt: 2, color: theme => theme.palette.primary.main}}>
              <CircularProgress sx={{color: theme => theme.palette.primary.main, mr: '10px', my: 'auto'}}/>
              <Typography sx={{display: 'inline-block', my: 'auto'}}>{'Please wait...'}</Typography>
            </Box>
          ) : null
        )}
        {preview && (
          <RenderPreview isWide={isWide} preview={preview} type={newData.qrType} handleClose={() => setPreview(null)} sx={{...handleFont(newData, 'm')}} />
        )}
      </Box>
    </MainMicrosite>
  );
}
