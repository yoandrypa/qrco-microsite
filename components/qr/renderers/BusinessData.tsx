import {ChangeEvent, useState} from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

import Common from '../helperComponents/Common';
import {CardDataProps} from "../types/types";
import RenderEasiness from "./helpers/RenderEasiness";
import RenderSocials from "./helpers/RenderSocials";
import RenderOpeningTime from "./helpers/RenderOpeningTime";
import Expander from "./helpers/Expander";

export default function BusinessData({data, setData}: CardDataProps) {
  const [expander, setExpander] = useState<string | null>('easiness');

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

  const renderItem = (item: string, label: string) => {
    let isError = false as boolean;
    // @ts-ignore
    const value = data?.[item] || '' as string;

    return (<TextField
      label={label}
      size="small"
      fullWidth
      error={isError}
      margin="dense"
      value={value}
      onChange={handleValues(item)}/>);
  };

  return (
    <Common
      msg="Your business or company details. Users can contact your business or company right the way.">
      <Typography sx={{fontWeight: 'bold'}}>{'Business info'}</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} style={{paddingTop: 0}}>
          {renderItem('company', 'Company')}
        </Grid>
        <Grid item sm={6} xs={12} style={{paddingTop: 0}}>
          {renderItem('title', 'Title')}
        </Grid>
        <Grid item sm={6} xs={12} style={{paddingTop: 0}}>
          {renderItem('subtitle', 'Sub title')}
        </Grid>
        <Grid item sm={6} xs={12} style={{paddingTop: 0}}>
          {renderItem('web', 'Web')}
        </Grid>
        <Grid item sm={6} xs={12} style={{paddingTop: 0}}>
          {renderItem('email', 'Email')}
        </Grid>
        <Grid item sm={6} xs={12} style={{paddingTop: 0}}>
          {renderItem('contact', 'Contact')}
        </Grid>
        <Grid item sm={6} xs={12} style={{paddingTop: 0}}>
          {renderItem('phone', 'Phone')}
        </Grid>
        <Grid item xs={12} style={{paddingTop: 0}}>
          {renderItem('about', 'About')}
        </Grid>
      </Grid>
      <Paper elevation={2} sx={{ p: 1, mt: 1 }}>
        <Expander expand={expander} setExpand={setExpander} item="adress" title="Address" />
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
      <Paper elevation={2} sx={{ p: 1, mt: 1 }}>
        <Expander expand={expander} setExpand={setExpander} item="opening" title="Opening Time" />
        {expander === "opening" && <RenderOpeningTime data={data} setData={setData} />}
      </Paper>
      <Paper elevation={2} sx={{ p: 1, my: 1 }}>
        <Expander expand={expander} setExpand={setExpander} item="easiness" title="Business Easiness" />
        {expander === "easiness" && <RenderEasiness data={data} setData={setData} />}
      </Paper>
      <Paper elevation={2} sx={{ p: 1, mt: 1 }}>
        <Expander expand={expander} setExpand={setExpander} item="socials" title="Social networks" />
        {expander === "socials" && <Grid item xs={12}><RenderSocials data={data} setData={setData}/></Grid>}
      </Paper>
    </Common>
  );
}
