import Box from "@mui/material/Box";

import MainMicrosite from "./MainMicrosite";
import RenderImages from "./contents/RenderImages";

import dynamic from "next/dynamic";

const RenderTitleDesc = dynamic(() => import("./contents/RenderTitleDesc"));

interface ImageProps {
  newData: any;
}

function Images({newData}: ImageProps) {
  const isSections = Boolean(newData.layout?.startsWith('sections'));

  return (
    <MainMicrosite data={newData}>
      <Box sx={{width: '100%', p: 2, textAlign: 'center', color: theme => theme.palette.secondary.main}}>
        <Box sx={isSections ? {width: 'calc(100% + 5px)', ml: '-10px'} : undefined}>
          <RenderTitleDesc newData={newData} isSections={isSections} />
        </Box>
      </Box>
      <RenderImages newData={newData} isSections={isSections} />
    </MainMicrosite>
  );
}

export default Images;
