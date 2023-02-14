import React from 'react';
import Grid from '@mui/material/Grid';
import MainMicrosite from './MainMicrosite';
import Box from '@mui/material/Box';

import dynamic from 'next/dynamic';
import RenderKeyValueFields from './renderers/RenderKeyValue';
import RenderContactForm from '../helperComponents/RenderContactForm';
import RenderPhones from './contents/RenderPhones';
import {clearDataStyles} from "./renderers/helper";

interface FindMeProps {
  newData: any;
}

const RenderAddress = dynamic(() => import('./contents/RenderAddress'));
const RenderName = dynamic(() => import('./contents/RenderName'));
const RenderSocials = dynamic(() => import('./contents/RenderSocials'));

export default function FindMe({ newData }: FindMeProps) {
  const data = newData.custom?.length ? newData.custom[0] : newData;
  const styled = clearDataStyles(newData);

  return (
    <MainMicrosite data={data}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {(data.prefix || data.firstName || data.lastName)&&<RenderName data={data} stylesData={styled} />}
          <RenderPhones data={data} stylesData={styled} />
          <RenderAddress data={data} stylesData={styled} />
          <RenderKeyValueFields
            newData={data}
            item="otherDetails"
            type="default"
          />
          <RenderKeyValueFields newData={data} item="urls" type="link" />
          <Box
            sx={{
              width: '100%',
              mt: 2,
              display: 'flex',
              justifyContent: 'center'
            }}>
            <RenderSocials data={data} stylesData={styled} />
          </Box>
          {data.contactForm !== undefined && (
            <Grid item xs={12} alignContent={'center'} alignItems={'center'}>
              <RenderContactForm
                buttonText={data.contactForm?.buttonText}
                title={data.contactForm.title}
                messagePlaceholder={data.contactForm.message}
                email={data.contactForm.email}
                micrositeUrl={data.shortlinkurl}
                index={0}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </MainMicrosite>
  );
}
