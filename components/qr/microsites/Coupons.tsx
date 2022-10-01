import CardContent from "@mui/material/CardContent";
import MainMicrosite from "./MainMicrosite";
import Grid from "@mui/material/Grid";

interface CouponProps {
  newData: any;
}

export default function Coupons({newData}: CouponProps) {
  return (
    <MainMicrosite>
    <CardContent>
      <Grid container spacing={1}>
        Coupon
      </Grid>
    </CardContent>
    </MainMicrosite>
  );
}
