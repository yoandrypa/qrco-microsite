import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import WorkIcon from '@mui/icons-material/Work';
import GetAppIcon from '@mui/icons-material/GetApp';

import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import {downloadVCard, getFont} from "./renderers/helper";

import RenderField from "./renderers/RenderField";
import RenderAddress from "./renderers/RenderAddress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface VCardProps {
  newData: any;
}

export default function VCard({newData}: VCardProps) {
  function downloadFile() {
    downloadVCard({...newData});
  }

  return (
    <MainMicrosite data={newData}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          {(newData.prefix || newData.firstName || newData.lastName) && (
            <>
              <Grid item xs={1}>
                <AccountBoxIcon sx={{ color: theme => theme.palette.primary.main }} />
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', fontFamily: getFont(newData) }}>
                  {`${newData.prefix ? newData.prefix + 
                  (newData.firstName || newData.lastName ? ', ' : '') : ''}${newData.firstName ? 
                  newData.firstName + (newData.lastName ? ' ' : '') : ''}${newData.lastName ? newData.lastName : ''}`}
                </Typography>
              </Grid>
            </>
          )}
          {(newData.cell || newData.phone || newData.fax) && (
            <>
              <Grid item xs={1}>
                <RingVolumeIcon sx={{ color: theme => theme.palette.primary.main }} />
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={1}>
                  {newData.cell &&
                    <RenderField value={newData.cell} icon="cell" size={newData.phone ? 6 : 12} sx={{fontFamily: getFont(newData)}} />}
                  {newData.phone &&
                    <RenderField value={newData.phone} icon="phone" size={newData.cell ? 6 : 12} sx={{fontFamily: getFont(newData)}} />}
                  {newData.fax && <RenderField value={newData.fax} icon="fax" />}
                </Grid>
              </Grid>
            </>
          )}
          {(newData.organization || newData.position) && (
            <>
              <Grid item xs={1}>
                <WorkIcon sx={{ color: theme => theme.palette.primary.main }} />
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ fontWeight: 'bold', fontFamily: getFont(newData) }}>{'Organization info'}</Typography>
                <Grid container spacing={0}>
                  {newData.organization && <RenderField label="Organization" value={newData.organization} sx={{fontFamily: getFont(newData)}}/>}
                  {newData.position && <RenderField label="Position" value={newData.position} sx={{fontFamily: getFont(newData)}}/>}
                </Grid>
              </Grid>
            </>
          )}
          <RenderAddress newData={newData} />
          {(newData.email || newData.web) && (
            <>
              <Grid item xs={1}>
                <MarkAsUnreadIcon sx={{ color: theme => theme.palette.primary.main }} />
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={1} sx={{ mt: '-16px' }}>
                  {newData.email && <RenderField icon="emailIcon" value={newData.email} sx={{fontFamily: getFont(newData)}}/>}
                  {newData.web && <RenderField icon="world" value={newData.web} sx={{fontFamily: getFont(newData)}}/>}
                </Grid>
              </Grid>
            </>
          )}
          <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center' }}>
            <RenderSocials newData={newData} onlyIcons/>
          </Box>
        </Grid>
      </Box>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<GetAppIcon />}
          sx={{my: '10px', color: theme => theme.palette.secondary.main, background: theme => theme.palette.primary.main,
            '&:hover': {color: theme => theme.palette.primary.main, background: theme => theme.palette.secondary.main}, fontFamily: getFont(newData)}}
          onClick={downloadFile}
        >{'Get Contact'}</Button>
      </CardActions>
    </MainMicrosite>
  );
}
