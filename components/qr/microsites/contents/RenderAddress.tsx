import RenderField from "../renderers/RenderField";
import {CustomProps, handleFont} from "../renderers/helper";

interface AddressProps extends CustomProps {
  includeIcon?: boolean;
}

export default function RenderAddress({data, stylesData, includeIcon}: AddressProps) {
  if (!data?.address && !data?.address2 && !data?.city && !data?.zip && !data?.state && !data?.country) {
    return null;
  }

  const addSect = (item: string, omitComma?: boolean): string => data[item] ? `${data?.[item]}${!omitComma ? ',' : ''} ` : '';

  let address = `${addSect('address')}${addSect('address2')}${addSect('city')}${addSect('state', true)}${addSect('zip')}${addSect('country')}`;
  if (address.endsWith(', ')) {
    address = address.slice(0, -2);
  }

  return <RenderField icon={includeIcon ? 'location' : undefined} value={address} sx={{...handleFont(stylesData, 'm')}}/>;
}
