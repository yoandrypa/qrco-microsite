import {useMemo} from "react";
import CardContent from "@mui/material/CardContent";
import MainMicrosite from "./MainMicrosite";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Link from 'next/link'
import {getColors} from "./renderers/helper";


interface CouponProps {
  newData: any;
}

export default function Coupons({newData}: CouponProps) {
  const colors = useMemo(() => (getColors(newData)), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainMicrosite colors={colors} url={newData.shortlinkurl} badge={newData.prefix}>
      <CardContent>
        <Grid container spacing={1}>
          {newData.company && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Company" size="small" fullWidth margin="dense" value={newData.company}/>
          </Grid>)}
          {newData.title && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Title" size="small" fullWidth margin="dense" value={newData.title}/>
          </Grid>)}
          {newData.about && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Description" size="small" fullWidth margin="dense" value={newData.about}/>
          </Grid>)}
          {newData.urlOptionLink && (
            <Grid item xs={12} style={{paddingTop: 0}}>
              <Link href={newData.urlOptionLink}>
                <Button
                  variant="contained"
                  sx={{
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

          {newData.name && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Coupon code" size="small" fullWidth margin="dense" value={newData.name}/>
          </Grid>)}
          {newData.value && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Valid until" size="small" fullWidth margin="dense" value={newData.value}/>
          </Grid>)}
          {newData.text && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Terms and conditions" size="small" fullWidth margin="dense" value={newData.text}/>
          </Grid>)}
          {newData.address && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Address" size="small" fullWidth margin="dense" value={newData.address}/>
          </Grid>)}
          {newData.city && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="City" size="small" fullWidth margin="dense" value={newData.city}/>
          </Grid>)}
          {newData.zip && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Zip code" size="small" fullWidth margin="dense" value={newData.zip}/>
          </Grid>)}
          {newData.state && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="State/Province" size="small" fullWidth margin="dense" value={newData.state}/>
          </Grid>)}
          {newData.country && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Country" size="small" fullWidth margin="dense" value={newData.country}/>
          </Grid>)}
        </Grid>
      </CardContent>
    </MainMicrosite>
  );
}
