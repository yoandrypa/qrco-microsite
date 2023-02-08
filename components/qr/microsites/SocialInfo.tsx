import CardContent from "@mui/material/CardContent";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./contents/RenderSocials";
import Grid from "@mui/material/Grid";
import RenderTitleDesc from "./contents/RenderTitleDesc";
import {clearDataStyles} from "./renderers/helper";

interface SocialProps {
  newData: any;
}

export default function SocialInfo({newData}: SocialProps) {
  const data = newData.custom?.length ? newData.custom[0] : newData;
  const styled = clearDataStyles(newData);
  const isSections = Boolean(data.layout?.startsWith('sections'));

  return (
    <MainMicrosite data={newData}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RenderTitleDesc data={data} styledData={styled} isSections={isSections} />
          </Grid>
          <RenderSocials data={newData} styledData={styled} isSections={isSections} />
        </Grid>
      </CardContent>
    </MainMicrosite>
  );
}
