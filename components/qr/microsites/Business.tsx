import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import {clearDataStyles} from "./renderers/helper";
import MainMicrosite from "./MainMicrosite";

import dynamic from "next/dynamic";

const RenderActionButton = dynamic(() => import("./contents/RenderActionButton"));
const RenderPhones = dynamic(() => import("./contents/RenderPhones"));
const RenderSocials = dynamic(() => import("./contents/RenderSocials"));
const RenderAddress = dynamic(() => import("./contents/RenderAddress"));
const RenderOpeningTime = dynamic(() => import("./contents/RenderOpeningTime"));
const RenderCompany = dynamic(() => import("./contents/RenderCompany"));
const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));
const RenderEasiness = dynamic(() => import("./contents/RenderEasiness"));

interface BusinessProps {
  newData: any;
}

export default function Business({newData}: BusinessProps) {
  const styled = clearDataStyles(newData);
  const isSections = Boolean(newData.layout?.startsWith('sections'));

  const renderButton = () => <RenderActionButton styled={styled} data={newData} />;

  const renderCompany = () => (
    <>
      <RenderCompany data={newData} dataStyled={styled}/>
      <RenderPhones data={newData} styledData={styled}/>
    </>
  );

  return (
    <MainMicrosite data={newData}>
      <Grid container spacing={1} sx={{p: 2}}>
        {(newData.index || [0, 1, 2, 3, 4, 5]).map((x: number) => (
          <Box key={`item${x}`} sx={{width: '100%', px: 2, my: 2}}>
            {x === 0 && (newData.company || newData.title || newData.subtitle || newData.companyWebSite ||
              newData.companyEmail || newData.contact || newData.companyPhone || newData.about || newData.companyCell ||
              newData.companyFax) && (
              !isSections ? renderCompany() : <RenderSectWrapper>{renderCompany()}</RenderSectWrapper>
            )}
            {x === 1 && newData.urlOptionLabel && (
              !isSections ? renderButton() : <RenderSectWrapper>{renderButton()}</RenderSectWrapper>
            )}
            {x === 2 && <RenderAddress data={newData} stylesData={styled} isSections={isSections}/>}
            {x === 3 && Object.keys(newData.openingTime || []).length ? (
              !isSections ? <RenderOpeningTime data={newData} styledData={styled}/> :
                <RenderSectWrapper><RenderOpeningTime data={newData} styledData={styled}/></RenderSectWrapper>
            ) : null}
            {x === 4 && newData.easiness && (
              !isSections ? <RenderEasiness data={newData} styledData={styled}/> :
                <RenderSectWrapper><RenderEasiness data={newData} styledData={styled}/></RenderSectWrapper>
            )}
            {x === 5 && (
              <Box sx={{mt: !isSections ? '5px' : 0, width: '100%'}}>
                <RenderSocials data={newData} styledData={styled} desc="Social networks" bold isSections={isSections}/>
              </Box>
            )}
          </Box>
        ))}
      </Grid>
    </MainMicrosite>
  );
}
