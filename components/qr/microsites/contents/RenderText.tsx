import TextField from "@mui/material/TextField";
import {handleFont} from "../renderers/helper";
import RenderSectWrapper from "../renderers/RenderSectWrapper";
import Box from "@mui/material/Box";

interface TextProps {
  stylesData: any;
  text: any;
  isSections?: boolean;
  sectionName?: string;
}

export default function RenderText({stylesData, text, isSections, sectionName}: TextProps) {
  const renderText = () => (
    <Box sx={{my: '10px', ml: '20px'}}>
      {sectionName !== undefined && <TextField sx={{...handleFont(stylesData, 't')}}>{sectionName}</TextField>}
      <TextField sx={{...handleFont(stylesData, 'm')}}>{text}</TextField>
    </Box>
  );

  if (isSections) {
    return <RenderSectWrapper>{renderText()}</RenderSectWrapper>
  }

  return renderText();
}
