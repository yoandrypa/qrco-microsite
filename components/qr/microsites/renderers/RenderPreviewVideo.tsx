import { useState } from 'react';
import {getUuid} from "../../../../helpers/qr/helpers";

interface PreviewAudiVideoProps {
  content: string;
  type: string
}

export default function RenderPreviewVideo({content, type}: PreviewAudiVideoProps) {
  const [key] = useState(getUuid);

  return (
    <video preload="none" controls key={`${type}${key}`} width={'100%'}>
      <source src={content} type={type}/>
      {'Your browser can not play video files. :('}
    </video>
  )
}
