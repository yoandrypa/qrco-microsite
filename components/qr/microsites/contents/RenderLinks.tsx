import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/system";

import {handleButtons, handleFont} from "../renderers/helper";
import {LinkType} from "../../types/types";

import dynamic from "next/dynamic";

const LinkIcon = dynamic(() => import("@mui/icons-material/Link"));
const RenderSocials = dynamic(() => import("./RenderSocials"));

interface LinksProps {
  data?: any;
  styledData: any;
  sectionName?: string;
}

export default function RenderLinks({data, styledData, sectionName}: LinksProps) {
  const theme = useTheme();

  if (!data?.links?.length) {
    return null;
  }

  const renderBtn = (item: LinkType, key: string, stay: boolean) => (
    <Button
      key={key}
      target="_blank"
      component="a"
      href={item.link}
      variant="contained"
      sx={{
        mt: !stay ? '10px' : 'unset',
        ml: '25px',
        width: 'calc(100% - 50px)',
        ...handleFont(styledData, 'b'),
        ...handleButtons(styledData, theme)
      }}
    >{item.label}</Button>
  );

  return (
    <Box sx={{width: '100%'}}>
      {sectionName && (
        <Box sx={{display: 'flex'}}>
          <LinkIcon sx={{ color: theme => theme.palette.primary.main, mt: '2px', mr: '5px' }}/>
          <Typography sx={{mb: '5px', ...handleFont(styledData, 't')}}>{sectionName}</Typography>
        </Box>
      )}
      {data?.position !== 'middle' ? data.links.map((x: LinkType, index: number) => (
        renderBtn(x, `btn${index}`, index === 0)
      )) : (
        <>
          {data?.links.slice().splice(0, Math.ceil(data.links.length / 2)).map((x: LinkType, index: number) => (
            renderBtn(x, `btn2n${index}`, index === 0)
          ))}
          <Box sx={{my: 2, display: 'inline-flex'}}>
            <RenderSocials data={data} styledData={styledData} />
          </Box>
          {data?.links.slice().splice(-Math.ceil(data.links.length / 2)).map((x: LinkType, index: number) => (
            renderBtn(x, `btn3d${index}`, false)
          ))}
        </>
      )}
    </Box>
  );
}
