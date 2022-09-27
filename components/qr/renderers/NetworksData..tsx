import Common from '../helperComponents/Common';
import RenderSocials from "./helpers/RenderSocials";

import {CardDataProps} from "../types/types";

const NetworksData = ({data, setData}: CardDataProps) => {
  return (
    <Common msg="Your social networks. Users can reach you using the social networks.">
      <RenderSocials data={data} setData={setData} />
    </Common>
  );
};

export default NetworksData;
