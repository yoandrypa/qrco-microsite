import {useCallback, useRef, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/system";

import {CustomProps, getSeparation, handleButtons, handleFont, onlyNumeric} from "../renderers/helper";
import {LinkType} from "../../types/types";

import dynamic from "next/dynamic";
import {verifyProtocol} from "../../../../helpers/qr/helpers";
import {download} from "../../../../handlers/storage";

const CircularProgress = dynamic(() => import("@mui/material/CircularProgress"));
const InputAdornment = dynamic(() => import("@mui/material/InputAdornment"));
const RenderIcon = dynamic(() => import("../../helperComponents/RenderIcon"));
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));
const ContentCopyIcon = dynamic(() => import("@mui/icons-material/ContentCopy"));
const ForwardIcon = dynamic(() => import("@mui/icons-material/Forward"));
const TextField = dynamic(() => import("@mui/material/TextField"));
const Avatar = dynamic(() => import("@mui/material/Avatar"));
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));

interface LinksProps extends CustomProps {
  alternate?: boolean;
  isButtons?: boolean;
}

export default function RenderLinks({data, stylesData, alternate, isButtons}: LinksProps) {
  const [, setUnusedState] = useState();

  const externalIcons = useRef<{name: string, f: string}[]>([]);

  const theme = useTheme();

  // @ts-ignore
  const forceUpdate = useCallback(() => setUnusedState({}), []);

  const getFiles = (key: string) => {
    const index = externalIcons.current.findIndex(x => x.name === key);

    const populate = (item: any) => {
      if (index === -1) {
        externalIcons.current.push(item);
      } else {
        externalIcons.current[index] = item;
      }
      forceUpdate();
    }

    download(key, false)
      .then(fileData => { // @ts-ignore
        populate({name: key, f: fileData.content});
      })
      .catch(() => {
        populate({name: key, f: 'error'});
      });
  }

  if (!data?.links?.length) {
    return null;
  }

  const handleCopy = (data: string) => {
    try {
      navigator.clipboard.writeText(data);
    } catch {
      console.log('Copy failed')
    }
  }

  const renderIcon = (isExternal: boolean, icon: any) => {
    if (icon?.Key) {
      const current = externalIcons.current.find(x => x.name === icon.Key);
      if (!current) {
        getFiles(icon.Key);
        return <CircularProgress color="inherit" sx={{ mx: 'auto' }} size={20} />;
      } else {
        if (current.f === 'error') { return <CloseIcon color="error" fontSize="large" />; }
        return <Avatar src={current.f} />;
      }
    }
    return icon !== undefined ? isExternal ? <Avatar src={icon} /> : <RenderIcon icon={icon} enabled/> : undefined
  }

  const renderBtn = (item: LinkType, key: string, stay: boolean, alternate?: boolean, type?: string, showIcons?: boolean) => {
    let link = item.link;
    let icon = undefined as string | undefined; // @ts-ignore
    const isExternal = item.icon && typeof item.icon === 'string';

    if (isButtons) {
      if (type === 'email') {
        link = `mailto:${link}`;
        if (showIcons) { icon = 'email'; }
      } else if (type === 'call') {
        link = `tel:${link}`;
        if (showIcons) { icon = 'phone'; }
      } else if (type === 'whatsapp') {
        link = `https://wa.me/:${onlyNumeric(link)}`;
        if (showIcons) { icon = 'whatsapp'; }
      } else if (type === 'sms') {
        link = `sms:${link}`;
        if (showIcons) { icon = 'sms'; }
      } else {
        link = verifyProtocol(link);
        if (showIcons) { icon = 'link'; }
      } // @ts-ignore
      if (isExternal) { icon = item.icon; } // @ts-ignore
      if (Array.isArray(item.icon)) { icon = item.icon[0]; }
    }

    return (
      <Button
        key={key}
        target="_blank"
        component="a"
        href={link}
        variant="contained"
        startIcon={renderIcon(isExternal, icon)}
        sx={{
          width: 'calc(100% - 20px)', ml: 1, zIndex: 1000,
          ...handleFont(stylesData, 'b'),
          ...handleButtons(stylesData, theme, alternate),
          mt: !stay ? getSeparation(stylesData?.buttonsSeparation) : 'unset'
        }}
      >{item.label}</Button>
    )
  };

  const renderLabel = (item: LinkType, key: string, stay: boolean) => (
    <Typography
      key={key}
      target="_blank"
      component="a"
      href={item.link}
      sx={{
        mt: !stay ? '20px' : 'unset', zIndex: 1000,
        width: 'calc(100% - 20px)',
        ...handleFont(stylesData, 'm'),
        '&:hover': {
          color: '#4169e1',
          textDecoration: !stylesData?.messagesFontStyle?.includes('u') ? 'underline' : '#4169e1 wavy underline'
        }
      }}
    >{item.label}</Typography>
  );

  const renderLink = (url: string, key: string, stay: boolean) => (
    <TextField
      variant="standard"
      label=""
      size="small"
      fullWidth
      margin="dense" // @ts-ignore
      value={url}
      key={key}
      sx={{zIndex: 1000, width: '100%', mt: !stay ? '20px' : 'unset'}}
      inputProps={{style: {...handleFont(stylesData, 'm')}}}
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <RenderIcon icon="link" enabled color={theme.palette.primary.main}/>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={'Copy link to clipboard'} disableHoverListener={data.iframed || false}>
              <IconButton onClick={() => handleCopy(url)}>
                <ContentCopyIcon sx={{color: theme => theme.palette.secondary.main}}/>
              </IconButton>
            </Tooltip>
            <Tooltip title={`Go to ${url}`} disableHoverListener={data.iframed || false}>
              <IconButton target="_blank" component="a" href={url}>
                <ForwardIcon sx={{color: theme => theme.palette.secondary.main}}/>
              </IconButton>
            </Tooltip>
          </InputAdornment>
        )
      }}
    />
  );

  return (
    <Box sx={{width: '100%', mt: 1, mb: 3}}>
      {data.links.map((x: LinkType, index: number) => {
        if (!x.link.trim().length) {
          return null;
        }
        if (!isButtons) {
          x.link = verifyProtocol(x.link);
          if (data.linksOnlyLinks) {
            return renderLink(x.link, `lnk${index}`, index === 0);
          }
          if (data.avoidButtons) {
            return renderLabel(x, `lbl${index}`, index === 0);
          }
        }
        return renderBtn(x, `btn${index}`, index === 0, alternate && index % 2 === 0, x.type, data.showIcons);
      })}
    </Box>
  );
}
