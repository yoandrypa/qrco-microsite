import {ReactNode, useContext} from "react";
import Typography from "@mui/material/Typography";
import Context from "../../context/Context";
import RenderQRCommons from "../renderers/RenderQRCommons";

import {DEFAULT_COLORS} from "../constants";

interface CommonProps {
  msg: string;
  children: ReactNode;
}

function Common({ msg, children }: CommonProps) {
  // @ts-ignore
  const { selected, data, setData } = useContext(Context);

  const handleValue = (prop: string) => (payload: any) => {
    if (prop !== 'both') {
      setData({ ...data, [prop]: payload.target?.value !== undefined ? payload.target.value : payload});
    } else if (payload.p !== DEFAULT_COLORS.p || payload.s !== DEFAULT_COLORS.s) {
      setData({ ...data, primary: payload.p, secondary: payload.s });
    } else {
      const temp = { ...data };
      if (data.primary) { delete data.primary; }
      if (data.secondary) { delete data.secondary; }
      setData(temp);
    }
  };

  return (
    <>
      <RenderQRCommons
        handleValue={handleValue}
        qrName={data?.qrName}
        omitColorSel={['web', 'facebook', 'twitter', 'whatsapp'].includes(selected) || !data?.isDynamic}
        primary={data?.primary}
        secondary={data.secondary} />
      <Typography>{msg}</Typography>
      {children}
    </>
  );
}

export default Common;
