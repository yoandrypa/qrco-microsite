import {ChangeEvent, useContext, useMemo} from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import TypeSelector from './TypeSelector';
import Context from "../../context/Context";

interface RenderTypeSelectorProps {
  selected: string;
  handleSelect: Function;
}

const RenderTypeSelector = ({selected, handleSelect}: RenderTypeSelectorProps) => {
  // @ts-ignore
  const { data, setData } = useContext(Context);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const qrType = (event.target as HTMLInputElement).value as string;
    setData({ ...data, isDynamic: qrType === 'dynamic' });
  };

  const value = useMemo(() => Boolean(data.isDynamic) ? 'dynamic' : 'static', [data.isDynamic]);

  return (
    <Grid container spacing={1}>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          icon="web"
          label="Website"
          description="Link to any page on the web"
          selected={selected === 'web'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          icon="email"
          label="Email"
          enabled={value === 'static'}
          description="Receive email messages"
          selected={selected === 'email'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          icon="sms"
          label="SMS"
          enabled={value === 'static'}
          description="Receive text messages"
          selected={selected === 'sms'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid item sm={4} xs={12}>
        {value === 'static' ? (<TypeSelector
          icon="vcard"
          label="VCard"
          description="Share your contact details"
          selected={selected === 'vcard'}
          handleSelect={handleSelect} />
        ) : (<TypeSelector
          icon="vcard+"
          label="VCard Plus"
          enabled={value === 'dynamic'}
          description="Share your contact and social details"
          selected={selected === 'vcard+'}
          handleSelect={handleSelect} />
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          icon="text"
          label="Text"
          enabled={value === 'static'}
          description="Display a short text message"
          selected={selected === 'text'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          icon="wifi"
          label="WiFi"
          enabled={value === 'static'}
          description="Get connected to a WiFi network"
          selected={selected === 'wifi'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          icon="twitter"
          label="Twitter"
          enabled={value === 'static'}
          description="Post a tweet"
          selected={selected === 'twitter'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          icon="whatsapp"
          label="Whatsapp"
          enabled={value === 'static'}
          description="Send a Whatsapp message"
          selected={selected === 'whatsapp'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          icon="facebook"
          label="Facebook"
          enabled={value === 'static'}
          description="Share an URL in your wall"
          selected={selected === 'facebook'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          enabled={false}
          icon="pdf"
          label="PDF"
          description="Share a PDF file"
          selected={selected === 'pdf'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          enabled={false}
          icon="mp3"
          label="MP3"
          description="Share an MP3 audio file"
          selected={selected === 'facebook'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid item sm={4} xs={12}>
        <TypeSelector
          enabled={false}
          icon="jpg"
          label="JPG"
          description="Share a JPG image file"
          selected={selected === 'facebook'}
          handleSelect={handleSelect} />
      </Grid>
      <Grid xs={12}>
        <Box sx={{ p: 2 }}>
          <Typography>QR type</Typography>
          <RadioGroup defaultValue="static" name="radios-group" row value={value} onChange={handleChange}>
            <FormControlLabel value="static" control={<Radio />} label="Only static QR" />
            <FormControlLabel value="dynamic" control={<Radio />} label="Only dynamic QR" />
          </RadioGroup>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RenderTypeSelector;
