import CardContent from "@mui/material/CardContent";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import Grid from "@mui/material/Grid";
import RenderTitleDesc from "./renderers/RenderTitleDesc";

interface SocialProps {
  newData: any;
}

export default function SocialInfo({newData}: SocialProps) {
  return (
    <MainMicrosite data={newData}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RenderTitleDesc newData={newData} />
          </Grid>
          <RenderSocials newData={newData} />
        </Grid>
      </CardContent>
    </MainMicrosite>
  );
}
