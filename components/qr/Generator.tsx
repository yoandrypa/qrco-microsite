// @ts-nocheck

import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DownloadIcon from '@mui/icons-material/Download';
import Snackbar from '@mui/material/Snackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BrushIcon from '@mui/icons-material/Brush';
import Fab from '@mui/material/Fab';
import CropFreeIcon from '@mui/icons-material/CropFree';

import { Accordion, AccordionDetails, AccordionSummary, Alert } from '../renderers/Renderers';

import { checkForAlpha, convertBase64, downloadAsSVGOrVerify } from '../../helpers/qr/helpers';
import { BackgroundType, FramesType, OptionsType } from './types/types';
import Code from './sections/Code';
import Frames from './sections/Frames';
import Logos from './sections/Logos';
import QrGenerator from './QrGenerator';
import { initialFrame } from '../../helpers/qr/data';
import RenderDownload from './helperComponents/RenderDownload';
import PDFGenDlg from './helperComponents/PDFGenDlg';

interface GeneratorProps {
  allowEdit?: boolean;
  options: OptionsType;
  goBack?: Function | undefined;
  setOptions: Function;
  logoData?: any;
  setLogoData: Function;
  background: BackgroundType;
  setBackground: Function;
  frame: FramesType;
  setFrame: Function;
  overrideValue?: string | undefined;
}

const Generator = ({ options, setOptions, setLogoData, background, setBackground,
  frame, setFrame, overrideValue = undefined, goBack = undefined, allowEdit = false, logoData = null }: GeneratorProps) => {
  const [expanded, setExpanded] = useState<string>('style');
  const [error, setError] = useState<object | null>(null);
  const [anchor, setAnchor] = useState<object | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [generatePdf, setGeneratePdf] = useState<object | null>(null);
  const [isReadable, setIsReadable] = useState<{readable: boolean;} | boolean | null>(null);

  const qrImageData = useRef<any>(null);
  const doneFirst = useRef<boolean>(false);
  const fileInput = useRef<any>();
  const mustReload = useRef<boolean>(false);

  const handleExpand = (panel: SetStateAction<string>) => (_: any, newExpanded: SetStateAction<string> | boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDownload = ({ currentTarget }) => {
    setAnchor(currentTarget);
  };

  const onLoadFile = ({ target }) => {
    const f = target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(f);
    img.onload = async () => {
      const base:object = await convertBase64(f);
      const check = await checkForAlpha(f);
      const back = { ...background, file: base };
      if (check?.hasAlpha) {
        if (!Boolean(back.backColor)) {
          back.backColor = '#ffffff';
        }
      } else if (Boolean(back.backColor)) {
        delete back.backColor;
      }
      setBackground(back);
    }
    fileInput.current.value = '';
  };

  const command = (): void => {
    if (mustReload.current) {
      mustReload.current = false;
      setUpdating(true);
    }
  };

  const contrastColors = useMemo(() => {
    if ((!options?.backgroundOptions?.color || !options?.dotsOptions?.color) && options.backgroundOptions.color === '#ffffff00') {
      return undefined;
    }
    return { color1: options.backgroundOptions.color, color2: options.dotsOptions.color };
  }, [options?.backgroundOptions?.color, options?.dotsOptions?.color]);

  const checkForReadability = () => {
    downloadAsSVGOrVerify(qrImageData.current, setIsReadable, contrastColors);
  };

  const handleBackground = (item: string) => (event: { target: { value: string; checked: any; }; color: any; }) => {
    if (event.target) {
      const back = { ...background, [item]: item !== 'invert' ? event.target.value : event.target.checked };
      if (event.target.value === 'solid') {
        back.opacity = 50;
        back.size = 1;
        back.file = null;
        if (back.invert !== undefined) {
          delete back.invert;
        }
        if (back.backColor) {
          delete back.backColor;
        }
      }
      setBackground(back);
    } else if (event.color) {
      setBackground({ ...background, backColor: event.color });
    }
  };

  const handleUpload = () => {
    fileInput.current.click();
  };

  const handleReset = () => {
    setBackground({ ...background, opacity: 50, size: 1, invert: false, x: 0, y: 0, imgSize: 1 });
  };

  const handleMainFrame = (elem: string, payload: any) => {
    if (payload !== null) {
      if (elem === 'image') {
        const selectedFrame = { ...frame, type: payload };
        if (payload === '/frame/frame1.svg' && frame.textColor === '#000000') {
          selectedFrame.textColor = '#ffffff';
        } else if (['/frame/frame2.svg', '/frame/frame3.svg', '/frame/frame4.svg'].includes(payload) && frame.textColor === '#ffffff') {
          selectedFrame.textColor = '#000000';
        }
        setFrame(selectedFrame);
      } else {
        setFrame({ ...frame, [elem]: payload });
      }
    } else {
      setFrame({ ...frame, ...initialFrame });
    }
  };

  const handleFrame = (item: string) => (payload: any) => {
    let value = undefined;
    if (item !== 'text' && payload?.target?.checked !== undefined) {
      value = payload.target.checked;
    } else {
      value = payload?.target?.value || payload?.color || payload?.textColor || payload;
    }
    handleMainFrame(item, value);
  };

  const handleMainData = (item: string, payload: any, icon = null) => {
    const opts = { ...options };
    if (!payload || !payload.file) {
      opts[item] = payload;
      if (logoData) {
        setLogoData(null);
      }
    } else {
      if (icon) {
        setLogoData(icon);
      }
      opts.image = payload.file;
    }
    setOptions(opts);
  };

  const handleData = (item: string) => (payload: any) => {
    const opts = { ...options };
    if (item.includes('.')) {
      const x = item.split('.');
      if (!opts[x[0]]) {
        opts[x[0]] = '';
      }
      if (typeof payload === 'string') {
        opts[x[0]][x[1]] = payload;
      } else if (payload.color) {
        opts[x[0]][x[1]] = payload.color;
      } else {
        opts[x[0]][x[1]] = payload.target.value !== '-1' ? payload.target.value : null;
      }
    } else if (!payload || typeof payload === 'string') {
      opts[item] = payload;
    } else if (item === 'data') {
      opts[item] = payload.target.value.length ? payload.target.value : 'ebanux';
    }
    setOptions(opts);
  };

  useEffect(() => {
    if (isReadable) {
      setTimeout(() => { setIsReadable(null); }, [3700]);
    }
  }, [isReadable]);

  useEffect(() => {
    if (doneFirst.current) {
      const opts = { ...options };
      if (background.type === 'solid') {
        handleReset();
      } else {
        handleUpload();
      }
      setOptions(opts);
    }
  }, [background.type]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (background.type === 'image') {
      setBackground({ ...background, opacity: background.invert ? 100 : 50 });
    }
  }, [background.invert]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (doneFirst.current) {
      const opts = { ...options };
      opts.backgroundOptions.color = background.file ? '#ffffff00' : '#ffffff';
      setOptions(opts);
    }
  }, [background.file]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    mustReload.current = Boolean(options.image);
    if (isReadable) {
      setIsReadable(null);
    }
  }, [options, background]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (updating) {
      setTimeout(() => { setUpdating(false); }, [350]);
    }
    if (!doneFirst.current) {
      doneFirst.current = true;
    }
  }, [updating]);

  return (
    <>
      {error && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={7000}
          onClose={() => { setError(null); }}
        >
          <Alert onClose={() => { setError(null); }} severity="error" sx={{ width: '100%' }}>{error}</Alert>
        </Snackbar>
      )}
      {background.type === 'image' && <input ref={fileInput} type="file" accept="image/*" style={{ display: 'none' }} onChange={onLoadFile} />}
      <Box sx={{ border: '1px solid rgba(0, 0, 0, .125)', borderRadius: '5px', p: 1 }}>
        <Box sx={{ display: 'flex' }}>
          <BrushIcon sx={{ fontSize: '53px', mt: '2px', color: theme => theme.palette.primary.dark }} />
          <Box sx={{ textAlign: 'left', display: 'block' }}>
            <Typography variant="h6">QR Designer</Typography>
            <Typography>QR Code appearance settings</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column' }, m: { sm: 2, xs: 0 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: { sm: '280px', xs: '100%' } }}>
            {updating ? <Typography sx={{ position: 'absolute', ml: 1, mt: 1, color: theme => theme.palette.text.disabled }}>{'Generating QR...'}</Typography> : null}
            <Box sx={{ mt: { sm: 0, xs: 1 } }}>
              <QrGenerator
                ref={qrImageData}
                data={options}
                frame={frame}
                hidden={updating}
                command={command}
                overrideValue={overrideValue}
                background={!background.file ? null : background} />
              <Box sx={{ width: '100%', height: '35px', mt: '-2px', textAlign: 'center' }}>
                {isReadable ? (
                  <Typography sx={{ color: theme => isReadable.readable ? theme.palette.success.dark : theme.palette.error.dark, height: '25px' }}>
                    {`${isReadable.readable ? 'High' : 'Low'} chance to be readable.`}
                  </Typography>
                ) : (
                  <Button variant="contained" onClick={checkForReadability} startIcon={<CropFreeIcon />} sx={{ width: '100%', height: '25px' }}>
                    {'Check for readability'}
                  </Button>
                )}
              </Box>
            </Box>
            <Button sx={{ mt: '10px' }} variant="outlined" onClick={handleDownload} startIcon={<DownloadIcon />}>
              {'Download'}
            </Button>
          </Box>
          <Box sx={{
            width: { sm: '450px', xs: '100%' },
            ml: { sm: 2, xs: 0 },
            mt: { sm: 0, xs: 2 },
            overflow: 'auto',
            textAlign: 'left'
          }}>
            <Accordion expanded={expanded === 'style'} onChange={handleExpand('style')}>
              <AccordionSummary aria-controls="style-content" id="style-header">
                <Typography>Body</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Code
                  background={background}
                  handleBackground={handleBackground}
                  handleData={handleData}
                  options={options}
                  handleUpload={handleUpload}
                  handleReset={handleReset}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'frame'} onChange={handleExpand('frame')}>
              <AccordionSummary aria-controls="frame-content" id="frame-header">
                <Typography>Frame</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Frames frame={frame} handleMainFrame={handleMainFrame} handleFrame={handleFrame} />
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'logo'} onChange={handleExpand('logo')}>
              <AccordionSummary aria-controls="logo-content" id="logo-header">
                <Typography>Logo</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Logos handleMainData={handleMainData} image={logoData} />
              </AccordionDetails>
            </Accordion>
            {allowEdit && (
              <Accordion expanded={expanded === 'msg'} onChange={handleExpand('msg')}>
                <AccordionSummary aria-controls="msg-content" id="msg-header">
                  <Typography>Message</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    size="small"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Message"
                    onChange={handleData('data')}
                    value={options.data}
                  />
                </AccordionDetails>
              </Accordion>
            )}
          </Box>
        </Box>
      </Box>
      {Boolean(anchor) && (
        <RenderDownload
          frame={frame}
          qrImageData={qrImageData.current}
          anchor={anchor}
          setAnchor={setAnchor}
          setGeneratePdf={setGeneratePdf} />
      )}
      {Boolean(generatePdf) && (
        <PDFGenDlg 
          data={qrImageData.current} 
          handleClose={() => setGeneratePdf(false)} 
          isFramed={frame.type && frame.type !== '/frame/frame0.svg'} />
      )}
      {Boolean(goBack) && (<Fab
        sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={goBack}
        variant="extended"
        size="small"
        color="primary"
      >
        <ArrowBackIcon sx={{ mr: { sm: 1, xs: 0 } }} />
        <Typography sx={{ display: { sm: 'block', xs: 'none' } }}>QR Type</Typography>
      </Fab>)}
    </>
  );
};

export default Generator;
