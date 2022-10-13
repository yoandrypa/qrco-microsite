import CardContent from "@mui/material/CardContent";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import Grid from "@mui/material/Grid";

interface DonationsProps {
  newData: any;
}

export default function DonationsInfo({newData}: DonationsProps) {
  return (
    <MainMicrosite>
      <CardContent>
        <Grid container spacing={1}>
         <p>Microsite</p>
        </Grid>
      </CardContent>
    </MainMicrosite>
  );
}
