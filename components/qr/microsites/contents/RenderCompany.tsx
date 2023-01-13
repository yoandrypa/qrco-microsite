import WorkIcon from "@mui/icons-material/Work";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";
import RenderPhones from "./RenderPhones";

interface CompanyProps {
  newData: any;
}

export default function RenderCompany({newData}: CompanyProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <WorkIcon sx={{color: theme => theme.palette.primary.main}}/>
      <Grid container spacing={1} sx={{ml: 1}}>
        <Typography sx={{mt: '5px', ...handleFont(newData, 't')}}>{'Company'}</Typography>
        {newData.company && <RenderField value={newData.company} sx={{my: '-10px', ...handleFont(newData, 's')}}/>}
        {newData.title && <RenderField value={newData.title} sx={{my: '-10px', ...handleFont(newData, 's')}}/>}
        {newData.subtitle && <RenderField value={newData.subtitle} sx={{my: '-10px', ...handleFont(newData, 'm')}}/>}
        {newData.companyWebSite && <RenderField value={newData.companyWebSite} icon="world" sx={{...handleFont(newData, 'm')}}/>}
        {newData.companyEmail && <RenderField value={newData.companyEmail} icon="emailIcon" sx={{...handleFont(newData, 'm')}}/>}
        {newData.contact && <RenderField value={newData.contact} icon="contact" sx={{...handleFont(newData, 'm')}}/>}
        {(newData.companyPhone || newData.companyCell || newData.companyFax) && <RenderPhones newData={newData} />}
        {newData.about && <RenderField value={newData.about} icon="about" sx={{...handleFont(newData, 'm')}}/>}
      </Grid>
    </Grid>
  )
}
