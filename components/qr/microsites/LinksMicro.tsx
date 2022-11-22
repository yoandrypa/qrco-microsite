import {useMemo} from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {getColors} from "./renderers/helper";
import MainMicrosite from "./MainMicrosite";
import {LinkType} from "../types/types";
import RenderSocials from "./renderers/RenderSocials";

interface LinksProps {
  newData: any;
}

export default function LinksMicro({newData}: LinksProps) {
  const colors = useMemo(() => (getColors(newData)), []); // eslint-disable-line react-hooks/exhaustive-deps

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
        color: colors.p,
        background: colors.s,
        '&:hover': {color: colors.s, background: colors.p}
      }}
    >{item.label}</Button>
  );

  return (
    <MainMicrosite
      colors={colors}
      url={newData.shortlinkurl}
      badge={newData.prefix}
      type={newData.qrType}
      foregndImg={newData.foregndImg}
      backgndImg={newData.backgndImg}
      foregndImgType={newData.foregndImgType}
      isSample={newData.isSample}>
      <CardContent sx={{textAlign: 'center'}}>
        <Typography sx={{fontWeight: 'bold', fontSize: '25px', color: colors.p}}>{newData.title}</Typography>
        {newData.about && <Typography sx={{color: colors.p}}>{newData.about}</Typography>}
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
      </CardContent>
    </MainMicrosite>
  );
}
