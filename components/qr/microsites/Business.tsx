import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/system";

import {handleButtons, handleFont} from "./renderers/helper";
import MainMicrosite from "./MainMicrosite";

import dynamic from "next/dynamic";

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
  const theme = useTheme();

  const isSections = Boolean(newData.layout?.startsWith('sections'));

  const renderButton = () => (
    <Grid item xs={12} sx={{textAlign: 'center', pl: '10px'}}>
      <Button
        sx={{my: '10px', width: 'calc(100% - 70px)', ...handleFont(newData, 'b'), ...handleButtons(newData, theme)}}
        target="_blank" component="a" href={newData.urlOptionLink}
        variant="contained">{newData.urlOptionLabel}</Button>
    </Grid>
  );

  const renderCompany = () => (
    <>
      <RenderCompany newData={newData} />
      <RenderPhones newData={newData} />
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
            {x === 2 && <RenderAddress newData={newData} isSections={isSections}/>}
            {x === 3 && Object.keys(newData.openingTime || []).length ? (
                !isSections ? <RenderOpeningTime newData={newData}/> : <RenderSectWrapper><RenderOpeningTime newData={newData}/></RenderSectWrapper>
            ) : null}
            {x === 4 && newData.easiness && (
              !isSections ? <RenderEasiness newData={newData} /> : <RenderSectWrapper><RenderEasiness newData={newData} /></RenderSectWrapper>
            )}
            {x === 5 && <RenderSocials newData={newData} desc="Social networks" bold isSections={isSections}/>}
          </Box>
        ))}
      </Grid>
    </MainMicrosite>
  );
}
