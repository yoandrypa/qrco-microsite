import {useState} from "react";
import Box from "@mui/material/Box";

import MainMicrosite from "./MainMicrosite";
import {clearDataStyles, CustomType, getSeparation, handleFont} from "./renderers/helper";

import dynamic from "next/dynamic";
import RenderCompItem from "./customComponents/RenderCompItem";
import {TabsProps, TabsType} from "../types/types";
import {capitalize} from "@mui/material";

const TabPanel = dynamic(() => import("./customComponents/TabPanel"));
const Tabs = dynamic(() => import("@mui/material/Tabs"));
const Tab = dynamic(() => import("@mui/material/Tab"));
const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));
const RenderDownloadVCard = dynamic(() => import("./renderers/RenderDownloadVCard"));
const RenderBadge = dynamic(() => import("./renderers/RenderBadge"));

const Custom = ({newData, tabs}: {newData: any; tabs?: number}) => {
  const [expander, setExpander] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>(tabs !== newData.custom.length ? 'home' : (newData.custom?.[0]?.expand || ''));

  const styled = clearDataStyles(newData);

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
          {startSections ? (
            <RenderSectWrapper sx={{width: 'calc(100% - 10px)'}} layout={layout}>
              <RenderCompItem newData={newData} x={section} index={index} expander={expander} styled={styled} setExpander={setExpander} />
            </RenderSectWrapper>
          ) : (
            <RenderCompItem newData={newData} x={section} index={index} expander={expander} styled={styled} setExpander={setExpander} />
          )}
        </Box>
        <Box sx={{width: '100%', height: '1px'}} />
      </>
    );
  }

  const couponInfo = (qrType === 'coupon') ? sections.find(({ component }: any) => component === 'couponInfo') : null;
  const badge = couponInfo?.data?.badge;

  const handleChngTabs = (_: any, newValue: string) => {
    setSelectedTab(newValue);
  };

  const renderTab = (label: string, value: string) => ( // @ts-ignore
    <Tab sx={{ mt: "-10px", mb: "-15px" }} value={value}
         label={<Box component="span" sx={{...handleFont(styled, 't', !newData?.customFont ? undefined : {
             headlineFont: newData.headlineFont,
             headlineFontSize: newData.headlineFontSize,
             headLineFontStyle: newData.headLineFontStyle
         }), textTransform: 'none'}}>{label}</Box>}
    />
  );

  return (
    <MainMicrosite data={newData}>
      {badge && <RenderBadge badge={badge} stylesData={styled} />}
      <Box sx={{width: '100%', p: 2}}>
        {tabs === undefined || tabs === 0 ? sections?.map(renderSection) : (
          <Tabs value={selectedTab} onChange={handleChngTabs} sx={{
            minHeight: '40px', height: '40px', mt: 2, borderBottom: 'solid 1px #0000002b',
            '& .MuiButtonBase-root': {background: '#ffffff10', mt: '-15px'},'& .Mui-selected': {background: '#ffffff25'}
          }}>
            {tabs !== sections.length && renderTab('Home', 'home')}
            {sections.filter((x: TabsType) => x.data?.sectionArrangement === 'tabbed') // @ts-ignore
              .map((x: TabsProps) => renderTab(x.name || capitalize(x.component), x.expand))}
          </Tabs>
        )}
        {!!tabs && (
          <>
            {tabs !== sections.length && (
              <TabPanel showMe={selectedTab === 'home'} key="home">
                {sections.filter((x: TabsType) => x.data?.sectionArrangement !== 'tabbed').map(renderSection)}
              </TabPanel>
            )}
            {sections.filter((x: TabsType) => x.data?.sectionArrangement === 'tabbed').map((x: CustomType) => {
              return (
                <TabPanel key={x.expand} showMe={x.expand === selectedTab}>
                  {renderSection(x, sections.findIndex((x: TabsProps) => x.expand === selectedTab))}
                </TabPanel>
              )
            })}
          </>
        )}
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
