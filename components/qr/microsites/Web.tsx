import { useEffect } from 'react';
import PleaseWait from '../../PleaseWait';

interface WebProps {
  newData: any;
}

export default function Web({newData}: WebProps) {
  useEffect(() => {
    window.location.replace(newData.value);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PleaseWait redirecting />
  );
}
