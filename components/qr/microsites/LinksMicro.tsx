import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {handleFont} from "./renderers/helper";
import MainMicrosite from "./MainMicrosite";
import {LinkType} from "../types/types";
import RenderSocials from "./renderers/RenderSocials";
import RenderTitleDesc from "./renderers/RenderTitleDesc";

interface LinksProps {
  newData: any;
}

export default function LinksMicro({newData}: LinksProps) {
  const renderBtn = (item: LinkType, key: string) => (
    <Button
      key={key}
      target="_blank"
      component="a"
      href={item.link}
      variant="contained"
      sx={{
        mt: '10px',
        width: 'calc(100% - 70px)',
        color: theme => theme.palette.primary.main,
        background: theme => theme.palette.secondary.main,
        '&:hover': {color: theme => theme.palette.secondary.main, background: theme => theme.palette.primary.main},
        ...handleFont(newData, 'b')
      }}
    >{item.label}</Button>
  );

  return (
    <MainMicrosite data={newData}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <RenderTitleDesc newData={newData} />
        {newData.position === 'over' && (
          <Box sx={{mt: 2, display: 'inline-flex'}}>
            <RenderSocials newData={newData} onlyIcons/>
          </Box>
        )}
        <Box sx={{mt: 2}}>
          {newData.position !== 'middle' ? newData.links.map((x: LinkType, index: number) => (
            renderBtn(x, `btn${index}`)
          )) : (
            <>
              {newData.links.slice().splice(0, Math.ceil(newData.links.length / 2)).map((x: LinkType, index: number) => (
                renderBtn(x, `btn2n${index}`)
              ))}
              <Box sx={{my: 2, display: 'inline-flex'}}>
                <RenderSocials newData={newData} onlyIcons/>
              </Box>
              {newData.links.slice().splice(-Math.ceil(newData.links.length / 2)).map((x: LinkType, index: number) => (
                renderBtn(x, `btn3d${index}`)
              ))}
            </>
          )}
        </Box>
        {(newData.position === undefined || newData.position === 'under') && (
          <Box sx={{mt: 2, display: 'inline-flex'}}>
            <RenderSocials newData={newData} onlyIcons/>
          </Box>
        )}
      </Box>
    </MainMicrosite>
  );
}
