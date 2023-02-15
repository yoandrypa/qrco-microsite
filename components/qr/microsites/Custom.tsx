import MainMicrosite from "./MainMicrosite";
import Box from "@mui/material/Box";

import dynamic from "next/dynamic";
import {clearDataStyles, handleFont} from "./renderers/helper";
import RenderHeadLine from "./renderers/RenderHeadLine";

import {useCallback} from "react";

const RenderAssets = dynamic(() => import("./contents/RenderAssets"));
const RenderActionButton = dynamic(() => import("./contents/RenderActionButton"));
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
const RenderCouponData = dynamic(() => import("./contents/RenderCouponData"));
const RenderCouponInfo = dynamic(() => import("./contents/RenderCouponInfo"));
const TextField = dynamic(() => import("@mui/material/TextField"));
const RenderDetails = dynamic(() => import("./contents/RenderDetails"));
const RenderPetsInfo = dynamic(() => import("./contents/RenderPetsInfo"));
const RenderEmail = dynamic(() => import("./contents/RenderEmail"));
const RenderProductSku = dynamic(() => import("./contents/RenderProductSku"));
const RenderDownloadVCard = dynamic(() => import("./renderers/RenderDownloadVCard"));
const RenderWeb = dynamic(() => import("./contents/RenderWeb"));

interface CustomType {
  component: string;
  name?: string;
  data?: any;
  expand: string;
}

export default function Custom({newData}: any) {
  const isSections = Boolean(newData.layout?.startsWith('sections'));
  const styled = clearDataStyles(newData);

  const renderDownloadVCard = useCallback(() => (
    <RenderDownloadVCard data={{
      ...newData.custom.find((x: { component: string; }) => x.component === 'presentation').data,
      ...newData.custom.find((x: { component: string; }) => x.component === 'organization').data
    }} styled={styled} />
  ), []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderComponent = (x: CustomType) => {
    const {component, name, data} = x;

    return (
      <Box sx={{width: '100%'}}>
        <Box sx={{width: '50ox'}}>
          {!['title', 'action', 'sku'].includes(component) && !data?.hideHeadLine && ((component !== 'petId' || data?.petName?.length) || // @ts-ignore
              (component !== 'gallery' || newData.qrType !== 'inventory')) &&
            <RenderHeadLine component={component} stylesData={styled} headLine={component !== 'petId' ?
              (component !== 'keyvalue' || newData.qrType !== 'inventory' ? name : 'Location') : data.petName} centerHeadLine={data?.centerHeadLine}/>
          }
        </Box>
        <Box sx={{width: 'calc(100% - 30px)', ml: '30px'}}>
          {component === 'address' && <RenderAddress stylesData={styled} data={data}/>}
          {component === 'company' && (data?.company || data?.title || data?.subtitle || data?.companyWebSite ||
              data?.companyEmail || data?.contact || data?.companyPhone || data?.about) &&
            <RenderCompany stylesData={styled} data={data}/>
          }
          {component === 'date' && <RenderDate data={data} stylesData={styled}/>}
          {component === 'easiness' && data?.easiness && <RenderEasiness data={data} styledData={styled}/>}
          {component === 'email' && (data?.email || data?.web) && <RenderEmailWeb data={data} stylesData={styled}/>}
          {component === 'links' && data?.links && <RenderLinks data={data} stylesData={styled}/>}
          {component === 'organization' && (data?.organization || data?.position) && <RenderOrganization data={data} stylesData={styled}/>}
          {component === 'phones' && (data?.cell || data?.phone || data?.fax) && <RenderPhones data={data} stylesData={styled}/>}
          {component === 'presentation' && (data?.prefix || data?.firstName || data?.lastName) && <RenderName data={data} stylesData={styled}/>}
          {component === 'opening' && Object.keys(data?.openingTime || []).length && <RenderOpeningTime data={data} stylesData={styled}/>}
          {component === 'socials' && <RenderSocials data={data} stylesData={styled}/>}
          {component === 'title' && <RenderTitleDesc data={data} stylesData={styled}/>}
          {component === 'action' && <RenderActionButton stylesData={styled} data={data}/>}
          {component === 'single' && <TextField sx={{...handleFont(styled, 'm')}}>{data.text || ''}</TextField>}
          {component === 'gallery' && <RenderImages data={data} stylesData={styled}/>}
          {['pdf', 'audio', 'video'].includes(component) && <RenderAssets data={data} stylesData={styled}/>}
          {component === 'couponData' && <RenderCouponData stylesData={styled} data={data}/>}
          {component === 'couponInfo' && <RenderCouponInfo stylesData={styled} data={data}/>}
          {component === 'keyvalue' && <RenderDetails stylesData={styled} data={data}/>}
          {component === 'petId' && <RenderPetsInfo stylesData={styled} data={data}/>}
          {component === 'justEmail' && <RenderEmail stylesData={styled} data={data}/>}
          {component === 'web' && (data?.web) && <RenderWeb data={data} stylesData={styled}/>}
          {component === 'sku' && <RenderProductSku stylesData={styled} data={data}/>}
        </Box>
      </Box>
    );
  };

  return (
    <MainMicrosite data={newData}>
      <Box sx={{width: '100%', p: 2}}>
        {newData.custom?.map((x: CustomType) => (
          <Box sx={{width: '100%'}} key={`key${x.expand}`}>
            {!isSections ? renderComponent(x) : <RenderSectWrapper>{renderComponent(x)}</RenderSectWrapper>}
          </Box>
        ))}
      </Box>
      {newData.qrType === 'vcard+' && renderDownloadVCard()}
    </MainMicrosite>
  );
}
