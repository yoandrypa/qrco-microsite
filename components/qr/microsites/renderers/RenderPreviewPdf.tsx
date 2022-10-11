interface RenderPreviewPdf {
  content: string;
  asDialog?: boolean;
}

export default function RenderPreviewPdf({content, asDialog}: RenderPreviewPdf) {
  return (
    <embed src={content} type="application/pdf" width="100%" height={!asDialog ? '300px' : '600px'} />
  );
}
