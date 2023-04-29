import { handleFont } from "../renderers/helper";
import { sectionsQrTypes } from "../componets";

import Box from "@mui/material/Box";
import dynamic from "next/dynamic";

const Typography = dynamic(() => import("@mui/material/Typography"));
const RenderContactForm = dynamic(() => import("../contents/RenderContactForm"));
const RenderSMSData = dynamic(() => import("../contents/RenderSMSData"));
const RenderAssets = dynamic(() => import("../contents/RenderAssets"));
const RenderActionButton = dynamic(() => import("../contents/RenderActionButton"));
const RenderImages = dynamic(() => import("../contents/RenderImages"));
const RenderPhones = dynamic(() => import("../contents/RenderPhones"));
const RenderTitleDesc = dynamic(() => import("../contents/RenderTitleDesc"));
const RenderOpeningTime = dynamic(() => import("../contents/RenderOpeningTime"));
const RenderAddress = dynamic(() => import("../contents/RenderAddress"));
const RenderCompany = dynamic(() => import("../contents/RenderCompany"));
const RenderEasiness = dynamic(() => import("../contents/RenderEasiness"));
const RenderEmailWeb = dynamic(() => import("../contents/RenderEmailWeb"));
const RenderOrganization = dynamic(() => import("../contents/RenderOrganization"));
const RenderName = dynamic(() => import("../contents/RenderName"));
const RenderSocials = dynamic(() => import("../contents/RenderSocials"));
const RenderLinks = dynamic(() => import("../contents/RenderLinks"));
const RenderDate = dynamic(() => import("../contents/RenderDate"));
const RenderCouponData = dynamic(() => import("../contents/RenderCouponData"));
const RenderCouponInfo = dynamic(() => import("../contents/RenderCouponInfo"));
const RenderDetails = dynamic(() => import("../contents/RenderDetails"));
const RenderPetsInfo = dynamic(() => import("../contents/RenderPetsInfo"));
const RenderEmail = dynamic(() => import("../contents/RenderEmail"));
const RenderProductSku = dynamic(() => import("../contents/RenderProductSku"));
const RenderWeb = dynamic(() => import("../contents/RenderWeb"));

interface RenderCompProps {
  component: string;
  index: number;
  data?: any;
  styled?: any;
  alternate?: boolean;
}

export default function RenderComponent({component, index, data, styled, alternate}: RenderCompProps) {
  const sectStyle = {width: 'calc(100% - 30px)', ml: '30px'} as any;
  if (['title', 'pdf', 'audio', 'video', 'gallery', 'links', 'socials', 'donation', 'easiness'].includes(component) || data?.hideHeadLine) {
    sectStyle.width = 'calc(100% - 16px)';
    sectStyle.px = '10px';
    sectStyle.ml = 1;
  }

  const sQrType = sectionsQrTypes[component];
  if (sQrType?.renderView) return (
    <Box sx={sectStyle}>
      {sQrType?.renderView({ data, index, stylesData: styled })}
    </Box>
  );

  return (
    <Box sx={sectStyle}>
      {component === 'address' && <RenderAddress stylesData={styled} data={data}/>}
      {component === 'company' && (data?.company || data?.title || data?.subtitle || data?.companyWebSite ||
        data?.companyEmail || data?.contact || data?.companyPhone || data?.about || data?.companyCell ||
        data?.companyFax || data?.whatsapp) && <RenderCompany stylesData={styled} data={data}/>
      }
      {component === 'date' && <RenderDate data={data} stylesData={styled}/>}
      {component === 'easiness' && data?.easiness && <RenderEasiness data={data} styledData={styled}/>}
      {component === 'email' && (data?.email || data?.web) && <RenderEmailWeb data={data} stylesData={styled}/>}
      {['links', 'buttons'].includes(component) && data?.links && (
        <RenderLinks data={data} stylesData={styled} alternate={alternate} isButtons={component==='buttons'}/>
      )}
      {component === 'organization' && (data?.organization || data?.position) && <RenderOrganization data={data} stylesData={styled}/>}
      {component === 'phones' && (data?.cell || data?.phone || data?.fax || data?.whatsapp) && <RenderPhones data={data} stylesData={styled}/>}
      {component === 'presentation' && (data?.prefix || data?.firstName || data?.lastName) && <RenderName data={data} stylesData={styled}/>}
      {component === 'opening' && Object.keys(data?.openingTime || []).length ? <RenderOpeningTime data={data} stylesData={styled}/> : null}
      {component === 'socials' && <RenderSocials data={data} stylesData={styled} alternate={alternate}/>}
      {component === 'title' && <RenderTitleDesc data={data} stylesData={styled}/>}
      {component === 'action' && <RenderActionButton stylesData={styled} data={data}/>}
      {component === 'single' && <Typography sx={{...handleFont(styled, 'm')}}>{data?.text || ''}</Typography>}
      {component === 'gallery' && <RenderImages data={data} stylesData={styled}/>}
      {['pdf', 'audio', 'video'].includes(component) && <RenderAssets data={{...data,qrType: component}} stylesData={styled}/>}
      {component === 'couponData' && <RenderCouponData stylesData={styled} data={data}/>}
      {component === 'couponInfo' && <RenderCouponInfo stylesData={styled} data={data}/>}
      {component === 'keyvalue' && <RenderDetails stylesData={styled} data={data}/>}
      {component === 'tags' && <Typography sx={{...handleFont(styled, 'm')}}>{data?.tags?.length ? data.tags.join(', ') : ''}</Typography>}
      {component === 'petId' && <RenderPetsInfo stylesData={styled} data={data}/>}
      {component === 'justEmail' && <RenderEmail stylesData={styled} data={data}/>}
      {component === 'web' && (data?.web) && <RenderWeb data={data} stylesData={styled}/>}
      {component === 'sku' && <RenderProductSku stylesData={styled} data={data}/>}
      {component === 'contact' && <RenderContactForm stylesData={styled} data={data} index={index}/>}
      {component === 'sms' && <RenderSMSData stylesData={styled} data={data}/>}
    </Box>
  )
}
