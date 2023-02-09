import WorkIcon from "@mui/icons-material/Work";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";
import RenderDate from "./RenderDate";

interface CompanyProps {
  dataStyled: any;
  data?: any;
  sectionName?: string;
}

export default function RenderCouponData({dataStyled, data, sectionName}: CompanyProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex', mt: 2}}>
      <WorkIcon sx={{color: theme => theme.palette.primary.main}}/>
      <Grid container spacing={1} sx={{ml: 1}}>
        <Typography sx={{mt: '5px', ...handleFont(sectionName, 't')}}>{sectionName || 'Promotion info'}</Typography>
        {data?.name &&
          <RenderField value={data.name} sx={{my: '-10px', ...handleFont(dataStyled, 'm')}} label="Coupon code"/>}
        {data?.data &&
          <RenderDate data={data.data} styledData={dataStyled} message="Valid until"/>}
        {data?.text &&
          <RenderField
            value={data.text}
            label="Description"
            sx={{...handleFont(dataStyled, 'm')}}/>
        }
      </Grid>
    </Grid>
  )
}
