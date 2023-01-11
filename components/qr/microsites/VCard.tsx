import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import WorkIcon from '@mui/icons-material/Work';
import GetAppIcon from '@mui/icons-material/GetApp';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/system";

import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import {downloadVCard, handleButtons, handleFont} from "./renderers/helper";

import RenderField from "./renderers/RenderField";
import RenderAddress from "./renderers/RenderAddress";

import dynamic from "next/dynamic";

const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

export default function VCard({newData}: {newData: any;}) {
  const theme = useTheme();

  const isSections = Boolean(newData.layout?.startsWith('sections'));

  const renderName = () => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <AccountBoxIcon sx={{ color: theme => theme.palette.primary.main, mt: '5px' }} />
      <Typography sx={{ml: 1, ...handleFont(newData, 't')}}>
        {`${newData.prefix ? newData.prefix +
          (newData.firstName || newData.lastName ? ', ' : '') : ''}${newData.firstName ?
          newData.firstName + (newData.lastName ? ' ' : '') : ''}${newData.lastName ? newData.lastName : ''}`}
      </Typography>
    </Grid>
  );

  const renderPhones = () => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <RingVolumeIcon sx={{ color: theme => theme.palette.primary.main, mt: '5px' }} />
      <Grid container spacing={1} sx={{ml: '1px'}}>
        {newData.cell &&
          <RenderField value={newData.cell} icon="cell" size={newData.phone ? 6 : 12} sx={{...handleFont(newData, 'm')}} />}
        {newData.phone &&
          <RenderField value={newData.phone} icon="phone" size={newData.cell ? 6 : 12} sx={{...handleFont(newData, 'm')}} />}
        {newData.fax && <RenderField value={newData.fax} icon="fax" sx={{...handleFont(newData, 'm')}}/>}
      </Grid>
    </Grid>
  );

  const renderOrganization = () => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <WorkIcon sx={{ color: theme => theme.palette.primary.main, mt: '5px' }} />
      <Box sx={{ml: 1}}>
        <Typography sx={{ ...handleFont(newData, 't') }}>{'Organization info'}</Typography>
        <Grid container spacing={0}>
          {newData.organization && <RenderField label="Organization" value={newData.organization} sx={{...handleFont(newData, 'm')}}/>}
          {newData.position && <RenderField label="Position" value={newData.position} sx={{...handleFont(newData, 'm')}}/>}
        </Grid>
      </Box>
    </Grid>
  );

  const renderEmails = () => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <MarkAsUnreadIcon sx={{ color: theme => theme.palette.primary.main }} />
      <Grid container spacing={1} sx={{ mt: '-16px', ml: '1px' }}>
        {newData.email && <RenderField icon="emailIcon" value={newData.email} sx={{...handleFont(newData, 'm')}}/>}
        {newData.web && (
          <Box sx={{width: '100%', mt: '-7px', ml: '7px'}}>
            <RenderField icon="world" value={newData.web} sx={{...handleFont(newData, 'm')}}/>
          </Box>
        )}
      </Grid>
    </Grid>
  );

  return (
    <MainMicrosite data={newData}>
      <Grid container spacing={1} sx={{p: 2}}>
        {(newData.index || [0, 1, 2]).map((x: number) => (
          <Box key={`item${x}`} sx={{width: '100%', px: 2, my: 2}}>
            {x === 0 && (newData.prefix || newData.firstName || newData.lastName) && (
              !isSections ? renderName() : <RenderSectWrapper>{renderName()}</RenderSectWrapper>
            )}
            {x === 0 && (newData.cell || newData.phone || newData.fax) && (
              !isSections ? renderPhones() : <RenderSectWrapper>{renderPhones()}</RenderSectWrapper>
            )}
            {x === 0 && (newData.organization || newData.position) && (
              !isSections ? renderOrganization() : <RenderSectWrapper>{renderOrganization()}</RenderSectWrapper>
            )}
            {x === 1 && <RenderAddress newData={newData} isSections={isSections}/>}
            {x === 1 && (newData.email || newData.web) && (
              !isSections ? renderEmails() : <RenderSectWrapper>{renderEmails()}</RenderSectWrapper>
            )}
            {x === 2 && <Box sx={{width: '100%', mt: !isSections ? 2 : 0, display: 'flex', justifyContent: 'center'}}>
              <RenderSocials newData={newData} onlyIcons isSections={isSections}/>
            </Box>}
          </Box>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: '18px' }}>
        <Button
          variant="contained"
          startIcon={<GetAppIcon />}
          sx={{...handleFont(newData, 'b'), ...handleButtons(newData, theme)}}
          onClick={() => downloadVCard({...newData})}
        >{'Get Contact'}</Button>
        <Box sx={{height: '35px'}}/>
      </Box>
    </MainMicrosite>
  );
}
