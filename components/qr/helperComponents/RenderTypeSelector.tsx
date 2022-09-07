import { MouseEvent, useContext, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import MUIButton from '@mui/material/Button';
import BoltIcon from '@mui/icons-material/Bolt';
import CropFreeIcon from '@mui/icons-material/CropFree';
import useMediaQuery from '@mui/material/useMediaQuery';

import TypeSelector from './TypeSelector';
import Context from '../../context/Context';
import {styled} from "@mui/material/styles";

interface RenderTypeSelectorProps {
  selected: string;
  handleSelect: Function;
}

const Button = styled(MUIButton)(() => ({ width: '50%', height: '27px' }));

const RenderTypeSelector = ({ selected, handleSelect }: RenderTypeSelectorProps) => {
  // @ts-ignore
  const { data, setData } = useContext(Context);
  const isWide = useMediaQuery('(min-width:600px)', { noSsr: true });

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    // @ts-ignore
    const isDynamic = event.currentTarget.id === 'dynamic';
    if (isDynamic) {
      setData({ ...data, isDynamic });
    } else if (data.isDynamic !== undefined) {
      const tempoData = { ...data };
      delete tempoData.isDynamic;
      setData(tempoData);
    }
  };

  const value = useMemo(() => Boolean(data.isDynamic) ? "dynamic" : "static", [data.isDynamic]);

  const renderTypeSelector = (item: string, label: string, description: string, enabled: boolean) => (
    <Grid item sm={4} xs={12}>
      <TypeSelector
        icon={item}
        label={label}
        enabled={enabled}
        description={description}
        selected={selected === item}
        handleSelect={handleSelect} />
    </Grid>
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ButtonGroup sx={{ width: '100%'}}>
          {[
            <Button
              onClick={handleClick}
              startIcon={<CropFreeIcon />}
              key="static"
              id="static"
              variant={!data.isDynamic ? 'contained' : 'outlined'}>{isWide ? 'Only static QR Codes' : 'Static'}</Button>,
            <Button
              onClick={handleClick}
              startIcon={<BoltIcon />}
              key="dynamic"
              id="dynamic"
              variant={data.isDynamic ? 'contained' : 'outlined'}>{isWide ? 'Only dynamic QR Codes' : 'Dynamic'}</Button>
          ]}
        </ButtonGroup>
      </Grid>
      {renderTypeSelector('web','Website','Link to any page on the web', value === 'static')}
      {renderTypeSelector('email', 'Email', 'Receive email messages', value === 'static')}
      {renderTypeSelector('sms', 'SMS', 'Receive text messages', value === 'static')}
      {value === 'static' ?
        renderTypeSelector('vcard', 'VCard', 'Share your contact details', true) :
        renderTypeSelector('vcard+', 'VCard Plus', 'Share your contact and social details', true)
      }
      {renderTypeSelector('text', 'Text', 'Display a short text message', value === 'static')}
      {renderTypeSelector('wifi', 'WiFi', 'Get connected to a WiFi network', value === 'static')}
      {renderTypeSelector('twitter', 'Twitter', 'Post a tweet', value === 'static')}
      {renderTypeSelector('whatsapp', 'Whatsapp', 'Send a Whatsapp message', value === 'static')}
      {renderTypeSelector('facebook', 'Facebook', 'Share an URL in your wall', value === 'static')}
      {renderTypeSelector('pdf', 'PDF file', 'Share a PDF file', false)}
      {renderTypeSelector('audio', 'Audio file', 'Share an audio file', false)}
      {renderTypeSelector('image', 'Imagefile', 'Share an image file', false)}
      {renderTypeSelector('video', 'Video file', 'Share a video file', false)}
    </Grid>
  );
};

export default RenderTypeSelector;
