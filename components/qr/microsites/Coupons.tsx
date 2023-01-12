import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/system";

import Link from "next/link";
import dynamic from "next/dynamic";

import MainMicrosite from "./MainMicrosite";
import {handleButtons, handleFont} from "./renderers/helper";
import RenderField from "./renderers/RenderField";
import {humanDate} from "../../helpers/generalFunctions";
import RenderAddress from "./contents/RenderAddress";
import RenderBadge from "./renderers/RenderBadge";

const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

export default function Coupons({newData}: {newData: any;}) {
  const theme = useTheme();

  const isSections = Boolean(newData.layout?.startsWith('sections'));

  const renderCompany = () => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <PlaylistAddCheckIcon sx={{color: theme => theme.palette.primary.main}}/>
      <Box sx={{ml: 1}}>
        <Typography sx={{mt: '-3px', ...handleFont(newData, 't')}}>{'Company'}</Typography>
        <Grid container spacing={1}>
          {newData.company && (
            <RenderField value={newData.company} sx={{my: '-10px', ...handleFont(newData, 's')}} />
          )}
          {newData.title && (
            <RenderField value={newData.title} sx={{my: '-10px', ...handleFont(newData, 's')}} />
          )}
          {newData.about && (
            <RenderField value={newData.about} icon="about" sx={{...handleFont(newData, 'm')}} />
          )}
          {newData.urlOptionLink && (
            <Grid item xs={12} style={{paddingTop: 0}}>
              <Link href={newData.urlOptionLink}>
                <Button
                  variant="contained"
                  sx={{
                    height: '28px', width: '100%', my: '5px',
                    ...handleFont(newData, 'b'),
                    ...handleButtons(newData,  theme)
                  }}>
                  {newData.urlOptionLabel || 'Get link'}
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </Box>
    </Grid>
  );

  const renderCoupon = () => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <ConfirmationNumberIcon color="primary" />
      <Box sx={{ml: 1}}>
        <Typography sx={{mt: '-2px', ...handleFont(newData, 't')}}>{'Coupon'}</Typography>
        <Grid container spacing={1}>
          {newData.name && <RenderField value={newData.name} sx={{my: '-30px', ...handleFont(newData, 'm')}} />}
          {newData.value && (
            <RenderField label="Valid until" value={humanDate(newData.value, 'en', true)}
                         sx={{...handleFont(newData, 'm')}} />
          )}
          {newData.text && (
            <RenderField label="Terms and conditions" value={newData.text} sx={{...handleFont(newData, 'm')}} />
          )}
        </Grid>
      </Box>
    </Grid>
  );

  return (
    <MainMicrosite data={newData}>
      <RenderBadge newData={newData} />
      {(newData.index || [0, 1, 2]).map((x: number) => (
        <Grid container spacing={1} sx={{p: 2}} key={`item${x}`}>
          {x === 0 && (newData.company || newData.title || newData.about || newData.urlOptionLink) && (
            !isSections ? renderCompany() : <RenderSectWrapper>{renderCompany()}</RenderSectWrapper>
          )}
          {x === 1 && (newData.name || newData.value || newData.text) && (
            !isSections ? renderCoupon() : <RenderSectWrapper>{renderCoupon()}</RenderSectWrapper>
          )}
          {x === 2 && <RenderAddress newData={newData} isSections={isSections} />}
        </Grid>
      ))}
    </MainMicrosite>
  );
}
