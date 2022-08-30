import Generator from './Generator';
import MainQrContext from './MainQrContext';

interface CommonGenProps {
  newOne: boolean;
}

export default function CommonGenerator({ newOne }: CommonGenProps) {
  return (
    <MainQrContext>
      <Generator />
    </MainQrContext>
  );
}