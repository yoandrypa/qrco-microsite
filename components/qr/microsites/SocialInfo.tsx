import CardContent from "@mui/material/CardContent";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import Grid from "@mui/material/Grid";
import {getColors} from "./renderers/helper";
import {ColorTypes} from "../types/types";
import RenderTitleDesc from "./renderers/RenderTitleDesc";

interface SocialProps {
  newData: any;
}

export default function SocialInfo({newData}: SocialProps) {
  const colors = getColors(newData) as ColorTypes;

  return (
    <MainMicrosite
      type={newData.qrType}
      colors={colors}
      url={newData.shortlinkurl}
      foregndImg={newData.foregndImg}
      backgndImg={newData.backgndImg}
      foregndImgType={newData.foregndImgType}
      isSample={newData.isSample}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RenderTitleDesc newData={newData} colors={colors} />
          </Grid>
          <RenderSocials newData={newData} />
        </Grid>
      </CardContent>
    </MainMicrosite>
  );
}
