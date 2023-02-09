import WorkIcon from "@mui/icons-material/Work";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";
import RenderActionButton from "./RenderActionButton";

interface CompanyProps {
  dataStyled: any;
  data?: any;
  sectionName?: string;
  isSections?: boolean;
}

export default function RenderCouponInfo({dataStyled, data, sectionName, isSections}: CompanyProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex', mt: 2}}>
      <WorkIcon sx={{color: theme => theme.palette.primary.main}}/>
      <Grid container spacing={1} sx={{ml: 1}}>
        <Typography sx={{mt: '5px', ...handleFont(sectionName, 't')}}>{sectionName || 'Coupon info'}</Typography>
        {data?.company &&
          <RenderField value={data.company} sx={{my: '-10px', ...handleFont(dataStyled, 'm')}} label="Company"/>}
        {data?.title &&
          <RenderField value={data.title} sx={{my: '-10px', ...handleFont(dataStyled, 'm')}} label="Title"/>}
        {data?.description &&
          <RenderField
            value={data.description}
            sx={{my: '-10px', ...handleFont(dataStyled, 'm')}}
            label="Description"/>
        }
        {data?.urlOptionLabel &&
          <RenderActionButton styled={dataStyled} data={data} isSections={isSections || false} />}
      </Grid>
    </Grid>
  );
}
