import {ensureDate, formatDate, humanDate} from "../../../helpers/generalFunctions";
import {handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";

import dynamic from "next/dynamic";
import Box from "@mui/material/Box";

const Typography = dynamic(() => import("@mui/material/Typography"));
const CalendarMonthIcon = dynamic(() => import("@mui/icons-material/CalendarMonth"));
const Grid = dynamic(() => import("@mui/material/Grid"));

interface RenderDateProps {
  styledData: any;
  data?: any;
  message?: string;
}

export default function RenderDate({data, styledData, message}: RenderDateProps) {
  const renderDate = () => (<RenderField
    label={''}
    value={
      data?.shortDateFormat === undefined || !data.shortDateFormat ?
        humanDate(!data?.value || !data.value.length ? new Date().getTime() : data.value, 'en', true) :
        formatDate(!data.value || !data.value.length ? new Date() : new Date(ensureDate(data.value)))
    }
    sx={{...handleFont(styledData, 'm')}}
  />);

  return (<>
    {!data || data.hideDateLegend && <Box sx={{ml: '30px'}}>{renderDate()}</Box>}
    {data && !data.hideDateLegend && (
      <Grid item xs={12} sx={{mt: 2}}>
        <CalendarMonthIcon sx={{color: theme => theme.palette.primary.main, mt: '4px', display: 'inline'}}/>
        <Typography sx={{...handleFont(styledData, 't'), display: 'inline', ml: '5px'}}>{message || 'Date'}</Typography>
        <Grid container spacing={1} sx={{ml: '20px'}}>
          <Box sx={{ml: 1}}>
            {data && !data.hideDateLegend && renderDate()}
          </Box>
        </Grid>
      </Grid>
    )}
    </>
  );
}
