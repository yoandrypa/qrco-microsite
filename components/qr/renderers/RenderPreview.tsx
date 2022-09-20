/* eslint-disable @next/next/no-img-element */

import {useRef, useState, useEffect} from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

import QrGenerator from "../QrGenerator";
import {BackgroundType, CornersAndDotsType, FramesType, OptionsType} from "../types/types";
import CircularProgress from "@mui/material/CircularProgress";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import PDFGenDlg from "../helperComponents/PDFGenDlg";
import RenderDownload from "../helperComponents/RenderDownload";

interface QRRenderProps {
  qrData: string;
  width: number;
  alt: string;
}

const QRRender = ({ qrData, width, alt }: QRRenderProps) => {
  // noinspection JSDeprecatedSymbols
  return (<img src={`data:image/svg+xml;base64,${btoa(qrData)}`} alt={alt} width={width}/>);
}

interface PreviewProps {
  qrDesign: any;
  name: string;
}

const RenderPreview = ({ qrDesign, name }: PreviewProps) => {
  const [preview, setPreview] = useState<boolean>(false);
  const [qrData, setQrData] = useState<any>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [anchor, setAnchor] = useState<object | null>(null);
  const [generatePdf, setGeneratePdf] = useState<boolean>(false);

  const qrRef = useRef();

  const handlePreView = (): void => {
    setPreview((previous: boolean) => !previous);
  };

  // @ts-ignore
  const handleDownload = ({ currentTarget }) => {
    setAnchor(currentTarget);
  };

  const frame: FramesType | null = qrDesign.frame?.type ? { // frame definition is outside due to it is used in the donwload mechanism
    type: qrDesign.frame?.type,
    text: qrDesign.frame?.text,
    color: qrDesign.frame?.color,
    textColor: qrDesign.frame?.textColor,
    textUp: qrDesign?.textUp || false
  } : null;

  const generateQr = () => {
    const options: OptionsType = {
      width: qrDesign.width,
      height: qrDesign.height,
      type: qrDesign.type,
      data: qrDesign.data,
      image: qrDesign.image,
      margin: qrDesign.margin,
      qrOptions: qrDesign.qrOptions,
      imageOptions: qrDesign.imageOptions,
      dotsOptions: qrDesign.dotsOptions,
      backgroundOptions: qrDesign.backgroundOptions,
      cornersSquareOptions: qrDesign.cornersSquareOptions,
      cornersDotOptions: qrDesign.cornersDotOptions
    };

    const background: BackgroundType = {
      type: qrDesign.background?.type,
      opacity: qrDesign.background?.opacity,
      size: qrDesign.background?.size,
      file: qrDesign.background?.file,
      x: qrDesign.background?.x,
      y: qrDesign.background?.y,
      imgSize: qrDesign.background?.imgSize,
      invert: qrDesign.background?.invert || false,
      backColor: qrDesign.background?.backColor || null
    };

    const cornersData: CornersAndDotsType = qrDesign.corners ? {
      topL: qrDesign.corners.topL,
      topR: qrDesign.corners.topR,
      bottom: qrDesign.corners.bottom
    } : null;

    const dotsData: CornersAndDotsType = qrDesign.cornersDot ? {
      topL: qrDesign.cornersDot.topL,
      topR: qrDesign.cornersDot.topR,
      bottom: qrDesign.cornersDot.bottom
    } : null;

    const render = <QrGenerator
      ref={qrRef}
      options={options}
      frame={frame}
      background={background.file ? background : null}
      cornersData={cornersData}
      dotsData={dotsData}
      overrideValue={undefined}
    />

    // @ts-ignore
    setQrData(render);
  };

  useEffect(() => {
    if (qrData) {
      // @ts-ignore
      const t = qrRef.current?.outerHTML;
      setCurrent(t);
    }
  }, [qrData]);

  useEffect(() => {
    generateQr();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box sx={{ display: 'none' }}>{qrData}</Box>
      <Box onClick={handlePreView} sx={{ cursor: 'pointer' }}>
        {current ? (
          <QRRender qrData={current || ''} width={70} alt={name}/>
        ) : (
          <CircularProgress color="primary" sx={{ mx: 'auto', my: 'auto' }}/>
        )}
      </Box>
      {preview && (
        <Dialog onClose={handlePreView} open={true}>
          <DialogContent>
            <Box sx={{ width: '300px' }}>
              <QRRender qrData={current || ''} width={300} alt={`${name}preview`} />
              <Button sx={{ mt: '10px', width: '100%' }} variant="outlined" onClick={handleDownload} startIcon={<DownloadIcon />}>
                {'Download'}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
      {Boolean(anchor) && (
        <RenderDownload
          frame={frame}
          qrImageData={qrRef.current}
          anchor={anchor}
          setAnchor={setAnchor}
          setGeneratePdf={setGeneratePdf} />
      )}
      {generatePdf && (
        <PDFGenDlg
          data={qrRef.current}
          handleClose={() => setGeneratePdf(false)}
          isFramed={Boolean(frame?.type) && frame?.type !== '/frame/frame0.svg'} />
      )}
    </>
  );
}

export default RenderPreview;
