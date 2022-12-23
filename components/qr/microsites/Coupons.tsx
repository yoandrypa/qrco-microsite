import MainMicrosite from "./MainMicrosite";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import Link from 'next/link'
import {getFont} from "./renderers/helper";
import RenderField from "./renderers/RenderField";
import {humanDate} from "../../helpers/generalFunctions";
import RenderAddress from "./renderers/RenderAddress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RenderBadge from "./renderers/RenderBadge";

interface CouponProps {
  newData: any;
}

export default function Coupons({newData}: CouponProps) {
  return (
    <MainMicrosite data={newData}>
      <RenderBadge newData={newData} />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          {(newData.company || newData.title || newData.about || newData.urlOptionLink) && (
            <>
              <Grid item xs={1}>
                <PlaylistAddCheckIcon sx={{color: theme => theme.palette.primary.main}}/>
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{fontWeight: 'bold', fontFamily: getFont(newData)}}>{'Company'}</Typography>
                <Grid container spacing={1}>
                  {newData.company && <RenderField value={newData.company} sx={{fontWeight: 'bold', fontSize: '24px', my: '-10px', fontFamily: getFont(newData)}} />}
                  {newData.title && <RenderField value={newData.title} sx={{fontWeight: 'bold', fontSize: '20px', my: '-10px', fontFamily: getFont(newData)}} />}
                  {newData.about && <RenderField value={newData.about} icon="about" sx={{fontFamily: getFont(newData)}} />}
                  {newData.urlOptionLink && (
                    <Grid item xs={12} style={{paddingTop: 0}}>
                      <Link href={newData.urlOptionLink}>
                        <Button
                          variant="contained"
                          sx={{
                            fontFamily: getFont(newData),
                            height: '28px',
                            width: '100%',
                            color: theme => theme.palette.primary.main,
                            background: theme => theme.palette.secondary.main,
                            my: '5px',
                            '&:hover': {color: theme => theme.palette.secondary.main, background: theme => theme.palette.primary.main}}}>
                          {newData.urlOptionLabel || 'Get link'}
                        </Button>
                      </Link>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {(newData.name || newData.value || newData.text) && (
            <>
            <Grid item xs={1}>
              <ConfirmationNumberIcon color="primary" />
            </Grid>
            <Grid item xs={11}>
              <Grid container spacing={1}>
                <Typography sx={{fontWeight: 'bold', mt: '10px', ml: '10px', fontFamily: getFont(newData)}}>{'Coupon'}</Typography>
                {newData.name && <RenderField value={newData.name}  sx={{fontSize: '20px', my: '-30px', fontFamily: getFont(newData)}} />}
                {newData.value && <RenderField label="Valid until" value={humanDate(newData.value, 'en', true)} sx={{fontFamily: getFont(newData)}} />}
                {newData.text && <RenderField label="Terms and conditions" value={newData.text} sx={{fontFamily: getFont(newData)}} />}
              </Grid>
            </Grid>
            </>
          )}
          <RenderAddress newData={newData} />
        </Grid>
      </Box>
    </MainMicrosite>
  );
}
