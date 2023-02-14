import {useMemo} from "react";
import Box from "@mui/material/Box";

import MainMicrosite from "./MainMicrosite";
import {clearDataStyles} from "./renderers/helper";
import RenderAssets from "./contents/RenderAssets";
import RenderTitleDesc from "./contents/RenderTitleDesc";

interface FileProps {
  newData: any;
}

export default function FileMicro({ newData }: FileProps) {
  const data = useMemo(() => newData.custom?.length ? newData.custom[0] : newData, []); // eslint-disable-line react-hooks/exhaustive-deps
  const styled = useMemo(() => clearDataStyles(newData), []); // eslint-disable-line react-hooks/exhaustive-deps
  const isSections = useMemo(() => Boolean(newData.layout?.startsWith('sections')), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainMicrosite data={data}>
      <Box sx={{ p: 2 }}>
        <Box sx={isSections ? {width: 'calc(100% + 5px)', ml: '-10px'} : undefined}>
          <RenderTitleDesc data={data} stylesData={styled} />
        </Box>
        <Box sx={{ color: theme => theme.palette.secondary.main, textAlign: 'center' }}>
          <RenderAssets data={data} stylesData={styled} />
        </Box>
      </Box>
    </MainMicrosite>
  );
}
