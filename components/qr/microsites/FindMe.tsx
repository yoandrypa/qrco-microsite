import React from 'react';
import Grid from '@mui/material/Grid';
import MainMicrosite from './MainMicrosite';
import Box from '@mui/material/Box';

import dynamic from 'next/dynamic';
import RenderKeyValueFields from './renderers/RenderKeyValue';
import RenderContactForm from '../helperComponents/RenderContactForm';
import RenderPhones from './contents/RenderPhones';

interface FindMeProps {
  newData: any;
}

const RenderAddress = dynamic(() => import('./contents/RenderAddress'));
const RenderName = dynamic(() => import('./contents/RenderName'));
const RenderSocials = dynamic(() => import('./contents/RenderSocials'));

export default function FindMe({ newData }: FindMeProps) {
  const isSections = Boolean(newData.layout?.startsWith('sections'));

  return (
    <MainMicrosite data={newData}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {(newData.prefix || newData.firstName || newData.lastName)&&<RenderName newData={newData} />}
          <RenderPhones newData={newData} />
          <RenderAddress newData={newData} isSections={isSections} />
          <RenderKeyValueFields
            newData={newData}
            item="otherDetails"
            type="default"
          />
          <RenderKeyValueFields newData={newData} item="urls" type="link" />
          {newData.contactForm !== undefined && (
            <Grid item xs={12} alignContent={'center'} alignItems={'center'}>
              <RenderContactForm
                buttonText={newData.contactForm?.buttonText}
                title={newData.contactForm.title}
                messagePlaceholder={newData.contactForm.message}
                email={newData.contactForm.email}
                micrositeUrl={newData.shortlinkurl}
                index={0}
              />
            </Grid>
          )}

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
