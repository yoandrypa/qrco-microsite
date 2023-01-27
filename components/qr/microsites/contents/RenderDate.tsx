import {ensureDate, formatDate, humanDate} from "../../../helpers/generalFunctions";
import {handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";

interface RenderDateProps {
  newData: any;
  message?: string;
}

export default function RenderDate({newData, message}: RenderDateProps) {
  return (
    <RenderField
      label={message || ''}
      value={
      newData.shortDateFormat === undefined || !newData.shortDateFormat ?
        humanDate(!newData.value || !newData.value.length ? new Date().getTime() : newData.value, 'en', true) :
        formatDate(!newData.value || !newData.value.length ? new Date() : new Date(ensureDate(newData.value)))
    }
      sx={{...handleFont(newData, 'm')}}
    />
  );
}
