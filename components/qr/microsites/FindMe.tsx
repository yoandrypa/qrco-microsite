import React from 'react';
import Grid from '@mui/material/Grid';
import MainMicrosite from './MainMicrosite';
import Box from '@mui/material/Box';

import dynamic from 'next/dynamic';
import RenderKeyValueFields from './renderers/RenderKeyValue';

interface PetIdProps {
  newData: any;
}

const RenderAddress = dynamic(() => import('./contents/RenderAddress'));
const RenderName = dynamic(() => import('./contents/RenderName'));
const RenderSocials = dynamic(() => import('./contents/RenderSocials'));



export default function PetsId({ newData }: PetIdProps) {
  const isSections = Boolean(newData.layout?.startsWith('sections'));

  return (
    <MainMicrosite data={newData}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={0}>
          <RenderName newData={newData} />
          <RenderAddress newData={newData} isSections={isSections} />
          <RenderKeyValueFields newData={newData} key="otherDetails" type='default'/>
          <RenderKeyValueFields newData={newData} key="urls" type='link'/>
          <Box
            sx={{
              width: '100%',
              mt: 2,
              display: 'flex',
              justifyContent: 'center'
            }}>
            <RenderSocials newData={newData} onlyIcons />
          </Box>
        </Grid>
      </Box>
    </MainMicrosite>
  );
}
