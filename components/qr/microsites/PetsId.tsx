import { useMemo, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import WorkIcon from '@mui/icons-material/Work';
import GetAppIcon from '@mui/icons-material/GetApp';

import MainMicrosite, { MicrositesProps } from './MainMicrosite';
import RenderSocials from './renderers/RenderSocials';
import { downloadPetID, getColors } from './renderers/helper';
import { ContactMail, Dangerous, Info, Pets } from '@mui/icons-material';
import { ColorTypes, FileType } from '../types/types';
import { SocialNetworksType } from '../types/types';
import RenderField from './renderers/RenderField';
import RenderAddress from './renderers/RenderAddress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Link, List, ListItem, ListItemText } from '@mui/material';

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
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    sms?: string;
    fax?: string;
    website?: string;
    facebook?: string;
    twitter?: string;
    whatsapp?: string;
  };
  headingText?: {
    heading: string;
    text: string;
  };
  contactUs?: {
    title: string;
    floatingButton?: string;
    number?: string;
    email?: string;
    address?: {
      address1: string;
      address2: string;
      city: string;
      state: string;
      zip: string;
      action?: {
        text: string;
        googleMapsLink: string;
      };
    };
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
  const [preview, setPreview] = useState<FileType | null>(null);
  const images = useRef<FileType[]>([]);
  function downloadFile() {
    downloadPetID({ ...newData });
  }

  const colors = useMemo(() => getColors(newData), []) as ColorTypes; // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainMicrosite
      colors={colors}
      url={newData.url}
      type={newData.qrType}
      foregndImg={newData.foregndImg}
      backgndImg={newData.backgndImg}
      foregndImgType={newData.foregndImgType}
      isSample={newData.isSample}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={0}>
          {newData.petName && (
            <>
              <Grid item xs={1}>
                <Pets sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
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
              <Grid item xs={1}>
                <Info sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
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
              <Grid item xs={1}>
                <ContactMail sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {'Owner Info'}
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
                  {newData.contact.location && (
                    <RenderField value={newData.contact.location} icon='location'/>
                  )}
                  {newData.contact.sms && (
                    <RenderField value={newData.contact.sms} icon='sms'/>
                  )}
                  {newData.contact.fax && (
                    <RenderField value={newData.contact.fax} icon='fax'/>
                  )}
                  {newData.contact.website && (
                    <RenderField value={newData.contact.website} icon='web'/>
                  )}
                </Grid>
              </Grid>
            </>
          )}
          {newData.otherDetails && (
            <>
              <Grid item xs={1}>
                <Info sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {'Other Details'}
                </Typography>
                <Grid container spacing={0}>
                  {newData.otherDetails.map((item, index) => (
                    <>
                      {item.header && (
                        <RenderField
                          label={item.header.title}
                          value={item.header.description}
                          size={20}
                        />
                      )}
                      {item.details.map((detail, index) => (
                        <RenderField
                          label={detail.key}
                          value={detail.value}
                          size={16}
                          sx={{ p:0 }}
                        />
                      ))}
                    </>
                  ))}
                </Grid>
              </Grid>
            </>
          )}
          {newData.links && (
            <>
              <Grid item xs={1}>
                <Info sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {newData.links.header?.title}
                </Typography>
                <Grid container spacing={0}>
                  {newData.links.header?.description && (
                    <RenderField value={newData.links.header?.description} />
                  )}
                  {newData.links.links.map((item, index) => (
                        <RenderField
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
          {/* <Card sx={{ width: '100%', mt: 2 }} elevation={0}>
            <Grid container spacing={1} sx={{ p: 2 }}>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {`${newData.headingText?.heading}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                  {`${newData.headingText?.text}`}
                </Typography>
              </Grid>
            </Grid>
          </Card> */}
          {/* {(newData.petSpecie || newData.petBreed || newData.petGender || newData.petYearOfBirth) && (
            <>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {`${newData.petSpecie} ${newData.petBreed ? `(${newData.petBreed})` : ''} ${newData.petGender ? `(${newData.petGender})` : ''} ${newData.petYearOfBirth ? `(${newData.petYearOfBirth})` : ''}`}
                </Typography>
              </Grid>
            </>
          )} */}
          {/* {(newData.cell || newData.phone || newData.fax) && (
            <>
              <Grid item xs={1}>
                <RingVolumeIcon sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={1}>
                  {newData.cell &&
                    <RenderField value={newData.cell} icon="cell" color={newData.secondary} size={newData.phone ? 6 : 12} />}
                  {newData.phone &&
                    <RenderField value={newData.phone} icon="phone" color={newData.secondary} size={newData.cell ? 6 : 12} />}
                  {newData.fax && <RenderField value={newData.fax} icon="fax" color={newData.secondary} />}
                </Grid>
              </Grid>
            </>
          )}
          {(newData.organization || newData.position) && (
            <>
              <Grid item xs={1}>
                <WorkIcon sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ fontWeight: 'bold' }}>{'Organization info'}</Typography>
                <Grid container spacing={0}>
                  {newData.organization && <RenderField label="Organization" value={newData.organization} />}
                  {newData.position && <RenderField label="Position" value={newData.position} />}
                </Grid>
              </Grid>
            </>
          )}
          <RenderAddress newData={newData} colors={colors} />
          {(newData.email || newData.web) && (
            <>
              <Grid item xs={1}>
                <MarkAsUnreadIcon sx={{ color: colors.p }} />
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={1} sx={{ mt: '-16px' }}>
                  {newData.email && <RenderField icon="emailIcon" color={newData.secondary} value={newData.email} />}
                  {newData.web && <RenderField icon="world" color={newData.secondary} value={newData.web} />}
                </Grid>
              </Grid>
            </>
          )} */}
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
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<GetAppIcon />}
          sx={{
            my: '10px',
            color: colors.s,
            background: colors.p,
            '&:hover': { color: colors.p, background: colors.s }
          }}
          onClick={downloadFile}>
          {'Get Contact'}
        </Button>
      </CardActions>
    </MainMicrosite>
  );
}
