import MainMicrosite from "./MainMicrosite";
import Box from "@mui/material/Box";

import dynamic from "next/dynamic";
import {clearDataStyles} from "./renderers/helper";

const RenderActionButton = dynamic(() => import("./contents/RenderActionButton"));
const RenderText = dynamic(() => import("./contents/RenderText"));
const RenderImages = dynamic(() => import("./contents/RenderImages"));
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

interface CustomType {
  component: string;
  name?: string;
  data?: any;
  expand: string;
}

export default function Custom({newData}: any) {
  const isSections = Boolean(newData.layout?.startsWith('sections'));
  const styled = clearDataStyles(newData);

  return (
    <MainMicrosite data={newData}>
      <Box sx={{width: '100%', p: 2}}>
        {newData.custom?.map((x: CustomType) => {
          const {component, name, data, expand} = x;

          return (
            <Box sx={{width: '100%'}} key={`key${expand}`}>
              {component === 'address' && (
                <RenderAddress stylesData={styled} data={data} isSections={isSections} sectionName={name}/>
              )}
              {component === 'company' && (data?.company || data?.title || data?.subtitle || data?.companyWebSite ||
                data?.companyEmail || data?.contact || data?.companyPhone || data?.about) && (
                !isSections ? <RenderCompany dataStyled={styled} sectionName={name} data={data}/> : (
                  <RenderSectWrapper>
                    <RenderCompany dataStyled={styled} data={data} sectionName={name}/>
                  </RenderSectWrapper>
                )
              )}
              {component === 'date' && (<Box sx={{mt: '10px'}}>
                {!isSections ? <RenderDate data={data} message={name || "Date"} styledData={styled}/> : (
                  <RenderSectWrapper>
                    <RenderDate data={data} message={name || "Date"} styledData={styled}/>
                  </RenderSectWrapper>
                )}
              </Box>)}
              {component === 'easiness' && data?.easiness && (
                !isSections ? <RenderEasiness data={data} sectionName={name} styledData={styled}/> : (
                  <RenderSectWrapper>
                    <RenderEasiness data={data} sectionName={name} styledData={styled}/>
                  </RenderSectWrapper>
                )
              )}
              {component === 'email' && (data?.email || data?.web) && (
                !isSections ? <RenderEmailWeb data={data} sectionName={name} styledData={styled}/> : (
                  <RenderSectWrapper>
                    <RenderEmailWeb data={data} sectionName={name} styledData={styled}/>
                  </RenderSectWrapper>
                )
              )}
              {component === 'links' && data?.links && (<Box sx={{mt: '10px'}}>
                {!isSections ? <RenderLinks data={data} sectionName={name} styledData={styled}/> : (
                  <RenderSectWrapper>
                    <RenderLinks data={data} sectionName={name} styledData={styled}/>
                  </RenderSectWrapper>
                )}
              </Box>)}
              {component === 'organization' && (data?.organization || data?.position) && (
                !isSections ? <RenderOrganization data={data} sectionName={name} styledData={styled}/> : (
                  <RenderSectWrapper>
                    <RenderOrganization data={data} sectionName={name} styledData={styled}/>
                  </RenderSectWrapper>
                )
              )}
              {component === 'phones' && (data?.cell || data?.phone || data?.fax) && (
                !isSections ? <RenderPhones data={data} sectionName={name} styledData={styled}/> : (
                  <RenderSectWrapper>
                    <RenderPhones data={data} sectionName={name} styledData={styled}/>
                  </RenderSectWrapper>
                )
              )}
              {component === 'presentation' && (data?.prefix || data?.firstName || data?.lastName) && (
                !isSections ? <RenderName data={data} sectionName={name} styledData={styled}/> : (
                  <RenderSectWrapper>
                    <RenderName data={data} sectionName={name} styledData={styled}/>
                  </RenderSectWrapper>
                )
              )}
              {component === 'opening' && Object.keys(data?.openingTime || []).length ? (
                !isSections ? <RenderOpeningTime data={data} styledData={styled} sectionName={name}/> : (
                  <RenderSectWrapper>
                    <RenderOpeningTime data={data} sectionName={name} styledData={styled}/>
                  </RenderSectWrapper>
                )
              ) : null}
              {component === 'socials' && (
                <RenderSocials data={data} styledData={styled} isSections={isSections} sectionName={name}/>
              )}
              {component === 'title' && (
                <RenderTitleDesc data={data} isSections={isSections} styledData={styled}/>
              )}
              {component === 'action' && <RenderActionButton styled={styled} data={data} isSections={isSections} />}
              {component === 'single' && (
                <RenderText
                  stylesData={styled}
                  text={data.text || ''}
                  isSections={isSections}
                  sectionName={data.includeTextDescription ? name || 'Text' : undefined} />
              )}
              {component === 'photos' && (
                <RenderImages
                  data={data}
                  styled={styled}
                  isSections={isSections}
                  wrapped
                  sectionName={data?.includeDescription ? name || 'Photos' : undefined}/>
              )}
            </Box>
          )
        })}
      </Box>
    </MainMicrosite>
  );
}
