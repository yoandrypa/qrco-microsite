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
  newData: any;
  sectionName?: string;
}

export default function RenderLinks({newData, sectionName}: LinksProps) {
  const theme = useTheme();

  if (!newData.links?.length) {
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
        ...handleFont(newData, 'b'),
        ...handleButtons(newData, theme)
      }}
    >{item.label}</Button>
  );

  return (
    <Box sx={{width: '100%'}}>
      {sectionName && (
        <Box sx={{display: 'flex'}}>
          <LinkIcon sx={{ color: theme => theme.palette.primary.main, mt: '2px', mr: '5px' }}/>
          <Typography sx={{mb: '5px', ...handleFont(newData, 't')}}>{sectionName}</Typography>
        </Box>
      )}
      {newData.position !== 'middle' ? newData.links.map((x: LinkType, index: number) => (
        renderBtn(x, `btn${index}`, index === 0)
      )) : (
        <>
          {newData.links.slice().splice(0, Math.ceil(newData.links.length / 2)).map((x: LinkType, index: number) => (
            renderBtn(x, `btn2n${index}`, index === 0)
          ))}
          <Box sx={{my: 2, display: 'inline-flex'}}>
            <RenderSocials newData={newData} />
          </Box>
          {newData.links.slice().splice(-Math.ceil(newData.links.length / 2)).map((x: LinkType, index: number) => (
            renderBtn(x, `btn3d${index}`, false)
          ))}
        </>
      )}
    </Box>
  );
}
