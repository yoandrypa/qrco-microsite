import {ChangeEvent, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Common from '../helperComponents/Common';
import {DataType} from "../types/types";
import {WEB} from "../constants";
import Expander from "./helpers/Expander";
import Paper from "@mui/material/Paper";

import RenderDateSelector from "./helpers/RenderDateSelector";

export type CouponProps = {
  data: DataType;
  setData: Function;
  setIsWrong: (isWrong: boolean) => void;
}

const CouponData = ({data, setData, setIsWrong}: CouponProps) => {
  const [expander, setExpander] = useState<string | null>(null);

  const handleValues = (item: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    const tempo = JSON.parse(JSON.stringify(data));
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

  const renderItem = (item: string, label: string, placeholder?: string) => {
    let isError = false as boolean;
    // @ts-ignore
    const value = data?.[item] || '' as string;

    if ((value.trim().length === 0 && ['urlOptionLabel', 'urlOptionLink', 'title', 'name'].includes(item)) ||
      (item === 'urlOptionLink' && !WEB.test(value))) {
      isError = true;
    }

    return (<TextField
      label={label}
      size="small"
      fullWidth
      error={isError}
      margin="dense"
      value={value}
      placeholder={placeholder}
      onChange={handleValues(item)}/>);
  };

  useEffect(() => {
    let errors = false;
    if (!data.urlOptionLabel?.trim().length || !data.urlOptionLink?.trim().length || !WEB.test(data.urlOptionLink) ||
      !data.title?.trim().length || !data.name?.trim().length) {
      errors = true;
    }
    setIsWrong(errors);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  // the date goes to the field value

  return (
    <Common msg="Share a coupon.">
      <Typography sx={{fontWeight: 'bold'}}>{'Offer information'}</Typography>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12} style={{paddingTop: 0}}>
          {renderItem('company', 'Company')}
        </Grid>
        <Grid item sm={6} xs={12} style={{paddingTop: 0}}>
          {renderItem('title', 'Title')}
        </Grid>
        <Grid item xs={12} style={{paddingTop: 0}}>
          {renderItem('about', 'Description')}
        </Grid>
        <Grid item xs={12} style={{paddingTop: 0}}>
          {renderItem('prefix', 'Badge')}
        </Grid>
        <Grid item xs={6} style={{paddingTop: 0}}>
          {renderItem('urlOptionLabel', 'Button text')}
        </Grid>
        <Grid item xs={6} style={{paddingTop: 0}}>
          {renderItem('urlOptionLink', 'Link')}
        </Grid>
      </Grid>
      <Paper elevation={2} sx={{ p: 1, mt: 1 }}>
        <Expander expand={expander} setExpand={setExpander} item="coupon" title="Coupon data" />
        {expander === "coupon" && (
          <Grid container spacing={1}>
            <Grid item sm={6} xs={12} style={{paddingTop: 0}}>
              {renderItem('name', 'Coupon code')}
            </Grid>
            <Grid item sm={6} xs={12} style={{paddingTop: 0}}>
              <RenderDateSelector data={data} setData={setData} label="Valid until" />
            </Grid>
            <Grid item xs={12} style={{paddingTop: 0}}>
              {renderItem('text', 'Terms and conditions')}
            </Grid>
          </Grid>
        )}
      </Paper>
      <Paper elevation={2} sx={{ p: 1, mt: 1 }}>
        <Expander expand={expander} setExpand={setExpander} item="address" title="Address" />
        {expander === "address" && (
          <Grid container spacing={1}>
            <Grid item sm={8} xs={12} style={{paddingTop: 0}}>
              {renderItem('address', 'Address')}
            </Grid>
            <Grid item sm={4} xs={6} style={{paddingTop: 0}}>
              {renderItem('city', 'City')}
            </Grid>
            <Grid item sm={4} xs={6} style={{paddingTop: 0}}>
              {renderItem('zip', 'Zip code')}
            </Grid>
            <Grid item sm={4} xs={6} style={{paddingTop: 0}}>
              {renderItem('state', 'State/Province')}
            </Grid>
            <Grid item sm={4} xs={6} style={{paddingTop: 0}}>
              {renderItem('country', 'Country')}
            </Grid>
          </Grid>
        )}
      </Paper>
    </Common>
  );
}

export default CouponData;
