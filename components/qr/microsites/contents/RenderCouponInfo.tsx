import {CustomProps, handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";
import RenderActionButton from "./RenderActionButton";
import Typography from "@mui/material/Typography";

export default function RenderCouponInfo({stylesData, data}: CustomProps) {
  return (
    <>
      {data?.company && (
        <>
          <Typography sx={{...handleFont(stylesData, 's')}}>Company</Typography>
          <RenderField value={data.company} sx={{my: '-10px', ...handleFont(stylesData, 'm')}}/>
        </>
      )}
      {data?.title && (
        <>
          <Typography sx={{...handleFont(stylesData, 's')}}>Title</Typography>
          <RenderField value={data.title} sx={{my: '-10px', ...handleFont(stylesData, 'm')}}/>
        </>
      )}
      {data?.description && (
        <>
          <Typography sx={{...handleFont(stylesData, 's')}}>Description</Typography>
          <RenderField
            value={data.description} sx={{my: '-10px', ...handleFont(stylesData, 'm')}}/>
        </>
      )}
      {data?.urlOptionLabel && <RenderActionButton stylesData={stylesData} data={data} avoidPl />}
    </>
  );
}
