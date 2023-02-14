import React from 'react';
import Grid from '@mui/material/Grid';
import MainMicrosite from './MainMicrosite';
import RenderSocials from './contents/RenderSocials';
import {ContactMail, Info, Pets} from '@mui/icons-material';
import {handleFont} from "./renderers/helper";
import RenderField from './renderers/RenderField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinkIcon from '@mui/icons-material/Link';

interface PetIdProps {
  newData: any;
}

export default function PetsId({ newData }: PetIdProps) {
  let address = `${newData.address1 ? `${newData.address1}, ` : ''}${
    newData.address2 ? `${newData.address2}, ` : ''
  }${newData.city ? `${newData.city}, ` : ''}${
    newData.state ? `${newData.state}, ` : ''
  }${newData.zip ? `${newData.zip}, ` : ''}${
    newData.country ? `${newData.country}, ` : ''
  }`;
  if(address.endsWith(', ')) address = address.slice(0, -2);

  const renderUrls = () => {
    if (!newData.urls) return <></>;
    if (newData.urls.items.length === 0 && newData.urls.heading === '')
      return <></>;

    return (
      <>
        <Grid item xs={1} key={'linksIcon'}>
          <LinkIcon sx={{ color: theme => theme.palette.primary.main }} />
        </Grid>
        <Grid item xs={11} key={'linksBody'}>
          <Typography sx={{ fontWeight: 'bold', ...handleFont(newData,'t') }} >
            {newData.urls.heading}
          </Typography>
          <Grid container spacing={0}>
            {newData.urls.items.map((item: any, index: Number) => {
              if(item.value === '') return <></>;
              return (
              <RenderField
                key={`links${index}`}
                value={item.label}
                icon={'link'}
                link={item.value}
                sx={{...handleFont(newData,'m')}}
              />
            )})}
          </Grid>
        </Grid>
      </>
    );
  };
  const renderOtherDetails = () => {
    if (!newData.otherDetails) return <></>;
    if (
      newData.otherDetails.items.length === 0 &&
      newData.otherDetails.heading === ''
    )
      return <></>;
    return (
      <>
        <Grid item xs={1} key={'otherIcon'}>
          <Info sx={{ color: theme => theme.palette.primary.main }} />
        </Grid>
        <Grid item xs={11} key={'otherBody'}>
          <Typography sx={{ fontWeight: 'bold', ...handleFont(newData,'t') }}>
            {newData.otherDetails.heading}
          </Typography>
          <Grid container spacing={0}>
            {newData.otherDetails.items.map((item: any, index: Number) => {
              if(item.value === '') {return <></>}
              return(
              <Grid container spacing={0} key={`other${index}`}>
                <RenderField
                  key={`otherVal${index}`}
                  label={item.label}
                  value={item.value}
                  sx={{ p: 0,...handleFont(newData,'m') }}
                />
              </Grid>
            )})}
          </Grid>
        </Grid>
      </>
    );
  };
  const renderContact = () => {
    if (
      !(
        newData.contactTitle?.length > 0 ||
        newData.name?.length > 0 ||
        newData.email?.length > 0 ||
        newData.phone?.length > 0 ||
        newData.sms?.length > 0 ||
        newData.fax?.length > 0 ||
        newData.website?.length > 0 ||
        address.length > 0
      )
    )
      return <></>;

    return (
      <>
        <Grid item xs={1} key="contactIcon">
          <ContactMail sx={{ color: theme => theme.palette.primary.main }} />
        </Grid>
        <Grid item xs={11} key="contactBody">
          <Typography sx={{ fontWeight: 'bold', ...handleFont(newData,'t') }}>
            {newData.contactTitle}
          </Typography>
          <Grid container spacing={0}>
            {newData.name && <RenderField value={newData.name} label="Name" sx={handleFont(newData,'m')}/>}
            {newData.email && (
              <RenderField value={newData.email} icon="email" sx={{...handleFont(newData,'m')}}/>
            )}
            {newData.phone && <RenderField value={newData.phone} icon="cell" sx={{...handleFont(newData,'m')}}/>}
            {newData.sms && <RenderField value={newData.sms} icon="sms" sx={{...handleFont(newData,'m')}}/>}
            {newData.fax && <RenderField value={newData.fax} icon="fax" sx={{...handleFont(newData,'m')}}/>}
            {newData.website && (
              <RenderField value={newData.website} icon="web" sx={{...handleFont(newData,'m')}}/>
            )}
            {address && (
              <RenderField
                value={address}
                link={newData.googleMapsLink}
                icon="location"
                sx={{...handleFont(newData,'m')}}
              />
            )}
          </Grid>
        </Grid>
      </>
    );
  };

  const renderNameHead = () => {
    if (
      !(
        newData.petName?.length > 0 ||
        newData.petBreed?.length > 0 ||
        newData.petGender?.length > 0 ||
        newData.petYearOfBirth?.length > 0
      )
    )
      return <></>;

    return (
      <>
        <Grid item xs={1} key="petIcon">
          <Pets sx={{ color: theme => theme.palette.primary.main }} />
        </Grid>
        <Grid item xs={11} key="petBody">
          <Typography sx={{ fontWeight: 'bold', ...handleFont(newData,'t') }}>
            {`${newData.petName}`}
          </Typography>
          <RenderField
            value={`${newData.petBreed ? newData.petBreed : ''} ${
              newData.petGender ? newData.petGender : ''
            } ${newData.petYearOfBirth ? newData.petYearOfBirth : ''}`}
            sx={handleFont(newData,'m')}
          />
        </Grid>
      </>
    );
  };

  return (
    <MainMicrosite data={newData}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={0}>
          {renderNameHead()}
          {(newData.title || newData.titleText) && (
              <>
                <Grid item xs={1} key="headingIcon">
                  <Info sx={{ color: theme => theme.palette.primary.main }} />
                </Grid>
                <Grid item xs={11} key="headingBody">
                  <Typography sx={{ fontWeight: 'bold', ...handleFont(newData,'t') }}>
                    {newData.title? newData.title : ''}
                  </Typography>
                  <Grid container spacing={0}>
                    {newData.titleText && (
                      <RenderField value={newData.titleText} sx={handleFont(newData,'s')} />
                    )}
                  </Grid>
                </Grid>
              </>
            )}
          {renderContact()}
          {renderOtherDetails()}
          {renderUrls()}
          <Box
            sx={{
              width: '100%',
              mt: 2,
              display: 'flex',
              justifyContent: 'center'
            }}>
            <RenderSocials data={newData} stylesData={newData} />
          </Box>
        </Grid>
      </Box>
    </MainMicrosite>
  );
}
