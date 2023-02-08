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
import {clearDataStyles, handleButtons, handleFont} from "./renderers/helper";
import RenderField from "./renderers/RenderField";
import RenderBadge from "./renderers/RenderBadge";

const RenderDate = dynamic(() => import("./contents/RenderDate"));
const RenderAddress = dynamic(() => import("./contents/RenderAddress"));
const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

export default function Coupons({newData}: {newData: any;}) {
  const theme = useTheme();

  const data = newData.custom?.length ? newData.custom[0] : newData;
  const styled = clearDataStyles(newData);
  const isSections = Boolean(data.layout?.startsWith('sections'));

  const renderCompany = () => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <PlaylistAddCheckIcon sx={{color: theme => theme.palette.primary.main}}/>
      <Box sx={{ml: 1}}>
        <Typography sx={{mt: '-3px', ...handleFont(styled, 't')}}>{'Company'}</Typography>
        <Grid container spacing={1}>
          {data.company && (
            <RenderField value={data.company} sx={{my: '-10px', ...handleFont(styled, 's')}} />
          )}
          {data.title && (
            <RenderField value={data.title} sx={{my: '-10px', ...handleFont(styled, 's')}} />
          )}
          {data.about && (
            <RenderField value={data.about} icon="about" sx={{...handleFont(styled, 'm')}} />
          )}
          {data.urlOptionLink && (
            <Grid item xs={12} style={{paddingTop: 0}}>
              <Link href={data.urlOptionLink}>
                <Button
                  variant="contained"
                  sx={{
                    height: '28px', width: '100%', my: '5px',
                    ...handleFont(styled, 'b'),
                    ...handleButtons(styled,  theme)
                  }}>
                  {data.urlOptionLabel || 'Get link'}
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
        <Typography sx={{mt: '-2px', ...handleFont(styled, 't')}}>{'Coupon'}</Typography>
        <Grid container spacing={1}>
          {data.name && <RenderField value={data.name} sx={{my: '-30px', ...handleFont(styled, 'm')}} />}
          {data.value && <Box sx={{ml: '-25px'}}><RenderDate data={data} styledData={styled} message="Valid until" /></Box>}
          {data.text && (
            <RenderField label="Terms and conditions" value={data.text} sx={{...handleFont(styled, 'm')}} />
          )}
        </Grid>
      </Box>
    </Grid>
  );

  return (
    <MainMicrosite data={data}>
      <RenderBadge newData={data} />
      {(data.index || [0, 1, 2]).map((x: number) => (
        <Grid container spacing={1} sx={{p: 2}} key={`item${x}`}>
          {x === 0 && (data.company || data.title || data.about || data.urlOptionLink) && (
            !isSections ? renderCompany() : <RenderSectWrapper>{renderCompany()}</RenderSectWrapper>
          )}
          {x === 1 && (data.name || data.value || data.text) && (
            !isSections ? renderCoupon() : <RenderSectWrapper>{renderCoupon()}</RenderSectWrapper>
          )}
          {x === 2 && <RenderAddress data={data} stylesData={styled} isSections={isSections} />}
        </Grid>
      ))}
    </MainMicrosite>
  );
}
