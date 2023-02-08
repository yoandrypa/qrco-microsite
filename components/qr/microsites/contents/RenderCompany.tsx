import WorkIcon from "@mui/icons-material/Work";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";

interface CompanyProps {
  dataStyled: any;
  data?: any;
  sectionName?: string;
}

export default function RenderCompany({dataStyled, data, sectionName}: CompanyProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex', mt: 2}}>
      <WorkIcon sx={{color: theme => theme.palette.primary.main}}/>
      <Grid container spacing={1} sx={{ml: 1}}>
        <Typography sx={{mt: '5px', ...handleFont(sectionName, 't')}}>{sectionName || 'Company'}</Typography>
        {data?.company &&
          <RenderField value={data.company} sx={{my: '-10px', ...handleFont(dataStyled, 's')}}/>}
        {data?.title &&
          <RenderField value={data.title} sx={{my: '-10px', ...handleFont(dataStyled, 's')}}/>}
        {data?.subtitle &&
          <RenderField value={data.subtitle} sx={{my: '-10px', ...handleFont(dataStyled, 'm')}}/>}
        {data?.companyWebSite &&
          <RenderField value={data.companyWebSite} icon="world" sx={{...handleFont(dataStyled, 'm')}}/>}
        {data?.companyEmail &&
          <RenderField value={data.companyEmail} icon="emailIcon" sx={{...handleFont(dataStyled, 'm')}}/>}
        {data?.contact &&
          <RenderField value={data.contact} icon="contact" sx={{...handleFont(dataStyled, 'm')}}/>}
        {data?.about &&
          <RenderField value={data.about} icon="about" sx={{...handleFont(dataStyled, 'm')}}/>}
      </Grid>
    </Grid>
  )
}
