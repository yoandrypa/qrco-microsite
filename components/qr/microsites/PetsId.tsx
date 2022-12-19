import React from 'react';
import Grid from '@mui/material/Grid';
import GetAppIcon from '@mui/icons-material/GetApp';
import MainMicrosite from './MainMicrosite';
import RenderSocials from './renderers/RenderSocials';
import {  getColors } from './renderers/helper';
import { ContactMail, Info, Pets } from '@mui/icons-material';
import { ColorTypes } from '../types/types';
import RenderField from './renderers/RenderField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinkIcon from '@mui/icons-material/Link';
interface PetIdProps {
  newData: any;
}

export default function PetsId({ newData }: PetIdProps) {
  const colors = getColors(newData) as ColorTypes;
  const address = `${newData.address1?`${newData.address1}, `:''}${newData.address2?`${newData.address2}, `:''}${newData.city?`${newData.city}, `:''}${newData.state?`${newData.state}, `:''}${newData.zip?`${newData.zip}, `:''}${newData.country?`${newData.country}, `:''}`;

  const renderUrls = () => {
    
    if (!newData.urls) return (<></>);
    if( newData.urls.items.length === 0 && newData.urls.heading ==='') return (<></>);

    return (
        <>
          <Grid item xs={1} key={'linksIcon'}>
            <LinkIcon sx={{ color: colors.p }} />
          </Grid>
          <Grid item xs={11} key={'linksBody'}>
            <Typography sx={{ fontWeight: 'bold' }}>
              {newData.urls.heading}
            </Typography>
            <Grid container spacing={0}>
              {newData.urls.items.map((item:any, index:Number) => (
                    <RenderField
                      key={`links${index}`}
                      label={item.label}
                      value={item.value}
                      icon={'link'}
                      link={item.value}
                    />
              ))}
            </Grid>
          </Grid>
        </>
      )
  }
  const renderOtherDetails = () => {
    if (!newData.otherDetails) return (<></>);
    if( newData.otherDetails.items.length === 0 && newData.otherDetails.heading ==='') return (<></>);
    return (
      <>
        <Grid item xs={1} key={'otherIcon'}>
          <Info sx={{ color: colors.p }} />
        </Grid>
        <Grid item xs={11} key={'otherBody'}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {newData.otherDetails.heading}
          </Typography>
          <Grid container spacing={0}>
            {newData.otherDetails.items.map((item:any, index:Number) => (
              <Grid container spacing={0} key={`other${index}`}>
                <RenderField
                  key={`otherVal${index}`}
                  label={item.label}
                  value={item.value}
                  sx={{ p:0 }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </>
    )
}
  return (
    <MainMicrosite data={newData}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={0}>
          {newData.petName && (
            <>
              <Grid item xs={1} key='petIcon'>
                <Pets sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11} key='petBody'>
                <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                  {`${newData.petName}`}
                </Typography>
                <RenderField value={`${newData.petBreed? newData.petBreed:''} ${
                    newData.petGender ? newData.petGender : ''
                  } ${newData.petYearOfBirth?newData.petYearOfBirth:''}`} />
              </Grid>
            </>
          )}
          {newData.headingText && (
            <>
              <Grid item xs={1} key='headingIcon'>
                <Info sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11} key='headingBody'>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {newData.headingText}
                </Typography>
                <Grid container spacing={0}>
                  {newData.headingTextText && (
                    <RenderField value={newData.headingTextText} />
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {newData.contactTitle && (
            <>
              <Grid item xs={1} key='contactIcon'>
                <ContactMail sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11} key='contactBody'>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {newData.contactTitle}
                </Typography>
                <Grid container spacing={0}>
                  {newData.name && (
                    <RenderField value={newData.name} label="Name" />
                  )}
                  {newData.email && (
                    <RenderField value={newData.email} icon='email'/>
                  )}
                  {newData.phone && (
                    <RenderField value={newData.phone} icon='cell'/>
                  )}
                  {newData.sms && (
                    <RenderField value={newData.sms} icon='sms'/>
                  )}
                  {newData.fax && (
                    <RenderField value={newData.fax} icon='fax'/>
                  )}
                  {newData.website && (
                    <RenderField value={newData.website} icon='web'/>
                  )}
                  {address && (
                    <RenderField
                      value={address}
                      link={newData.googleMapsLink}
                      icon='location'
                    />
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {renderOtherDetails()}
          {renderUrls()}
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
