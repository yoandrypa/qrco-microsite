import {ChangeEvent, useContext, useMemo, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Common from '../helperComponents/Common';
import RenderIcon from "../helperComponents/RenderIcon";
import {capitalize} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {DataType} from "../types/types";
import Context from "../../context/Context";
import SquareSelector from "../helperComponents/SquareSelector";
import {SOCIALS} from "../constants";

export type CardDataProps = {
  data: DataType;
  setData: Function;
};

const PHONE_FAX = new RegExp('^(\\d{1,3}\\s?)?(\\d+((\\s|-)\\d+)*)$');
const CELL = new RegExp('^((\\+)?\\d{1,3}\\s?)?(\\d+((\\s|-)\\d+)*)$');
const ZIP = new RegExp('^\\d{5}(-\\d{4})?$');
const WEB = new RegExp('^((https?)://)?[\\w]+[\\-\\w:%\\.\\+~#=]{1,256}\\.(?:[\\-\\w()@:%_+.~#?&/=]*)$');
const EMAIL = new RegExp('^\\w+(\\.\\w+)*(\\+\\w+(\\.\\w+)*)?@\\w+(\\.\\w+)+$');

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
  // @ts-ignore
  const { setIsWrong } = useContext(Context);

  const renderSocial = (item: string) => {
    // @ts-ignore
    if (data[item] !== undefined) {
      // @ts-ignore
      const isError = !data[item].length;

      return (<Grid item xs={12} sm={4} style={{paddingTop: 0}}>
        <TextField
          label={capitalize(item)}
          size="small"
          fullWidth
          placeholder={`Enter just your ${item !== 'whatsapp' ? 'username' : 'cell number'}`}
          margin="dense"
          // @ts-ignore
          value={data?.[item] || ''}
          // @ts-ignore
          onChange={handleValues(item)}
          error={isError}
          InputProps={{
            startAdornment: (<InputAdornment position="start"><RenderIcon icon={item} enabled/></InputAdornment>)
          }}
        />
      </Grid>)
    }
    return null;
  };

  const renderItem = (item: string, label: string) => {
    let isError = false as boolean;
    // @ts-ignore
    const value = data?.[item] || '' as string;

    if (value.trim().length) {
      if (['phone', 'fax'].includes(item) && !PHONE_FAX.test(value)) {
        isError = true;
      } else if (item === 'cell' && !CELL.test(value)) {
        isError = true;
      } else if (item === 'zip' && !ZIP.test(value)) {
        isError = true;
      } else if (item === 'web' && !WEB.test(value)) {
        isError = false;
      } else if (item === 'email' && !EMAIL.test(value)) {
        isError = false;
      }
    }

    return (<TextField
      label={label}
      size="small"
      fullWidth
      error={isError}
      margin="dense"
      value={value}
      onChange={handleValues(item)}/>);
  };

  const handleSelection = (item: string) => {
    // @ts-ignore
    if (data[item] === undefined) {
      setData({...data, [item]: ''});
    } else {
      const newData = {...data};
      // @ts-ignore
      delete newData[item];
      setData(newData);
    }
  }

  useEffect(() => {
    let errors = false;
    // @ts-ignore
    if (Boolean(data.phone) && data.phone.trim().length && !PHONE_FAX.test(data.phone)) {
      errors = true;
    }
    // @ts-ignore
    if (!errors && Boolean(data.fax) && data.fax.trim().length && !PHONE_FAX.test(data.fax)) {
      errors = true;
    }
    // @ts-ignore
    if (!errors && Boolean(data.cell) && data.cell.trim().length && !CELL.test(data.cell)) {
      errors = true;
    }
    // @ts-ignore
    if (!errors && Boolean(data.zip) && data.zip.trim().length && !ZIP.test(data.zip)) {
      errors = true;
    }
    // @ts-ignore
    if (!errors && Boolean(data.web) && data.web.trim().length && !WEB.test(data.web)) {
      errors = false;
    }
    // @ts-ignore
    if (!errors && Boolean(data.email) && data.email.trim().length && !EMAIL.test(data.email)) {
      errors = false;
    }

    if (!errors && data?.isDynamic) {
      SOCIALS.every((x: string) => {
        // @ts-ignore
        if (data[x] !== undefined && !data[x].trim().length) {
          errors = true;
          return false;
        }
        return true;
      });
    }

    setIsWrong(errors);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (<>
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
              <Divider sx={{ my: 1 }}/>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 'bold' }}>{'Social Information'}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 'fit-content', margin: '0 auto' }}>
                    <SquareSelector selected={data.facebook !== undefined} item="facebook" label="Facebook" handleSelection={handleSelection} />
                    <SquareSelector selected={data.whatsapp !== undefined} item="whatsapp" label="Whatsapp" handleSelection={handleSelection} />
                    <SquareSelector selected={data.twitter !== undefined} item="twitter" label="Twitter" handleSelection={handleSelection} />
                    <SquareSelector selected={data.instagram !== undefined} item="instagram" label="Instagram" handleSelection={handleSelection} />
                    <SquareSelector selected={data.youtube !== undefined} item="youtube" label="YouTube" handleSelection={handleSelection} />
                    <SquareSelector selected={data.linkedin !== undefined} item="linkedin" label="LinkedIn" handleSelection={handleSelection} />
                    <SquareSelector selected={data.pinterest !== undefined} item="pinterest" label="Pinterest" handleSelection={handleSelection} />
                    <SquareSelector selected={data.telegram !== undefined} item="telegram" label="Telegram" handleSelection={handleSelection} />
                  </Box>
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
              <Divider sx={{ my: 1 }}/>
            </Grid>
          )}
        </Grid>
      </>
    </Common>
  </>);
}
