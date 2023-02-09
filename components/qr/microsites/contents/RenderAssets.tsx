import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DangerousIcon from '@mui/icons-material/Dangerous';
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {capitalize, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/system";

import MainMicrosite from "../MainMicrosite";
import {handleFont, handleDownloadFiles, handleButtons, clearDataStyles} from "../renderers/helper";
import {download} from "../../../../handlers/storage";
import {FileType} from "../../types/types";
import {getExtension} from "../../../helpers/generalFunctions";

import dynamic from "next/dynamic";

const PleaseWait = dynamic(() => import("../../../PleaseWait"));
const RenderSectWrapper = dynamic(() => import("../renderers/RenderSectWrapper"));
const RenderPreviewVideo = dynamic(() => import("../renderers/RenderPreviewVideo"));
const RenderPreview = dynamic(() => import("../renderers/RenderPreview"));
const RenderPreviewPdf = dynamic(() => import("../renderers/RenderPreviewPdf"));

export default function RenderAssets({ newData }: any) {
  const [preview, setPreview] = useState<FileType | string | null>(null);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [_, setUnusedState] = useState(); // eslint-disable-line no-unused-vars

  const files = useRef<FileType[]>([]);
  const doneFirstRender = useRef<boolean>(false);

  const isWide: boolean = useMediaQuery("(min-width:600px)", { noSsr: true });
  const isWide400: boolean = useMediaQuery("(min-width:400px)", { noSsr: true });

  const data = useMemo(() => newData.custom?.length ? newData.custom[0] : newData, []); // eslint-disable-line react-hooks/exhaustive-deps
  const styled = useMemo(() => clearDataStyles(newData), []); // eslint-disable-line react-hooks/exhaustive-deps
  const isSections = useMemo(() => Boolean(newData.layout?.startsWith('sections')), []); // eslint-disable-line react-hooks/exhaustive-deps

  const theme = useTheme();

  // @ts-ignore
  const forceUpdate = useCallback(() => setUnusedState({}), []);

  const getFiles = (filesInfo: object[] | string []) => {
    try {
      filesInfo.forEach(async (x: any) => {
        const key: string = x.Key;
        const fileData = typeof x !== "string" ? await download(key, data.isSample) : x; // @ts-ignore
        files.current.push(fileData);
        forceUpdate();
      });
    } catch {
      console.log("error");
    }
  }

  const renderHint = (type: string, index: number) => {
    const kind = data.qrType === 'audio' ? 'Audio track' : data.qrType === 'video' ? 'Video track' : 'PDF document';
    return (
      <Typography color="primary" sx={{ width: '100%', textAlign: 'center', ...handleFont(styled, 'm') }}>
        <Typography sx={{ fontWeight: 'bold', display: 'inline-block', mr: 1 }}>
          {kind}
        </Typography>
        {<Typography sx={{display: 'inline-block', ...handleFont(styled, 'm')}}>
          {data.files?.length ? `${index}/${data.files.length} (${type.toUpperCase()})` : 'No files to show'}
        </Typography>}
      </Typography>
    );
  };

  const loadFilesNow = () => {
    files.current = [];
    if (data.files?.length) {
      getFiles(data.files);
    } else {
      forceUpdate();
    }
  }

  useEffect(() => {
    if (doneFirstRender.current) {
      loadFilesNow();
    }
  }, [data.files]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadFilesNow();

    if (window && data.type === 'pdf' && data.autoOpen && data.files.length === 1) {
      setHeight(window.innerHeight);
    }
    doneFirstRender.current = true;
    return () => {
      files.current = [];
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderAssets = () => (
    files.current.length ? files.current.map((x: FileType | string, index: number) => {
      const fileNumber = index + 1;
      let directFile = false;
      let type;
      let content;
      if (typeof x === 'string') {
        type = data.qrType;
        content = x;
      } else {
        type = x.type;
        content = x.content;
      }

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
              {renderHint(!directFile ? getExtension(type) : capitalize(data.qrType), fileNumber)}
              {data.qrType === 'audio' && (
                <audio preload="none" controls key={`audio${fileNumber}`} style={{ width: '100%' }}>
                  <source src={content} type={type} />
                  {'Your browser can not play audio files. :('}
                </audio>
              )}
              {data.qrType === 'video' && index === 0 && (
                <RenderPreviewVideo content={content} type={type} />
              )}
              {data.qrType === 'pdf' && index == 0 && (
                <RenderPreviewPdf content={content} />
              )}
              <Box sx={{ display: 'flex', mb: 2, flexDirection: isWide400 ? 'row' : 'column' }}>
                <Button
                  sx={{width: '100%', ...handleFont(styled, 'b'), ...handleButtons(styled, theme)}}
                  variant="outlined"
                  onClick={() => handleDownloadFiles(x, data.qrType)}
                  startIcon={<DownloadIcon />}
                >
                  {`Download ${data.qrType} ${fileNumber}`}
                </Button>
                {['video', 'pdf'].includes(data.qrType) && (
                  <Button
                    sx={{ width: isWide400 ? '30%' : '100%', ml: isWide400 ? '5px' : 0, mt: isWide400 ? 0 : '5px',
                      ...handleFont(styled, 'b'), ...handleButtons(styled, theme) }}
                    variant="outlined"
                    onClick={() => setPreview(x)}
                  >
                    {'Preview'}
                  </Button>
                )}
              </Box>
            </>
          ) : (
            <Typography sx={{ color: theme => theme.palette.primary.main, width: '100%', textAlign: 'center', ...handleFont(styled, 'm') }}>
              <DangerousIcon sx={{ color: theme => theme.palette.secondary.main, mb: '-5px', mr: '5px' }} />
              {'Error loading asset.'}
            </Typography>
          )}
        </Box>
      );
    }) : (
      data.files?.length ? (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', mt: 2, color: theme => theme.palette.primary.main}}>
          <CircularProgress sx={{color: theme => theme.palette.primary.main, mr: '10px', my: 'auto'}}/>
          <Typography sx={{display: 'inline-block', my: 'auto'}}>{'Please wait...'}</Typography>
        </Box>
      ) : null
    )
  );

  if (data.qrType === 'pdf' && (data.autoOpen || fullScreen)) {
    if (!files.current.length) {
      return <PleaseWait redirecting />;
    }
    return (
      <RenderPreviewPdf
        content={files.current[0].content}
        height={height}
        exitFullScreen={fullScreen ? () => setFullScreen(false) : undefined}
        isFullScreen
      />
    );
  }

  return (
    <MainMicrosite data={data}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ color: theme => theme.palette.secondary.main, textAlign: 'center' }}>
          {data.files?.length && <Typography sx={{...handleFont(styled, 'm')}}>{`${data.files.length} item${data.files.length !== 1 ? 's' : ''}`}</Typography>}
        </Box>
        {!isSections ? renderAssets() : (
          <Box sx={{width: 'calc(100% - 5px)', ml: '-5px'}}>
            <RenderSectWrapper>{renderAssets()}</RenderSectWrapper>
          </Box>
        )}
        {preview && (
          <RenderPreview
            isWide={isWide} preview={preview} type={data.qrType} handleClose={() => setPreview(null)}
            sx={{...handleFont(styled, 'm'), ...handleButtons(styled, theme)}} handleFullScreen={() => setFullScreen(true)} />
        )}
      </Box>
    </MainMicrosite>
  );
}
