import { useMemo, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import GetAppIcon from '@mui/icons-material/GetApp';

import MainMicrosite, { MicrositesProps } from './MainMicrosite';
import RenderSocials from './renderers/RenderSocials';
import {  getColors } from './renderers/helper';
import { ContactMail, Dangerous, Info, Pets } from '@mui/icons-material';
import { ColorTypes, FileType } from '../types/types';
import { SocialNetworksType } from '../types/types';
import RenderField from './renderers/RenderField';
import RenderAddress from './renderers/RenderAddress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinkIcon from '@mui/icons-material/Link';
interface PetData extends MicrositesProps {
  qrType: string;
  petName: string;
  petSpecie: string;
  petBreed?: string;
  petGender?: string;
  petYearOfBirth?: string;
  // petPhoto?: string;
  // petPhotoAlt?: string;
  heading: string;
  subHeading: string;
  contact?: {
    title: string;
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    sms?: string;
    fax?: string;
    website?: string;
    address?: {
      street1: string;
      street2?: string;
      city: string;
      state: string;
      zip: string;
      action?: {
        text: string;
        googleMapsLink: string;
      };
    };
  };
  headingText?: {
    heading: string;
    text: string;
  };
  images?: {
    typeGrid?: string;
    images: [image: string];
  };
  otherDetails?: [
    otherDetail: {
      header?: {
        title: string;
        description: string;
      };
      details: [detail: { key: string; value: string }];
    }
  ];
  links?: {
    header?: {
      title: string;
      description: string;
    };
    links: [link: { title: string; subTitle: string; link: string }];
  };
  socials?: [SocialNetworksType];
}

interface PetIdProps {
  newData: PetData;
}

export default function PetsId({ newData }: PetIdProps) {
  console.log('newData', newData);


  const colors = useMemo(() => getColors(newData), []) as ColorTypes; // eslint-disable-line react-hooks/exhaustive-deps

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
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                  {`${newData.petName}`}
                </Typography>
                <Typography sx={{ fontSize: '12px' }}>
                  {`${newData.petSpecie} ${newData.petBreed} ${
                    newData.petGender ? newData.petGender : ''
                  } ${newData.petYearOfBirth}`}
                </Typography>
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
                  {newData.headingText.heading}
                </Typography>
                <Grid container spacing={0}>
                  {newData.headingText.text && (
                    <RenderField value={newData.headingText.text} />
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {newData.contact && (
            <>
              <Grid item xs={1} key='contactIcon'>
                <ContactMail sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11} key='contactBody'>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {newData.contact.title}
                </Typography>
                <Grid container spacing={0}>
                  {newData.contact.name && (
                    <RenderField value={newData.contact.name} />
                  )}
                  {newData.contact.email && (
                    <RenderField value={newData.contact.email} icon='email'/>
                  )}
                  {newData.contact.phone && (
                    <RenderField value={newData.contact.phone} icon='cell'/>
                  )}
                  {/* {newData.contact.location && (
                    <RenderField link={newData.contact.location} icon='location'/>
                  )} */}
                  {newData.contact.sms && (
                    <RenderField value={newData.contact.sms} icon='sms'/>
                  )}
                  {newData.contact.fax && (
                    <RenderField value={newData.contact.fax} icon='fax'/>
                  )}
                  {newData.contact.website && (
                    <RenderField value={newData.contact.website} icon='web'/>
                  )}
                  {newData.contact.address && (
                    <RenderField
                      value={`${newData.contact.address.street1}, ${ newData.contact.address.street2 ? `${newData.contact.address.street2},` : ''} ${newData.contact.address.city}, ${newData.contact.address.state}, ${newData.contact.address.zip}`}
                      icon='location'
                    />
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {newData.otherDetails && (
            <>
              <Grid item xs={1} key={'otherIcon'}>
                <Info sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11} key={'otherBody'}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {'Other Details'}
                </Typography>
                <Grid container spacing={0}>
                  {newData.otherDetails.map((item, index) => (
                    <Grid container spacing={0} key={`other${index}`}>
                      {item.header && (
                        <RenderField
                          label={item.header.title}
                          value={item.header.description}
                          size={20}
                        />
                      )}
                      {item.details.map((detail, index) => (
                        <RenderField
                          key={`otherVal${index}`}
                          label={detail.key}
                          value={detail.value}
                          size={16}
                          sx={{ p:0 }}
                        />
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          )}
          {newData.links && (
            <>
              <Grid item xs={1} key={'linksIcon'}>
                <LinkIcon sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11} key={'linksBody'}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {newData.links.header?.title}
                </Typography>
                <Grid container spacing={0}>
                  {newData.links.header?.description && (
                    <RenderField value={newData.links.header?.description} />
                  )}
                  {newData.links.links.map((item, index) => (
                        <RenderField
                          key={`links${index}`}
                          label={item.title}
                          value={item.link}
                          size={16}
                          icon={'link'}
                          link={item.link}
                        />
                  ))}
                </Grid>
              </Grid>
            </>
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
