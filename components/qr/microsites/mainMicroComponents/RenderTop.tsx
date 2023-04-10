import Box from "@mui/material/Box";
import {DimsProps} from "../renderers/helper";
import {useMemo} from "react";

interface TopProps {
  isBorder: boolean;
  omitBanner: boolean;
  data: any;
  backImg: any;
  foreImg: any;
  width: string;
  containerDimensions?: DimsProps;
}

export default function RenderTop(
  {containerDimensions, isBorder, omitBanner, data, backImg, foreImg, width}: TopProps) {

  const isScrolling = containerDimensions && isBorder && window ? window.visualViewport?.width !== window.innerWidth : false;
  const isInverse = useMemo(() => data.layout?.toLowerCase().includes('inverse'), [data.layout]);
  const isSoft = useMemo(() => data.layout?.toLowerCase().includes('soft'), [data.layout]);

  const height = useMemo(() => {
    let size = 200 as number;
    if (data.upperHeight === 'medium') { size = 260; }
    else if (data.upperHeight === 'wide') { size = 320; }
    else if (data.upperHeight === 'small') { size = 100; }
    else if (data.upperHeight === 'narrow') { size = 10; }

    if (isInverse) { size += 28; }
    return size;
  }, [isInverse, data.upperHeight]);

  const path = useMemo(() => {
    const h = height - 28;
    const hh = h + 30;

    if (!isBorder) {
      return `path("M 0 0 H 475 V ${hh} Q 465 ${h + 1} 440 ${h} L 35 ${h} Q 8 ${h + 2} 0 ${hh} z")`;
    }
    return `path("M 10 0 H 465 V ${hh} Q 465 ${h + 1} 440 ${h} L 35 ${h} Q 8 ${h + 2} 10 ${hh} z")`;
  }, [height, isBorder]);

  return (
    <Box
      sx={{
        backgroundClip: 'padding-box !important',
        width,
        marginLeft: '50%',
        height: `${height}px`,
        right: 0,
        objectFit: 'cover',
        left: isScrolling && foreImg ? '-2px' : 'unset',
        transform: 'translateX(-50%)',
        borderTop: !isBorder ? 'unset' : 'solid 10px transparent',
        borderLeft: !isBorder ? 'unset' : 'solid 10px transparent',
        borderRight: !isBorder ? 'unset' : 'solid 10px transparent',
        borderRadius: isBorder || isSoft ?
          `${isBorder ? '24px 24px' : '0 0'} ${isSoft ? '24px 24px' : '0 0'}` : 'unset',
        maskImage: !data.layout?.includes('radient') ? 'unset' :
          'linear-gradient(to bottom, rgba(255,255,255,1) 80%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: !data.layout?.includes('radient') ? 'unset' :
          'linear-gradient(to bottom, rgba(255,255,255,1) 80%, rgba(0,0,0,0) 100%)',
        background: theme => !backImg && !omitBanner ? theme.palette.primary.main : 'unset',
        clipPath: !isInverse ? 'unset' : path
      }}
      component={backImg && !omitBanner ? 'img' : 'div'}
      alt={!omitBanner ? "bannerImg" : undefined}
      src={!omitBanner ? backImg?.content || backImg : undefined}
    />
  )
}
