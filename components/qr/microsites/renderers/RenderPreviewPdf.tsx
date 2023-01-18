import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import {useEffect, useRef, useState} from "react";
const PdfViewer = dynamic(() => import('./helpers/PdfViewer'), {ssr: false});

interface RenderPreviewPdf {
  content: string;
  height?: number;
  exitFullScreen?: () => void;
  isFullScreen?: boolean;
}

export default function RenderPreviewPdf({content, exitFullScreen, height, isFullScreen}: RenderPreviewPdf) {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const computeSize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }

    window.addEventListener('resize', computeSize);
    computeSize();

    return () => {
      window.removeEventListener('resize', computeSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box ref={ref}>
      <PdfViewer
        content={content}
        width={height !== undefined ? undefined : width}
        height={height}
        exitFullScreen={exitFullScreen}
        isFullScreen={isFullScreen}
      />
    </Box>
  );
}
