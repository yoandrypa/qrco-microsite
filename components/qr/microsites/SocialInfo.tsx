import CardContent from "@mui/material/CardContent";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import Grid from "@mui/material/Grid";

interface SocialProps {
  newData: any;
}

export default function SocialInfo({newData}: SocialProps) {
  return (
    <MainMicrosite>
      <CardContent>
        <Grid container spacing={1}>
          <RenderSocials newData={newData} />
        </Grid>
      </CardContent>
    </MainMicrosite>
  );
}
