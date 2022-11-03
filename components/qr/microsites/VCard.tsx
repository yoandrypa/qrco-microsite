import {useMemo} from "react";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import WorkIcon from '@mui/icons-material/Work';
import GetAppIcon from '@mui/icons-material/GetApp';

import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import {downloadVCard, getColors} from "./renderers/helper";

import {ColorTypes} from "../types/types";

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

  const colors = useMemo(() => (getColors(newData)), []) as ColorTypes; // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainMicrosite
      colors={colors}
      url={newData.shortlinkurl}
      type={newData.qrType}
      foregndImg={newData.foregndImg}
      backgndImg={newData.backgndImg}
      foregndImgType={newData.foregndImgType}>
      <CardContent>
        <Grid container spacing={1}>
          {(newData.prefix || newData.firstName || newData.lastName) && (
            <>
              <Grid item xs={1}>
                <AccountBoxIcon sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
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
                <RingVolumeIcon sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={1}>
                  {newData.cell &&
                    <RenderField value={newData.cell} icon="cell" color={newData.secondary} size={newData.phone ? 6 : 12}/>}
                  {newData.phone &&
                    <RenderField value={newData.phone} icon="phone" color={newData.secondary} size={newData.cell ? 6 : 12}/>}
                  {newData.fax && <RenderField value={newData.fax} icon="fax" color={newData.secondary} />}
                </Grid>
              </Grid>
            </>
          )}
          {(newData.organization || newData.position) && (
            <>
              <Grid item xs={1}>
                <WorkIcon sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ fontWeight: 'bold' }}>{'Organization info'}</Typography>
                <Grid container spacing={0}>
                  {newData.organization && <RenderField label="Organization" value={newData.organization}/>}
                  {newData.position && <RenderField label="Position" value={newData.position}/>}
                </Grid>
              </Grid>
            </>
          )}
          <RenderAddress newData={newData} colors={colors} />
          {(newData.email || newData.web) && (
            <>
              <Grid item xs={1}>
                <MarkAsUnreadIcon sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={1} sx={{ mt: '-16px' }}>
                  {newData.email && <RenderField icon="emailIcon" color={newData.secondary} value={newData.email}/>}
                  {newData.web && <RenderField icon="world" color={newData.secondary} value={newData.web}/>}
                </Grid>
              </Grid>
            </>
          )}
          <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center' }}>
            <RenderSocials newData={newData} onlyIcons/>
          </Box>
        </Grid>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<GetAppIcon />}
          sx={{my: '10px', color: colors.s, background: colors.p, '&:hover': {color: colors.p, background: colors.s} }}
          onClick={downloadFile}
        >{'Get Contact'}</Button>
      </CardActions>
    </MainMicrosite>
  );
}
