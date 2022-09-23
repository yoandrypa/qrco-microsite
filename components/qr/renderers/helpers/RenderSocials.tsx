import {ChangeEvent, memo} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SquareSelector from "../../helperComponents/SquareSelector";
import TextField from "@mui/material/TextField";
import {capitalize} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../../helperComponents/RenderIcon";

import {CardDataProps} from "../../types/types";

const RenderSocials = ({data, setData}: CardDataProps) => {
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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography sx={{fontWeight: 'bold'}}>{'Social Information'}</Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 'fit-content', margin: '0 auto'}}>
          <SquareSelector
            selected={data.facebook !== undefined}
            item="facebook"
            label="Facebook"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.whatsapp !== undefined}
            item="whatsapp"
            label="Whatsapp"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.twitter !== undefined}
            item="twitter"
            label="Twitter"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.instagram !== undefined}
            item="instagram"
            label="Instagram"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.youtube !== undefined}
            item="youtube"
            label="YouTube"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.linkedin !== undefined}
            item="linkedin"
            label="LinkedIn"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.pinterest !== undefined}
            item="pinterest"
            label="Pinterest"
            handleSelection={handleSelection}/>
          <SquareSelector
            selected={data.telegram !== undefined}
            item="telegram"
            label="Telegram"
            handleSelection={handleSelection}/>
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
  );
}

// @ts-ignore
const notIfAreEquals = (current, next) => {
  return current.data.facebook === next.data.facebook && current.data.whatsapp === next.data.whatsapp &&
    current.data.twitter === next.data.twitter && current.data.instagram === next.data.instagram &&
    current.data.youtube === next.data.youtube && current.data.linkedin === next.data.linkedin &&
    current.data.linkedin === next.data.linkedin && current.data.pinterest === next.data.pinterest &&
    current.data.telegram === next.data.telegram;
};

export default memo(RenderSocials, notIfAreEquals);
