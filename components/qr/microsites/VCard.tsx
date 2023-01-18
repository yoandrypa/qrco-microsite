import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import GetAppIcon from '@mui/icons-material/GetApp';
import Box from "@mui/material/Box";
import {useTheme} from "@mui/system";

import MainMicrosite from "./MainMicrosite";

import {downloadVCard, handleButtons, handleFont} from "./renderers/helper";

import dynamic from "next/dynamic";

const RenderAddress = dynamic(() => import("./contents/RenderAddress"));
const RenderSocials = dynamic(() => import("./contents/RenderSocials"));
const RenderEmailWeb = dynamic(() => import("./contents/RenderEmailWeb"));
const RenderOrganization = dynamic(() => import("./contents/RenderOrganization"));
const RenderPhones = dynamic(() => import("./contents/RenderPhones"));
const RenderName = dynamic(() => import("./contents/RenderName"));
const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

export default function VCard({newData}: {newData: any;}) {
  const theme = useTheme();

  const isSections = Boolean(newData.layout?.startsWith('sections'));

  return (
    <MainMicrosite data={newData}>
      <Grid container spacing={1} sx={{p: 2}}>
        {(newData.index || [0, 1, 2]).map((x: number) => (
          <Box key={`item${x}`} sx={{width: '100%', px: 2, my: 2}}>
            {x === 0 && (newData.prefix || newData.firstName || newData.lastName) && (
              !isSections ? <RenderName newData={newData} /> : <RenderSectWrapper><RenderName newData={newData} /></RenderSectWrapper>
            )}
            {x === 0 && (newData.cell || newData.phone || newData.fax) && (
              !isSections ? <RenderPhones newData={newData} /> : <RenderSectWrapper><RenderPhones newData={newData}/></RenderSectWrapper>
            )}
            {x === 0 && (newData.organization || newData.position) && (
              !isSections ? <RenderOrganization newData={newData} /> : <RenderSectWrapper><RenderOrganization newData={newData} /></RenderSectWrapper>
            )}
            {x === 1 && <Box sx={{mt: '-25px'}}><RenderAddress newData={newData} isSections={isSections}/></Box>}
            {x === 1 && (newData.email || newData.web) && (
              !isSections ? <RenderEmailWeb newData={newData} /> : <RenderSectWrapper><RenderEmailWeb newData={newData} /></RenderSectWrapper>
            )}
            {x === 2 && <Box sx={{width: '100%', mt: !isSections ? 2 : 0, display: 'flex', justifyContent: 'center'}}>
              <RenderSocials newData={newData} onlyIcons isSections={isSections}/>
            </Box>}
          </Box>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: '18px' }}>
        <Button
          variant="contained"
          startIcon={<GetAppIcon />}
          sx={{...handleFont(newData, 'b'), ...handleButtons(newData, theme)}}
          onClick={() => downloadVCard({...newData})}
        >{'Get Contact'}</Button>
        <Box sx={{height: '35px'}}/>
      </Box>
    </MainMicrosite>
  );
}
