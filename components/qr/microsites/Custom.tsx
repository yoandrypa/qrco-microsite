import MainMicrosite from "./MainMicrosite";
import Box from "@mui/material/Box";

import dynamic from "next/dynamic";

const RenderPhones = dynamic(() => import("./contents/RenderPhones"));
const RenderTitleDesc = dynamic(() => import("./contents/RenderTitleDesc"));
const RenderOpeningTime = dynamic(() => import("./contents/RenderOpeningTime"));
const RenderAddress = dynamic(() => import("./contents/RenderAddress"));
const RenderCompany = dynamic(() => import("./contents/RenderCompany"));
const RenderEasiness = dynamic(() => import("./contents/RenderEasiness"));
const RenderEmailWeb = dynamic(() => import("./contents/RenderEmailWeb"));
const RenderOrganization = dynamic(() => import("./contents/RenderOrganization"));
const RenderName = dynamic(() => import("./contents/RenderName"));
const RenderSocials = dynamic(() => import("./contents/RenderSocials"));
const RenderLinks = dynamic(() => import("./contents/RenderLinks"));
const RenderDate = dynamic(() => import("./contents/RenderDate"));
const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

interface CustomProps {
  newData: any;
}

export default function Custom({newData}: CustomProps) {
  const isSections = Boolean(newData.layout?.startsWith('sections'));

  return (
    <MainMicrosite data={newData}>
      <Box sx={{width: '100%', p: 2}}>
        {newData.custom?.map((x: any, index: number) => (
          <Box sx={{width: '100%'}} key={`key${index}`}>
            {x === 'address' && <RenderAddress newData={newData} isSections={isSections} />}
            {x === 'company' && (newData.company || newData.title || newData.subtitle || newData.companyWebSite ||
              newData.companyEmail || newData.contact || newData.companyPhone || newData.about) && (
              !isSections ? <RenderCompany newData={newData} /> : (
                <RenderSectWrapper><RenderCompany newData={newData} /></RenderSectWrapper>
              )
            )}
            {x === 'date' && (<Box sx={{ml: '20px', mt: '10px'}}>
              {!isSections ? <RenderDate newData={newData} message="Date"/> : (
                <RenderSectWrapper><RenderDate newData={newData} message="Date"/></RenderSectWrapper>
              )}
            </Box>)}
            {x === 'easiness' && newData.easiness && (
              !isSections ? <RenderEasiness newData={newData} /> : (
                <RenderSectWrapper><RenderEasiness newData={newData} /></RenderSectWrapper>
              )
            )}
            {x === 'email' && (newData.email || newData.web) && (
              !isSections ? <RenderEmailWeb newData={newData} /> : (
                <RenderSectWrapper><RenderEmailWeb newData={newData} /></RenderSectWrapper>
              )
            )}
            {x === 'links' && newData.links && (<Box sx={{mt: '10px'}}>
              {!isSections ? <RenderLinks newData={newData}/> : (
                <RenderSectWrapper><RenderLinks newData={newData}/></RenderSectWrapper>
              )}
            </Box>)}
            {x === 'organization' && (newData.organization || newData.position) && (
              !isSections ? <RenderOrganization newData={newData} /> : (
                <RenderSectWrapper><RenderOrganization newData={newData} /></RenderSectWrapper>
              )
            )}
            {x === 'phones' && (newData.cell || newData.phone || newData.fax) && (
              !isSections ? <RenderPhones newData={newData} /> : (
                <RenderSectWrapper><RenderPhones newData={newData} /></RenderSectWrapper>
              )
            )}
            {x === 'presentation' && (newData.prefix || newData.firstName || newData.lastName) && (
              !isSections ? <RenderName newData={newData} /> : (
                <RenderSectWrapper><RenderName newData={newData} /></RenderSectWrapper>
              )
            )}
            {x === 'opening' && Object.keys(newData.openingTime || []).length && (
              !isSections ? <RenderOpeningTime newData={newData} /> : (
                <RenderSectWrapper><RenderOpeningTime newData={newData} /></RenderSectWrapper>
              )
            )}
            {x === 'socials' && <RenderSocials newData={newData} isSections={isSections} />}
            {x === 'title' && <RenderTitleDesc newData={newData} isSections={isSections} />}
          </Box>
        ))}
      </Box>
    </MainMicrosite>
  );
}
