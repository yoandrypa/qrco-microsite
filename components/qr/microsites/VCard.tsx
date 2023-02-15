import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/system";

import MainMicrosite from "./MainMicrosite";

import {clearDataStyles} from "./renderers/helper";

import dynamic from "next/dynamic";
import RenderDownloadVCard from "./renderers/RenderDownloadVCard";

const RenderAddress = dynamic(() => import("./contents/RenderAddress"));
const RenderSocials = dynamic(() => import("./contents/RenderSocials"));
const RenderEmailWeb = dynamic(() => import("./contents/RenderEmailWeb"));
const RenderOrganization = dynamic(() => import("./contents/RenderOrganization"));
const RenderPhones = dynamic(() => import("./contents/RenderPhones"));
const RenderName = dynamic(() => import("./contents/RenderName"));
const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

export default function VCard({newData}: {newData: any;}) {
  const theme = useTheme();

  const styled = clearDataStyles(newData);
  const isSections = Boolean(newData.layout?.startsWith('sections'));

  return (
    <MainMicrosite data={newData}>
      <Grid container spacing={1} sx={{p: '13px'}}>
        {(newData.index || [0, 1, 2]).map((x: number) => (
          <Box key={`item${x}`} sx={{width: '100%', px: 2, my: 2}}>
            {x === 0 && (newData.prefix || newData.firstName || newData.lastName) && (
              !isSections ? <RenderName data={newData} stylesData={styled}/> :
                <RenderSectWrapper><RenderName data={newData} stylesData={styled}/></RenderSectWrapper>
            )}
            {x === 0 && (newData.cell || newData.phone || newData.fax) && (
              !isSections ? <RenderPhones data={newData} stylesData={styled}/> :
                <RenderSectWrapper><RenderPhones data={newData} stylesData={styled}/></RenderSectWrapper>
            )}
            {x === 0 && (newData.organization || newData.position) && (
              !isSections ? <RenderOrganization data={newData} stylesData={styled}/> :
                <RenderSectWrapper><RenderOrganization data={newData} stylesData={styled}/></RenderSectWrapper>
            )}
            {x === 1 && <Box sx={{mt: '-25px'}}>
              <RenderAddress data={newData} stylesData={styled}/>
            </Box>}
            {x === 1 && (newData.email || newData.web) && (
              !isSections ? <RenderEmailWeb data={newData} stylesData={styled}/> :
                <RenderSectWrapper><RenderEmailWeb data={newData} stylesData={styled}/></RenderSectWrapper>
            )}
            {x === 2 && <Box sx={{width: '100%', mt: !isSections ? '5px' : 0, display: 'flex', justifyContent: 'center'}}>
              <RenderSocials data={newData} stylesData={styled}/>
            </Box>}
          </Box>
        ))}
      </Grid>
      <RenderDownloadVCard styled={styled} data={newData} />
    </MainMicrosite>
  );
}
