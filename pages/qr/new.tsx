import CommonGenerator from '../../components/qr/CommonGenerator';
import MainQrContext from '../../components/qr/MainQrContext';

const QrDesigner = () => {
  return (
    <MainQrContext>
      <CommonGenerator newOne />
    </MainQrContext>
  );
}

export default QrDesigner;