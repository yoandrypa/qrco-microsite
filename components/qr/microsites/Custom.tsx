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

interface CustomType {
  component: string;
  name?: string;
}

export default function Custom({newData}: CustomProps) {
  const isSections = Boolean(newData.layout?.startsWith('sections'));

  return (
    <MainMicrosite data={newData}>
      <Box sx={{width: '100%', p: 2}}>
        {newData.custom?.map((x: CustomType) => {
          const {component, name} = x;
          return (
            <Box sx={{width: '100%'}} key={`key${component}`}>
              {component === 'address' && <RenderAddress newData={newData} isSections={isSections} sectionName={name}/>}
              {component === 'company' && (newData.company || newData.title || newData.subtitle || newData.companyWebSite ||
                newData.companyEmail || newData.contact || newData.companyPhone || newData.about) && (
                !isSections ? <RenderCompany newData={newData} sectionName={name}/> : (
                  <RenderSectWrapper><RenderCompany newData={newData} sectionName={name}/></RenderSectWrapper>
                )
              )}
              {component === 'date' && (<Box sx={{ml: '20px', mt: '10px'}}>
                {!isSections ? <RenderDate newData={newData} message={name || "Date"}/> : (
                  <RenderSectWrapper><RenderDate newData={newData} message={name || "Date"}/></RenderSectWrapper>
                )}
              </Box>)}
              {component === 'easiness' && newData.easiness && (
                !isSections ? <RenderEasiness newData={newData} sectionName={name} /> : (
                  <RenderSectWrapper><RenderEasiness newData={newData} sectionName={name}/></RenderSectWrapper>
                )
              )}
              {component === 'email' && (newData.email || newData.web) && (
                !isSections ? <RenderEmailWeb newData={newData} sectionName={name} /> : (
                  <RenderSectWrapper><RenderEmailWeb newData={newData} sectionName={name}/></RenderSectWrapper>
                )
              )}
              {component === 'links' && newData.links && (<Box sx={{mt: '10px'}}>
                {!isSections ? <RenderLinks newData={newData}/> : (
                  <RenderSectWrapper><RenderLinks newData={newData}/></RenderSectWrapper>
                )}
              </Box>)}
              {component === 'organization' && (newData.organization || newData.position) && (
                !isSections ? <RenderOrganization newData={newData} sectionName={name}/> : (
                  <RenderSectWrapper><RenderOrganization newData={newData} sectionName={name}/></RenderSectWrapper>
                )
              )}
              {component === 'phones' && (newData.cell || newData.phone || newData.fax) && (
                !isSections ? <RenderPhones newData={newData} sectionName={name}/> : (
                  <RenderSectWrapper><RenderPhones newData={newData} sectionName={name}/></RenderSectWrapper>
                )
              )}
              {component === 'presentation' && (newData.prefix || newData.firstName || newData.lastName) && (
                !isSections ? <RenderName newData={newData} sectionName={name} /> : (
                  <RenderSectWrapper><RenderName newData={newData} sectionName={name} /></RenderSectWrapper>
                )
              )}
              {component === 'opening' && Object.keys(newData.openingTime || []).length && (
                !isSections ? <RenderOpeningTime newData={newData} sectionName={name}/> : (
                  <RenderSectWrapper><RenderOpeningTime newData={newData} sectionName={name}/></RenderSectWrapper>
                )
              )}
              {component === 'socials' && <RenderSocials newData={newData} isSections={isSections} desc={name}/>}
              {component === 'title' && <RenderTitleDesc newData={newData} isSections={isSections}/>}
            </Box>
          )
        })}
      </Box>
    </MainMicrosite>
  );
}
