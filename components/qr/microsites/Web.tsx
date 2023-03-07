import { useEffect } from 'react';
import PleaseWait from '../../PleaseWait';
import {verifyProtocol} from "../../../helpers/qr/helpers";

interface WebProps {
  urlString: string;
}

export default function Web({urlString}: WebProps) {
  useEffect(() => {
    window.location.replace(verifyProtocol(urlString));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PleaseWait redirecting />
  );
}
