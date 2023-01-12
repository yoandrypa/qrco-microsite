import Box from "@mui/material/Box";
import {LinkType} from "../../types/types";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/system";

import {handleButtons, handleFont} from "../renderers/helper";

import dynamic from "next/dynamic";

const RenderSocials = dynamic(() => import("./RenderSocials"));

interface LinksProps {
  newData: any;
}

export default function RenderLinks({newData}: LinksProps) {
  const theme = useTheme();

  const renderBtn = (item: LinkType, key: string, stay: boolean) => (
    <Button
      key={key}
      target="_blank"
      component="a"
      href={item.link}
      variant="contained"
      sx={{
        mt: !stay ? '10px' : 'unset',
        width: 'calc(100% - 70px)',
        ...handleFont(newData, 'b'),
        ...handleButtons(newData, theme)
      }}
    >{item.label}</Button>
  );

  return (
    <Box sx={{width: '100%'}}>
      {newData.position !== 'middle' ? newData.links.map((x: LinkType, index: number) => (
        renderBtn(x, `btn${index}`, index === 0)
      )) : (
        <>
          {newData.links.slice().splice(0, Math.ceil(newData.links.length / 2)).map((x: LinkType, index: number) => (
            renderBtn(x, `btn2n${index}`, index === 0)
          ))}
          <Box sx={{my: 2, display: 'inline-flex'}}>
            <RenderSocials newData={newData} onlyIcons/>
          </Box>
          {newData.links.slice().splice(-Math.ceil(newData.links.length / 2)).map((x: LinkType, index: number) => (
            renderBtn(x, `btn3d${index}`, false)
          ))}
        </>
      )}
    </Box>
  );
}
