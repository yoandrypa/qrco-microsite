import Typography from "@mui/material/Typography";
import {CustomProps, handleFont} from "../renderers/helper";
import Box from "@mui/material/Box";
import RenderField from "../renderers/RenderField";

import RenderAddress from "./RenderAddress";
import RenderEmail from "./RenderEmail";
import RenderWeb from "./RenderWeb";

export default function RenderName({data, stylesData}: CustomProps) {
  return (
    <>
      <Typography sx={{...handleFont(stylesData, 's')}}>
        {`${data?.prefix ? data.prefix +
          (data?.firstName || data.lastName ? ', ' : '') : ''}${data?.firstName ?
          data.firstName + (data?.lastName ? ' ' : '') : ''}${data?.lastName ? data.lastName : ''}`}
      </Typography>
      {data.includeExtraInfo && (
        <Box>
          {data.phone && <RenderField value={data.phone} icon="phone" sx={{...handleFont(stylesData,'m')}}/>}
          {data.cell && <RenderField value={data.cell} icon="cell" sx={{...handleFont(stylesData,'m')}}/>}
          {data.fax && <RenderField value={data.fax} icon="fax" sx={{...handleFont(stylesData,'m')}}/>}
          <RenderAddress stylesData={stylesData} data={data} includeIcon />
          <RenderEmail stylesData={stylesData} data={data} />
          <RenderWeb stylesData={stylesData} data={data} />
        </Box>
      )}
    </>
  );
}
