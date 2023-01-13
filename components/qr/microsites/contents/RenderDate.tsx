import {humanDate} from "../../../helpers/generalFunctions";
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
      value={humanDate(!newData.value || !newData.value.length ? new Date().getTime() : newData.value, 'en', true)}
      sx={{...handleFont(newData, 'm')}}
    />
  );
}
