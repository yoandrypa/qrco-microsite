import CardContent from "@mui/material/CardContent";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import Grid from "@mui/material/Grid";
import RenderTitleDesc from "./renderers/RenderTitleDesc";

interface SocialProps {
  newData: any;
}

export default function SocialInfo({newData}: SocialProps) {
  const isSections = Boolean(newData.layout?.startsWith('sections'));

  return (
    <MainMicrosite data={newData}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RenderTitleDesc newData={newData} isSections={isSections} />
          </Grid>
          <RenderSocials newData={newData} isSections={isSections} />
        </Grid>
      </CardContent>
    </MainMicrosite>
  );
}
