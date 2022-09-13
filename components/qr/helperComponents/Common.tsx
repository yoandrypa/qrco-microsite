import {ChangeEvent, ReactNode, useContext} from 'react';
import Typography from '@mui/material/Typography';
import Context from "../../context/Context";
import RenderQRName from "../renderers/RenderQRName";

interface CommonProps {
  msg: string;
  children: ReactNode;
}

function Common({ msg, children }: CommonProps) {
  // @ts-ignore
  const { data, setData } = useContext(Context);

  const handleValue = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, qrName: event.target.value });
  };

  return (
    <>
      <RenderQRName handleValue={handleValue} qrName={data?.qrName} />
      <Typography>{msg}</Typography>
      {children}
    </>
  );
}

export default Common;
