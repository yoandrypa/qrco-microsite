import {ReactNode} from 'react';
import Typography from '@mui/material/Typography';

interface CommonProps {
  msg: string;
  children: React.ReactNode;
};

function Common({ msg, children }: CommonProps) {
  return (
    <>
      <Typography>{msg}</Typography>
      {children}
    </>
  );
}

export default Common;