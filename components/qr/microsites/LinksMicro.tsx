import {useCallback} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/system";

import {handleButtons, handleFont} from "./renderers/helper";
import MainMicrosite from "./MainMicrosite";
import {LinkType} from "../types/types";
import RenderSocials from "./renderers/RenderSocials";
import RenderTitleDesc from "./renderers/RenderTitleDesc";

import dynamic from "next/dynamic";

const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

export default function LinksMicro({newData}: {
  newData: any;
}) {
  const theme = useTheme();

  const isSections = Boolean(newData.layout?.startsWith('sections'));

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

  const renderSocials = useCallback((sx?: object) => (
    <Box sx={{...sx, display: 'inline-flex'}}>
      <RenderSocials newData={newData} onlyIcons/>
    </Box>
  ), []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderLinks = useCallback(() => (
    <>
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
    </>
  ), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainMicrosite data={newData}>
      <Box sx={{p: 2, textAlign: 'center', width: 'calc(100% - 15px)'}}>
        <RenderTitleDesc newData={newData} isSections={isSections} />
        {newData.position === 'over' && (
          !isSections ? renderSocials({my: 2}) : <RenderSectWrapper>{renderSocials({my: 2})}</RenderSectWrapper>
        )}
        {!isSections ? renderLinks() : <RenderSectWrapper>{renderLinks()}</RenderSectWrapper>}
        {(newData.position === undefined || newData.position === 'under') && (
          !isSections ? renderSocials({mt: 2}) : <RenderSectWrapper>{renderSocials()}</RenderSectWrapper>
        )}
      </Box>
    </MainMicrosite>
  );
}
