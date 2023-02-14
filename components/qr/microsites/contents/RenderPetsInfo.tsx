import {CustomProps, handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";

export default function RenderPetsInfo({data, stylesData}: CustomProps) {
  if (!data?.petName?.length && !data?.petBreed?.length && !data?.petGender?.length && !data.petYearOfBirth?.length) {
    return null;
  }

  return (
    <>
      <RenderField
        value={`${data.petBreed ? data.petBreed : ''} ${data.petGender ? data.petGender : ''} ${data.petYearOfBirth ? data.petYearOfBirth : ''}`}
        sx={handleFont(stylesData,'m')}
      />
    </>
  );
}
