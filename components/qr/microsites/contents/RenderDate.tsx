import {ensureDate, formatDate, humanDate} from "../../../helpers/generalFunctions";
import {CustomProps, handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";

export default function RenderDate({data, stylesData}: CustomProps) {
  return (
    <RenderField
      label={''}
      value={
        data?.shortDateFormat === undefined || !data.shortDateFormat ?
          humanDate(!data?.value || !data.value.length ? new Date().getTime() : data.value, 'en', true) :
          formatDate(!data.value || !data.value.length ? new Date() : new Date(ensureDate(data.value)))
      }
      sx={{...handleFont(stylesData, 'm')}}
    />
  );
}
