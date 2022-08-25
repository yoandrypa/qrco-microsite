import { SetStateAction, useMemo, useRef, useState } from 'react';
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
import { Accordion, AccordionSummary, Alert } from '../renderers/Renderers';
import { checkForAlpha, convertBase64, downloadAsSVGOrVerify } from '../../helpers/qr/helpers';

interface GeneratorProps {
  allowEdit?: boolean;
  options: {
    width: number;
    height: number;
    type: string;
    data: string;
    image: string | null;
    margin: number;
    qrOptions: { typeNumber: numeber; mode: string; errorCorrectionLevel: string; };
    imageOptions: { hideBackgroundDots: boolean; imageSize: number; margin: number; crossOrigin: string; };
    dotsOptions: { color: string; type: string; };
    backgroundOptions: { color: string; };
    cornersSquareOptions: { color: string; type: string; };
    cornersDotOptions: { color: string; type: string; };
  };
  goBack?: Function | undefined;
  setOptions: Function;
  logoData?: any;
  setLogoData: Function;
  background: { type: string | null; opacity: number; size: number; file: string; x: number; y: number; imgSize: number; };
  setBackground: Function;
  frame: { type: string | null; text: string; color: string; textColor: string; };
  setFrame: Function;
  overrideValue?: string | undefined;
};

const Generator = ({ options, setOptions, setLogoData, background, setBackground,
  frame, setFrame, overrideValue = undefined, goBack = undefined, allowEdit = false, logoData = null }: GeneratorProps) => {
  const [expanded, setExpanded] = useState<string>('style');
  const [error, setError] = useState<object | null>(null);
  const [anchor, setAnchor] = useState<object | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [generatePdf, setGeneratePdf] = useState<object | null>(null);
  const [isReadable, setIsReadable] = useState<{readable: boolean;} | boolean | null>(null);

  const qrImageData = useRef<object | { outerHTML: string | null; } | null>(null);
  const doneFirst = useRef<boolean>(false);
  const fileInput = useRef<any>();
  const mustReload = useRef<boolean>(false);

  const handleExpand = (panel: SetStateAction<string>) => (_: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleDownload = ({ currentTarget }): void => {
    setAnchor(currentTarget);
  };

  const onLoadFile = ({ target }): void => {
    const f = target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(f);
    img.onload = async () => {
      const base:object = await convertBase64(f);
      const check = await checkForAlpha(f);
      const back = { ...background, file: base };
      if (check?.hasAlpha) {
        if (!back.backColor) {
          back.backColor = '#ffffff';
        }
      } else if (back.backColor) {
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
              <Box sx={{ width: '100%', height: '35px', mt: '-2px' }}>
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
    </>
  );
};

export default Generator;
