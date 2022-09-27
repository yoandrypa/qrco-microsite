import Box from "@mui/material/Box";

import Common from "../helperComponents/Common";
import RenderSocials from "./helpers/RenderSocials";

import {SocialProps} from "../types/types";

interface NetWorksProps {
  data: SocialProps;
  setData: Function;
}

const NetworksData = ({data, setData}: NetWorksProps) => (
  <Common msg="Your social networks. Users can reach you using the social networks.">
    <Box sx={{ mt: 2 }}>
      <RenderSocials data={data} setData={setData} onlySocialNtwrks />
    </Box>
  </Common>
);

export default NetworksData;
