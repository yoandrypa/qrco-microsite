import {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../../helperComponents/RenderIcon";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from "@mui/material/IconButton";
import ForwardIcon from "@mui/icons-material/Forward";
import GroupsIcon from '@mui/icons-material/Groups';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {capitalize} from "@mui/material";
import {useTheme} from "@mui/system";

import {SocialNetworksType} from "../../types/types";
import {handleFont} from "../renderers/helper";

import dynamic from "next/dynamic";

const RenderSectWrapper = dynamic(() => import("../renderers/RenderSectWrapper"));

interface RenderSocialsProps {
  newData: any;
  desc?: string;
  bold?: boolean;
  isSections?: boolean;
  sectionName?: string;
}

/**
 * if onlyIcons is true, bold and sectionName will be ignored
 * @param newData
 * @param onlyIcons
 * @param desc
 * @param bold
 * @param isSections
 * @param sectionName
 * @constructor
 */
export default function RenderSocials({newData, desc, bold, isSections, sectionName}: RenderSocialsProps) {
  const theming = useTheme();

  const [hideTooltips, setHideToolTips] = useState<boolean>(false);

  const handleCopy = (data: string) => {
    try {
      navigator.clipboard.writeText(data);
    } catch {
      console.log('Copy failed')
    }
  }

  const renderSocials = (item: SocialNetworksType) => {
    let value = item.value as string;
    value = value.slice(value.indexOf(':') + 1);

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
    }

    url += `${value}${item.network !== 'youtube' ? '' : '?sub_confirmation=1'}`;
    let label = item.network !== 'linkedin' ? capitalize(item.network) : 'LinkedIn';

    if (newData.socialsOnlyIcons) {
      return (
        <Tooltip title={`Go to ${label}`} disableHoverListener={hideTooltips || false}>
          <IconButton target="_blank" component="a" href={url}>
            <RenderIcon icon={item.network} enabled color={theming.palette.primary.main} />
          </IconButton>
        </Tooltip>
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
        inputProps={{style: {...handleFont(newData, 'm')}}}
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

  const render = () => (
    <>
      {!newData.socialsOnlyIcons ? (
        <Grid item xs={12} sx={{display: 'flex', my: 2}}>
          <GroupsIcon sx={{color: theming.palette.primary.main, mt: '5px'}}/>
          <Box sx={{ml: 1}}>
            {sectionName && <Typography sx={{mb: '5px', ...handleFont(newData, 't')}}>{sectionName}</Typography>}
            {desc !== undefined && <Typography sx={{mt: '-5px', ...handleFont(newData, !bold ? 'm' : 't')}}>{desc}</Typography>}
            <Grid container spacing={1}>
              {newData.socials.map((x: SocialNetworksType) => (
                <Grid item xs={12} style={{paddingTop: 0}} key={`socialnw${x.network}`}>
                  {renderSocials(x)}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      ) : (
        <>
          {newData.socials.map((x: SocialNetworksType) => (
            <div key={`sn${x.network}`}>
              {renderSocials(x)}
            </div>
          ))}
        </>
      )}
    </>
  );

  if (!newData.socials?.length) {
    return null;
  }

  if (isSections) {
    return <RenderSectWrapper sx={{display: 'flex', justifyContent: 'center'}}>{render()}</RenderSectWrapper>;
  }

  return render();
}
