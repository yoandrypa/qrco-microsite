import {ChangeEvent, useEffect, useMemo} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SquareSelector from "../../helperComponents/SquareSelector";
import TextField from "@mui/material/TextField";
import {capitalize} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../../helperComponents/RenderIcon";
import {SocialProps} from "../../types/types";

interface RenderSocialsProps {
  data: SocialProps;
  setData: Function;
  setIsWrong?: (isWrong: boolean) => void;
}

const RenderSocials = ({data, setData, setIsWrong}: RenderSocialsProps) => {
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

  const amount = useMemo(() => {
    let count = Object.keys(data || {}).length;
    if (data?.isDynamic) {
      count -= 1;
    }
    if (data?.qrName) {
      count -= 1;
    }
    return count;
  }, [data]);

  useEffect(() => {
    if (setIsWrong !== undefined) {
      setIsWrong(amount === 0);
    }
  }, [amount]);

  const renderSocial = (item: string) => {
    // @ts-ignore
    if (data[item] !== undefined) {
      // @ts-ignore
      const isError = !data[item].length;

      let sm;
      switch (amount) {
        case 1: {  sm = 12; break; }
        case 2: {  sm = 6; break; }
        default: { sm = 4; break; }
      }

      return (<Grid item xs={12} sm={sm} style={{paddingTop: 0}}>
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

export default RenderSocials;
