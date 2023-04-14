import {useState} from "react";
import Box from "@mui/material/Box";

import MainMicrosite from "./MainMicrosite";
import RenderHeadLine from "./renderers/RenderHeadLine";
import Waiting from "../../Waiting";
import Notification from "../../Notification";
import RenderComponent from "./customComponents/RenderComponent";
import {clearDataStyles, CustomType, getSeparation} from "./renderers/helper";
import {useRouter} from "next/router";

import dynamic from "next/dynamic";

const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));
const RenderDownloadVCard = dynamic(() => import("./renderers/RenderDownloadVCard"));
const RenderBadge = dynamic(() => import("./renderers/RenderBadge"));
const IconButton = dynamic(() => import("@mui/material/IconButton"));
const ExpandLessIcon = dynamic(() => import("@mui/icons-material/ExpandLess"));
const ExpandMoreIcon = dynamic(() => import("@mui/icons-material/ExpandMore"));

const Custom = ({newData}: any) => {
  const [expander, setExpander] = useState<string[]>([]);

  const router = useRouter();
  const { idx } = router.query;

  const only = (typeof idx === 'string' ? idx.split(/[,\s]+/) : idx)?.map((i) => parseInt(i, 10));
  const styled = clearDataStyles(newData);

  const handleExpand = (item: string) => () => {
    setExpander((prev: string[]) => {
      const newExpander = [...prev];
      const index = newExpander.indexOf(item);
      if (index !== -1) { newExpander.splice(index, 1); }
      else { newExpander.push(item); }
      return newExpander;
    });
  }

  const renderComponent = (x: CustomType, index: number) => {
    const {component, name, data = {}} = x;
    const expand = x.expand || `${component}${index}`;

    if (only && !only.includes(index)) return null;

    if (data) {
      if (['gallery', 'pdf', 'audio', 'video'].includes(component) && newData.isSample) {
        data.isSample = true;
      }
      if (newData.iframed) {
        data.iframed = true;
      }
    }

    const sectStyle = {width: 'calc(100% - 30px)', ml: '30px'} as any;
    if (['title', 'pdf', 'audio', 'video', 'gallery', 'links', 'socials', 'donation', 'easiness'].includes(component) || data?.hideHeadLine) {
      sectStyle.width = 'calc(100% - 16px)';
      sectStyle.px = '10px';
      sectStyle.ml = 1;
    }

    const renderHeadLine = !['title', 'action', 'sku'].includes(component) && !data?.hideHeadLine // @ts-ignore
      && ((component !== 'petId' || data?.petName?.length) || (component !== 'gallery' || newData.qrType !== 'inventory'));

    const isCollapsible = data.sectionArrangement === 'collapsible';
    const isButtonCollapsible = data.sectionArrangement === 'collapseButton';
    const expanded = (isCollapsible || isButtonCollapsible) && expander.includes(expand);

    return (
      <Box sx={{width: '100%'}}>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          {renderHeadLine && (
            <RenderHeadLine
              renderAsButton={isButtonCollapsible} collapsed={!expanded}
              handleCollapse={isButtonCollapsible ? () => handleExpand(expand)() : undefined}
              component={component} stylesData={styled} headLine={component !== 'petId' ? name : data.petName}
              centerHeadLine={data?.centerHeadLine} hideIcon={data?.hideHeadLineIcon} customFont={!data?.customFont ? undefined : {
                headlineFont: data.headlineFont, headlineFontSize: data.headlineFontSize, headLineFontStyle: data.headLineFontStyle
              }}
            />
          )}
          {isCollapsible && (
            <IconButton onClick={handleExpand(expand)}>
              {!expander.includes(expand) ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          )}
        </Box>
        {((!isCollapsible && !isButtonCollapsible) || expanded) && (
          <RenderComponent component={component} index={index} data={data} styled={styled} alternate={newData.alternate} />
        )}
      </Box>
    );
  };

  const { qrType, custom: sections, layout } = newData;
  const startSections = Boolean(layout?.startsWith('sections'));

  const renderSection = (section: CustomType, index: number) => {
    const { topSpacing: tSpacing, bottomSpacing: bSpacing } = section.data || {};
    const mSx = {
      width: '100%',
      mt: (tSpacing && tSpacing !== 'default') ? getSeparation(tSpacing, true) : undefined,
      mb: (bSpacing && bSpacing !== 'default') ? getSeparation(bSpacing, true) : undefined,
    };

    return (
      <>
        <Box sx={mSx} key={`key${section.expand || index}`}>
          {startSections ? (<RenderSectWrapper sx={{width: 'calc(100% - 10px)'}} layout={layout}>
            {renderComponent(section, index)}
          </RenderSectWrapper>) : renderComponent(section, index)}
        </Box>
        <Box sx={{width: '100%', height: '1px'}} />
      </>
    );
  }

  const couponInfo = (qrType === 'coupon') ? sections.find(({ component }: any) => component === 'couponInfo') : null;
  const badge = couponInfo?.data?.badge;

  return (
    <MainMicrosite data={newData}>
      <Waiting />
      <Notification />
      {badge && <RenderBadge badge={badge} stylesData={styled} />}
      <Box sx={{width: '100%', p: 2}}>
        {sections?.map(renderSection)}
      </Box>
      {qrType === 'vcard+' && sections?.length && (
        <RenderDownloadVCard data={{
          ...newData.custom.find((x: { component: string; }) => x.component === 'presentation')?.data,
          ...newData.custom.find((x: { component: string; }) => x.component === 'organization')?.data
        }} styled={styled} />
      )}
    </MainMicrosite>
  );
}

export default Custom;
