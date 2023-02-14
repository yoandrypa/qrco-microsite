import {CustomProps, handleFont} from "../renderers/helper";
import {KeyValues} from "../../types/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function RenderDetails({data, stylesData}: CustomProps) {
  if (!data?.keyValues || !data.keyValues.length) {
    return null;
  }

  return (
    <Box sx={{width: '100%'}}>
      {data.links.map((x: KeyValues, index: number) => (
        <Box key={`item${index}`}>
          {x.key !== undefined && <Typography sx={{...handleFont(stylesData, 't')}}>{x.key}</Typography>}
          <Typography sx={{...handleFont(stylesData, 'm')}}>{x.value}</Typography>
        </Box>
        ))}
    </Box>
  );
}
