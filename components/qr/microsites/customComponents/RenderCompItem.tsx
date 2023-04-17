import Box from "@mui/material/Box";
import RenderHeadLine from "../renderers/RenderHeadLine";
import RenderComponent from "./RenderComponent";
import {CustomType} from "../renderers/helper";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";

const IconButton = dynamic(() => import("@mui/material/IconButton"));
const ExpandLessIcon = dynamic(() => import("@mui/icons-material/ExpandLess"));
const ExpandMoreIcon = dynamic(() => import("@mui/icons-material/ExpandMore"));

interface ItemProps {
  newData: any;
  x: CustomType;
  index: number;
  expander: string[];
  styled: any;
  setExpander: Function;
}

export default function RenderCompItem({newData, x, index, expander, setExpander, styled}: ItemProps) {
  const {component, name, data = {}} = x;
  const expand = x.expand || `${component}${index}`;

  const router = useRouter();
  const { idx } = router.query;
  const only = (typeof idx === 'string' ? idx.split(/[,\s]+/) : idx)?.map(i => +i);

  const handleExpand = (item: string) => () => {
    setExpander((prev: string[]) => {
      const newExpander = [...prev];
      const index = newExpander.indexOf(item);
      if (index !== -1) { newExpander.splice(index, 1); }
      else { newExpander.push(item); }
      return newExpander;
    });
  }

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
}
