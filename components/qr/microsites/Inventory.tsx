import React from 'react';
import Grid from '@mui/material/Grid';
import MainMicrosite from './MainMicrosite';
import Box from '@mui/material/Box';

import dynamic from 'next/dynamic';

interface InventoryProps {
  newData: any;
}

const RenderAddress = dynamic(() => import('./contents/RenderAddress'));
const RenderName = dynamic(() => import('./contents/RenderName'));
const RenderSocials = dynamic(() => import('./contents/RenderSocials'));
const RenderKeyValueFields = dynamic(
  () => import('./renderers/RenderKeyValue')
);
const RenderProduct = dynamic(() => import('./contents/RenderProduct'));
export default function Inventory({ newData }: InventoryProps) {
  // console.log(JSON.stringify(newData));
  const isSections = Boolean(newData.layout?.startsWith('sections'));
  // console.log('RenderProduct Microsite');
  // console.log({newData});
  return (
    <MainMicrosite data={newData}>
      <Box sx={{ p: 2 }}>
        <RenderProduct newData={newData} />
        <RenderKeyValueFields
          item="otherDetails"
          type={newData?.otherDetails?.type || 'default'}
          newData={newData}
        />
      </Box>
    </MainMicrosite>
  );
}
