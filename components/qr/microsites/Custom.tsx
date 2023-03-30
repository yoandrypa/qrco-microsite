import React, {useCallback} from "react";
import dynamic from "next/dynamic";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {clearDataStyles, getSeparation, handleFont} from "./renderers/helper";

import MainMicrosite from "./MainMicrosite";
import RenderHeadLine from "./renderers/RenderHeadLine";
import Waiting from "../../Waiting";
import Notification from "../../Notification";

const RenderContactForm = dynamic(() => import("./contents/RenderContactForm"));
const RenderSMSData = dynamic(() => import("./contents/RenderSMSData"));
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
const RenderDetails = dynamic(() => import("./contents/RenderDetails"));
const RenderPetsInfo = dynamic(() => import("./contents/RenderPetsInfo"));
const RenderEmail = dynamic(() => import("./contents/RenderEmail"));
const RenderProductSku = dynamic(() => import("./contents/RenderProductSku"));
const RenderDownloadVCard = dynamic(() => import("./renderers/RenderDownloadVCard"));
const RenderWeb = dynamic(() => import("./contents/RenderWeb"));
const RenderBadge = dynamic(() => import("./renderers/RenderBadge"));
const RenderDonation = dynamic(() => import("./contents/Donations"));

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
      ...newData.custom.find((x: { component: string; }) => x.component === 'presentation')?.data,
      ...newData.custom.find((x: { component: string; }) => x.component === 'organization')?.data
    }} styled={styled} />
  ), [styled]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderComponent = (x: CustomType, index: number) => {
    const {component, name, data} = x;

    if (data) {
      if (['gallery', 'pdf', 'audio', 'video'].includes(component) && newData.isSample) {
        data.isSample = true;
      }
      if (newData.iframed) {
        data.iframed = true;
      }
    }

    const sectStyle = {width: 'calc(100% - 30px)', ml: '30px'} as any;
    if (['title', 'pdf', 'audio', 'video', 'gallery', 'links', 'socials'].includes(component)) {
      sectStyle.width = 'calc(100% - 8px)';
      sectStyle.ml = 1;
    }

    return (
      <Box sx={{width: '100%'}}>
        {!['title', 'action', 'sku'].includes(component) && !data?.hideHeadLine // @ts-ignore
          && ((component !== 'petId' || data?.petName?.length) || (component !== 'gallery' || newData.qrType !== 'inventory')) &&
          <RenderHeadLine component={component} stylesData={styled} headLine={component !== 'petId' ? name : data.petName} centerHeadLine={data?.centerHeadLine}/>
        }
        <Box sx={sectStyle}>
          {component === 'address' && <RenderAddress stylesData={styled} data={data}/>}
          {component === 'company' && (data?.company || data?.title || data?.subtitle || data?.companyWebSite ||
              data?.companyEmail || data?.contact || data?.companyPhone || data?.about) &&
            <RenderCompany stylesData={styled} data={data}/>
          }
          {component === 'date' && <RenderDate data={data} stylesData={styled}/>}
          {component === 'easiness' && data?.easiness && <RenderEasiness data={data} styledData={styled}/>}
          {component === 'email' && (data?.email || data?.web) && <RenderEmailWeb data={data} stylesData={styled}/>}
          {component === 'links' && data?.links && <RenderLinks data={data} stylesData={styled} alternate={newData.alternate}/>}
          {component === 'organization' && (data?.organization || data?.position) && <RenderOrganization data={data} stylesData={styled}/>}
          {component === 'phones' && (data?.cell || data?.phone || data?.fax) && <RenderPhones data={data} stylesData={styled}/>}
          {component === 'presentation' && (data?.prefix || data?.firstName || data?.lastName) && <RenderName data={data} stylesData={styled}/>}
          {component === 'opening' && Object.keys(data?.openingTime || []).length ? <RenderOpeningTime data={data} stylesData={styled}/> : null}
          {component === 'socials' && <RenderSocials data={data} stylesData={styled} alternate={newData.alternate}/>}
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
          {component === 'donation' && <RenderDonation stylesData={styled} data={data} index={index}/>}
        </Box>
      </Box>
    );
  };

  function renderSection(section: CustomType, index: number) {
    const { topSpacing: tSpacing, bottomSpacing: bSpacing } = section.data;
    const sSx = { width: 'calc(100% - 10px)' };
    const mSx = {
      width: '100%',
      mt: (tSpacing && tSpacing !== 'default') ? getSeparation(tSpacing, true) : undefined,
      mb: (bSpacing && bSpacing !== 'default') ? getSeparation(bSpacing, true) : undefined,
    };

    const component = renderComponent(section, index);

    return (
      <Box sx={mSx} key={`key${section.expand || index}`}>
        {isSections ? <RenderSectWrapper sx={sSx}>{component}</RenderSectWrapper> : component}
      </Box>
    )
  }

  const { qrType, custom: sections } = newData;
  const couponInfo = (qrType === 'coupon') ? sections.find(({ component }) => component === 'couponInfo') : null;
  const badge = couponInfo?.data?.badge;

  return (
    <MainMicrosite data={newData}>
      <Waiting />
      <Notification />
      <RenderBadge badge={badge} stylesData={styled} />
      <Box sx={{width: '100%', p: 2}}>
        {sections?.map(renderSection)}
      </Box>
      {qrType === 'vcard+' && sections?.length && renderDownloadVCard()}
    </MainMicrosite>
  );
}
