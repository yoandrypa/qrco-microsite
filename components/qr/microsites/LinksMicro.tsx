import Box from "@mui/material/Box";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./contents/RenderSocials";
import RenderTitleDesc from "./contents/RenderTitleDesc";

import dynamic from "next/dynamic";
import RenderLinks from "./contents/RenderLinks";
const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

export default function LinksMicro({newData}: {
  newData: any;
}) {
  const isSections = Boolean(newData.layout?.startsWith('sections'));

  const renderSocials = (sx?: object) => (
    <Box sx={{...sx, display: 'inline-flex'}}>
      <RenderSocials newData={newData} onlyIcons/>
    </Box>
  );

  return (
    <MainMicrosite data={newData}>
      <Box sx={{p: 2, textAlign: 'center', width: 'calc(100% - 15px)'}}>
        <RenderTitleDesc newData={newData} isSections={isSections} />
        {newData.position === 'over' && (
          !isSections ? renderSocials({my: 2}) : <RenderSectWrapper>{renderSocials({my: 2})}</RenderSectWrapper>
        )}
        {!isSections ? <RenderLinks newData={newData}/> : <RenderSectWrapper><RenderLinks newData={newData}/></RenderSectWrapper>}
        {(newData.position === undefined || newData.position === 'under') && (
          !isSections ? renderSocials({mt: 2}) : <RenderSectWrapper>{renderSocials()}</RenderSectWrapper>
        )}
      </Box>
    </MainMicrosite>
  );
}
