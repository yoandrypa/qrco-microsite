import {CustomProps, handleFont} from "../renderers/helper";
import {KeyValues} from "../../types/types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function RenderDetails({data, stylesData}: CustomProps) {
  if (!data?.keyValues || !data.keyValues.length) {
    return null;
  }

  return (
    <Grid container spacing={1} sx={{width: '100%'}}>
      {data.links.map((x: KeyValues, index: number) => (
        <Grid item xs={Boolean(data.splitInTwoColumns) ? 6 : 12} key={`item${index}`}>
          {x.key !== undefined && <Typography sx={{...handleFont(stylesData, 't')}}>{x.key}</Typography>}
          <Typography sx={{...handleFont(stylesData, 'm')}}>{x.value}</Typography>
        </Grid>
        ))}
    </Grid>
  );
}
