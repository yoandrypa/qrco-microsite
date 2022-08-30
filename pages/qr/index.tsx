import QrTypeSelector from '../../components/qr/QrTypeSelector';
import MainQrContext from '../../components/qr/MainQrContext';

export default function QrGen() {
  return (
    <MainQrContext>
      <QrTypeSelector />
    </MainQrContext>
  );
};
