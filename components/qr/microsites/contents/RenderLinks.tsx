import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/system";

import {CustomProps, handleButtons, handleFont} from "../renderers/helper";
import {LinkType} from "../../types/types";

import dynamic from "next/dynamic";
import {verifyProtocol} from "../../../../helpers/qr/helpers";

const InputAdornment = dynamic(() => import("@mui/material/InputAdornment"));
const RenderIcon = dynamic(() => import("../../helperComponents/RenderIcon"));
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));
const ContentCopyIcon = dynamic(() => import("@mui/icons-material/ContentCopy"));
const ForwardIcon = dynamic(() => import("@mui/icons-material/Forward"));
const TextField = dynamic(() => import("@mui/material/TextField"));

interface LinksProps extends CustomProps {
  alternate?: boolean;
}

export default function RenderLinks({data, stylesData, alternate}: LinksProps) {
  const theme = useTheme();

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

  const renderBtn = (item: LinkType, key: string, stay: boolean, alternate?: boolean) => (
    <Button
      key={key}
      target="_blank"
      component="a"
      href={item.link}
      variant="contained"
      sx={{
        mt: !stay ? '20px' : 'unset',
        width: 'calc(100% - 20px)',
        ...handleFont(stylesData, 'b'),
        ...handleButtons(stylesData, theme, alternate)
      }}
    >{item.label}</Button>
  );

  const renderLabel = (item: LinkType, key: string, stay: boolean) => (
    <Typography
      key={key}
      target="_blank"
      component="a"
      href={item.link}
      sx={{
        mt: !stay ? '20px' : 'unset',
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
      sx={{width: '100%', mt: !stay ? '20px' : 'unset'}}
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
        x.link = verifyProtocol(x.link);
        if (data.linksOnlyLinks) {
          return renderLink(x.link, `lnk${index}`, index === 0);
        }
        if (data.avoidButtons) {
          return renderLabel(x, `lbl${index}`, index === 0);
        }
        return renderBtn(x, `btn${index}`, index === 0, alternate && index % 2 === 0);
      })}
    </Box>
  );
}
