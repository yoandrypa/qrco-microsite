import Box from "@mui/material/Box";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./contents/RenderSocials";
import RenderTitleDesc from "./contents/RenderTitleDesc";

import dynamic from "next/dynamic";
import RenderLinks from "./contents/RenderLinks";
import {clearDataStyles} from "./renderers/helper";
const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

export default function LinksMicro({newData}: {
  newData: any;
}) {
  const data = newData.custom?.length ? newData.custom[0] : newData;
  const styled = clearDataStyles(newData);
  const isSections = Boolean(data.layout?.startsWith('sections'));

  const renderSocials = (sx?: object) => (
    <Box sx={{...sx, display: 'inline-flex'}}>
      <RenderSocials data={data} stylesData={styled} />
    </Box>
  );

  return (
    <MainMicrosite data={newData}>
      <Box sx={{p: 2, textAlign: 'center', width: 'calc(100% - 15px)'}}>
        <RenderTitleDesc data={data} stylesData={styled} />
        {newData.position === 'over' && (
          !isSections ? renderSocials({my: 2}) : <RenderSectWrapper>{renderSocials({my: 2})}</RenderSectWrapper>
        )}
        {!isSections ? <RenderLinks data={data} stylesData={styled}/> : (
          <RenderSectWrapper>
            <RenderLinks data={data} stylesData={styled}/>
          </RenderSectWrapper>
        )}
        {(newData.position === undefined || newData.position === 'under') && (
          !isSections ? renderSocials({mt: 2}) : <RenderSectWrapper>{renderSocials()}</RenderSectWrapper>
        )}
      </Box>
    </MainMicrosite>
  );
}
