import MainMicrosite from "./MainMicrosite";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import Link from 'next/link'
import {getColors, getFont} from "./renderers/helper";
import RenderField from "./renderers/RenderField";
import {humanDate} from "../../helpers/generalFunctions";
import RenderAddress from "./renderers/RenderAddress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RenderBadge from "./renderers/RenderBadge";
import {ColorTypes} from "../types/types";

interface CouponProps {
  newData: any;
}

export default function Coupons({newData}: CouponProps) {
  const colors = getColors(newData) as ColorTypes;

  return (
    <MainMicrosite data={newData}>
      <RenderBadge newData={newData} colors={colors} />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          {(newData.company || newData.title || newData.about || newData.urlOptionLink) && (
            <>
              <Grid item xs={1}>
                <PlaylistAddCheckIcon sx={{color: colors.p}}/>
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{fontWeight: 'bold', fontFamily: getFont(newData)}}>{'Company'}</Typography>
                <Grid container spacing={1}>
                  {newData.company && <RenderField value={newData.company} sx={{fontWeight: 'bold', fontSize: '24px', my: '-10px', fontFamily: getFont(newData)}} />}
                  {newData.title && <RenderField value={newData.title} sx={{fontWeight: 'bold', fontSize: '20px', my: '-10px', fontFamily: getFont(newData)}} />}
                  {newData.about && <RenderField value={newData.about} icon="about" color={colors?.s} sx={{fontFamily: getFont(newData)}} />}
                  {newData.urlOptionLink && (
                    <Grid item xs={12} style={{paddingTop: 0}}>
                      <Link href={newData.urlOptionLink}>
                        <Button
                          variant="contained"
                          sx={{
                            fontFamily: getFont(newData),
                            height: '28px',
                            width: '100%',
                            color: colors.p,
                            background: colors.s,
                            my: '5px',
                            '&:hover': {color: colors.s, background: colors.p}}}>
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
              <ConfirmationNumberIcon sx={{color: colors.p}}/>
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
          <RenderAddress newData={newData} colors={colors} />
        </Grid>
      </Box>
    </MainMicrosite>
  );
}
