import Box from "@mui/material/Box";

import MainMicrosite from "./MainMicrosite";
import RenderImages from "./contents/RenderImages";

import dynamic from "next/dynamic";
import {clearDataStyles} from "./renderers/helper";

const RenderTitleDesc = dynamic(() => import("./contents/RenderTitleDesc"));

interface ImageProps {
  newData: any;
}

function Images({newData}: ImageProps) {
  const data = newData.custom?.length ? newData.custom[0] : newData;
  const styled = clearDataStyles(newData);
  const isSections = Boolean(data.layout?.startsWith('sections'));

  return (
    <MainMicrosite data={newData}>
      <Box sx={{width: '100%', p: 2, textAlign: 'center', color: theme => theme.palette.secondary.main}}>
        <Box sx={isSections ? {width: 'calc(100% + 5px)', ml: '-10px'} : undefined}>
          <RenderTitleDesc data={data} styledData={styled} isSections={isSections} />
        </Box>
      </Box>
      <RenderImages data={data} styled={styled} isSections={isSections} />
    </MainMicrosite>
  );
}

export default Images;
