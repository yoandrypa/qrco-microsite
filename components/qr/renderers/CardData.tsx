import {ChangeEvent, useMemo} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Common from '../helperComponents/Common';
import RenderIcon from "../helperComponents/RenderIcon";
import {capitalize} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {DataType} from "../types/types";
import RenderQRName from "./RenderQRName";

export type CardDataProps = {
  data: DataType;
  setData: Function;
};

export default function CardData({data, setData}: CardDataProps) {
  const handleValues = (item: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const tempo = { ...data };
    if (value.length) {
      // @ts-ignore
      tempo[item] = value;
      // @ts-ignore
    } else if (tempo[item]) {
      // @ts-ignore
      delete tempo[item];
    }
    setData(tempo);
  };

  const isDynamic = useMemo(() => Boolean(data?.isDynamic), []);  // eslint-disable-line react-hooks/exhaustive-deps

  const renderSocial = (item: string) => (
    <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
      <TextField
        label={capitalize(item)}
        size="small"
        fullWidth
        margin="dense"
        // @ts-ignore
        value={data?.[item] || ''}
        // @ts-ignore
        onChange={handleValues(item)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RenderIcon icon={item} enabled/>
            </InputAdornment>
          )
        }}
      />
    </Grid>
  );

  const renderItem = (item: string, label: string) => {
    let isError = false as boolean;

    return (<TextField
      label={label}
      size="small"
      fullWidth
      error={isError}
      margin="dense"
      // @ts-ignore
      value={data?.[item] || ''}
      onChange={handleValues(item)}/>);
  };

  return (<>
    {/* @ts-ignore */}
    <RenderQRName handleValues={handleValues} qrName={data?.qrName} />
    <Common msg="Your contact details. Users can store your info or contact you right away.">
      <>
        <Typography sx={{ fontWeight: 'bold' }}>{'Presentation'}</Typography>
        <Grid container spacing={1}>
          <Grid item sm={2} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('prefix', 'Prefix')}
          </Grid>
          <Grid item sm={5} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('firstName', 'First name')}
          </Grid>
          <Grid item sm={5} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('lastName', 'Last name')}
          </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold' }}>{'Phones'}</Typography>
        <Grid container spacing={1}>
          <Grid item sm={4} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('cell', 'Cell number')}
          </Grid>
          <Grid item sm={4} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('phone', 'Phone number')}
          </Grid>
          <Grid item sm={4} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('fax', 'Fax')}
          </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold' }}>{'Organization'}</Typography>
        <Grid container spacing={1}>
          <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('organization', 'Organization')}
          </Grid>
          <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('position', 'Position')}
          </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold' }}>{'Other info'}</Typography>
        <Grid container spacing={1}>
          <Grid item sm={8} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('address', 'Address')}
          </Grid>
          <Grid item sm={4} xs={6} style={{ paddingTop: 0 }}>
            {renderItem('city', 'City')}
          </Grid>
          <Grid item sm={4} xs={6} style={{ paddingTop: 0 }}>
            {renderItem('zip', 'Zip code')}
          </Grid>
          <Grid item sm={4} xs={6} style={{ paddingTop: 0 }}>
            {renderItem('state', 'State/Province')}
          </Grid>
          <Grid item sm={4} xs={6} style={{ paddingTop: 0 }}>
            {renderItem('country', 'Country')}
          </Grid>
          <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('email', 'Email')}
          </Grid>
          <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
            {renderItem('web', 'Web')}
          </Grid>
          {isDynamic && (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 'bold' }}>{'Social Information'}</Typography>
                </Grid>
                {renderSocial('facebook')}
                {renderSocial('whatsapp')}
                {renderSocial('twitter')}
                {renderSocial('instagram')}
                {renderSocial('youtube')}
                {renderSocial('linkedin')}
                {renderSocial('pinterest')}
                {renderSocial('telegram')}
              </Grid>
            </Grid>
          )}
        </Grid>
      </>
    </Common>
  </>);
}
