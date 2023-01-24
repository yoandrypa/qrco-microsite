import {ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import CloseIcon from '@mui/icons-material/Close';

// @ts-ignore
import {Document, Page} from "react-pdf/dist/esm/entry.webpack5";

import {getBase64FromUrl} from "../helper";
import Tooltip from "@mui/material/Tooltip";

interface PdfViewerProps {
  content: string;
  width?: number;
  height?: number;
  exitFullScreen?: () => void;
  isFullScreen?: boolean;
}

export default function PdfViewer({content, width, height, exitFullScreen, isFullScreen}: PdfViewerProps) {
  const [pdfContent, setPdfContent] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [index, setIndex] = useState<number>(1);
  const [isIframed, setIsIframed] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | undefined>(undefined);

  const onDocumentLoadSuccess = ({numPages}: {numPages: number}) => {
    setTotalPages(numPages);
  };

  const next = () => {
    setIndex(prev => prev + 1);
  };

  const previous = () => {
    setIndex(prev => prev - 1);
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const onUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setIndex(+event.currentTarget.value);
  };

  useEffect(() => {
    const conversor = async () => {
      const base = await getBase64FromUrl(content) as string;
      if (base) {
        setPdfContent(base);
      }
    }
    if (window.top !== window) {
      setIsIframed(true);
    }
    conversor();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{width: '100%', position: 'relative', overflowX: 'hidden'}}>
      <Document file={content} onLoadSuccess={onDocumentLoadSuccess} loading={!pdfContent || (!width && !height)}>
        <Page
          pageNumber={index}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          width={width}
        />
      </Document>
      {totalPages > 1 && (
        <Box sx={{
          width: 'calc(100% - 10px)',
          display: 'flex',
          justifyContent: 'space-between',
          position: !isFullScreen ? 'absolute' : 'fixed',
          top: '10px'
        }}>
          <IconButton disabled={index <= 1} sx={{width: '35px', height: '35px'}} onClick={previous}>
            <ArrowBackIosNewIcon/>
          </IconButton>
          {!isIframed && (
            <Typography sx={{cursor: 'pointer', background: 'rgb(0 0 0/17%)', fontWeight: 'bold', color: '#fff', p: 1}} onClick={handleOpen}>
              Page {index || (totalPages ? 1 : '--')} of {totalPages || '--'}
            </Typography>
          )}
          <IconButton disabled={index >= totalPages} onClick={next} sx={{width: '35px', height: '35px'}}>
            <ArrowForwardIosIcon/>
          </IconButton>
        </Box>
      )}
      {exitFullScreen !== undefined && (
        <Box sx={{
          width: 'calc(100% - 10px)', display: 'flex', justifyContent: 'space-between', position: 'fixed', top: '10px'
        }}>
          <Tooltip title="Exit fullscreen">
            <IconButton sx={{
              width: '35px', height: '35px', mt: '40px', position: 'fixed', right: '10px',
              background: theme => theme.palette.error.light,
              '&:hover': {background: theme => theme.palette.error.main}
            }} onClick={exitFullScreen}>
              <CloseIcon sx={{color: '#fff'}} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {anchorEl && (<Popover
        open
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <TextField
          size="small"
          label="Go to page"
          type="number"
          sx={{ width: '200px', p: 1, mt: 2 }}
          onKeyDown={(evt: KeyboardEvent<HTMLInputElement>) =>
            ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
          }
          margin="dense"
          value={index}
          onChange={onUpdate}
          variant="outlined"
          InputProps={{ // @ts-ignore
            inputMode: 'numeric', pattern: '[0-9]+', inputProps: { min: 1, max: totalPages }
          }}
        />
      </Popover>
      )}
    </Box>
  );
}
