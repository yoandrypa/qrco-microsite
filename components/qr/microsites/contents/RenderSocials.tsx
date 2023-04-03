import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../../helperComponents/RenderIcon";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from "@mui/material/IconButton";
import ForwardIcon from "@mui/icons-material/Forward";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {capitalize} from "@mui/material";
import {useTheme} from "@mui/system";

import {SocialNetworksType} from "../../types/types";
import {
  CustomProps,
  getSeparation,
  handleButtons,
  handleFont,
  onlyNumeric
} from "../renderers/helper";
import Button from "@mui/material/Button";

interface RenderSocialsProps extends CustomProps {
  desc?: string;
  bold?: boolean;
  alternate?: boolean;
}

/**
 * @param data
 * @param styledData
 * @param desc
 * @param bold
 * @constructor
 */
export default function RenderSocials({data, stylesData, desc, bold, alternate}: RenderSocialsProps) {
  const theming = useTheme();

  const [hideTooltips, setHideToolTips] = useState<boolean>(false);

  const handleCopy = (data: string) => {
    try {
      navigator.clipboard.writeText(data);
    } catch {
      console.log('Copy failed')
    }
  }

  const renderSocials = (item: SocialNetworksType, stay: boolean, alt?: boolean) => {
    let value = item.value as string;
    value = value.slice(value.indexOf(':') + 1);

    if (!value?.length) { value = 'Not defined'; }

    let url = '' as string;
    switch (item.network) {
      case 'facebook': {
        url = 'https://www.facebook.com/';
        break;
      }
      case 'twitter': {
        url = 'https://twitter.com/';
        break;
      }
      case 'pinterest': {
        url = 'https://www.pinterest.com/';
        break;
      }
      case 'whatsapp': {
        url = 'https://wa.me/';
        value = onlyNumeric(value);
        break;
      }
      case 'telegram': {
        url = 'https://t.me/';
        break;
      }
      case 'linkedin': {
        url = 'https://www.linkedin.com/in/';
        break;
      }
      case 'instagram': {
        url = 'https://www.instagram.com/';
        break;
      }
      case 'youtube': {
        url = 'https://www.youtube.com/';
        break;
      }
      case 'tiktok': {
        url = 'https://www.tiktok.com/@';
        break;
      }
    }

    url += `${encodeURIComponent(value)}${item.network !== 'youtube' ? '' : '?sub_confirmation=1'}`;
    let label = item.network !== 'linkedin' ? capitalize(item.network) : 'LinkedIn';

    if (data?.socialsOnlyIcons) {
      const size = !data.iconSize || data.iconSize === 'default' ? undefined : data.iconSize;
      const sx = {
        width: '45px', height: '45px', ml: stay ? 'unset' : 2, zIndex: 1000,
        '&:hover': {
          color: theming.palette.primary.main, background: theming.palette.secondary.main,
        }
      };
      if (size) {
        const dimension = size === 'small' ? '35px' : (size === 'medium' ? '57px' : '70px');
        sx.width = dimension;
        sx.height = dimension;
      }

      let color = theming.palette.primary.main;
      let colorSec = theming.palette.secondary.main;

      if (stylesData.buttonBack) {
        if (stylesData.buttonBack === 'solid') {
          color = stylesData.buttonBackColor; // @ts-ignore
          delete sx['&:hover'];
        } else if (['two', 'gradient'].includes(stylesData.buttonBack)) {
          const colors = stylesData.buttonBackColor?.split('|') || [theming.palette.primary.main, theming.palette.secondary.main];
          color = colors[0];
          colorSec = colors[1];
          sx['&:hover'] = { color: colors[0], background: colors[1] };
        }
      }

      return (
        <Tooltip title={`Go to ${label}`} disableHoverListener={hideTooltips || false}>
          <IconButton target="_blank" component="a" href={url} sx={sx} >
            <RenderIcon icon={item.network} enabled color={color} size={sx.width} colorSec={colorSec} />
          </IconButton>
        </Tooltip>
      );
    }

    if (data?.linksAsButtons) {
      return (
        <Button
          target="_blank"
          component="a"
          href={url}
          variant="contained"
          startIcon={!data?.hideNetworkIcon && <RenderIcon icon={item.network} enabled />}
          sx={{
            mt: !stay ? getSeparation(stylesData?.buttonsSeparation) : 'unset',
            width: '100%',
            zIndex: 1000,
            ...handleFont(stylesData, 'b'), ...handleButtons(stylesData, theming, alt)
          }}
        >{!data?.showOnlyNetworkName ? value : item.network}</Button>
      );
    }

    return (
      <TextField
        variant="standard"
        label=""
        size="small"
        fullWidth
        margin="dense" // @ts-ignore
        value={value}
        sx={{width: '100%', mt: !stay ? 1 : 'unset', zIndex: 1000}}
        inputProps={{style: {...handleFont(stylesData, 'm')}}}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <RenderIcon icon={item.network} enabled color={theming.palette.primary.main}/>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={`Copy ${label} contact info to clipboard`} disableHoverListener={hideTooltips || false}>
                <IconButton onClick={() => handleCopy(url)}>
                  <ContentCopyIcon sx={{color: theme => theme.palette.secondary.main}}/>
                </IconButton>
              </Tooltip>
              <Tooltip title={`Go to ${label}`} disableHoverListener={hideTooltips || false}>
                <IconButton target="_blank" component="a" href={url}>
                  <ForwardIcon sx={{color: theme => theme.palette.secondary.main}}/>
                </IconButton>
              </Tooltip>
            </InputAdornment>
          )
        }}
      />
    );
  }

  useEffect(() => {
    setHideToolTips(window.top !== window);
  }, []);

  if (!data?.socials?.length) {
    return null;
  }

  return (
    <>
      {!data?.socialsOnlyIcons ? (
        <Grid item xs={12} sx={{display: 'flex', width: '100%'}}>
          <Box sx={{ml: 1, width: 'calc(100% - 20px)'}}>
            {desc !== undefined && <Typography sx={{mt: '-5px', ...handleFont(stylesData, !bold ? 'm' : 't')}}>{desc}</Typography>}
            <Grid container spacing={1}>
              {(data?.socials || []).map((x: SocialNetworksType, index: number) => (
                <Grid item xs={12} sx={{pt: 0}} key={`socialnw${x.network}`}>
                  {renderSocials(x, index === 0, Boolean(alternate) && index % 2 === 0)}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      ) : (
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          {(data?.socials || []).map((x: SocialNetworksType, index: number) => (
            <div key={`sn${x.network}`}>
              {renderSocials(x, index === 0)}
            </div>
          ))}
        </Box>
      )}
    </>
  );
}
