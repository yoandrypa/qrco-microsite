import {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";

// despite the PdfViewer component will always be available, and it is a single component it has to be
// loaded dynamically in client side. notice it is loaded clientside (ssr: false).

import dynamic from "next/dynamic";
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
    <Box ref={ref} sx={{border: `solid 1px ${grey[200]}`, mb: 1, borderRadius: '4px'}}>
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
