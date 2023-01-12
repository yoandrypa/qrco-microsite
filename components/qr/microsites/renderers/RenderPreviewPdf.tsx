interface RenderPreviewPdf {
  content: string;
  asDialog?: boolean;
  height?: string;
}

export default function RenderPreviewPdf({content, height, asDialog}: RenderPreviewPdf) {
  return (
    <embed src={content} type="application/pdf" width="100%" height={height || (!asDialog ? '300px' : '600px')} />
  );
}
