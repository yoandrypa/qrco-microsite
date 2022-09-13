import React from 'react';
import TextField from '@mui/material/TextField';

import Common from '../helperComponents/Common';
import MultiLineDetails from '../helperComponents/MultiLineDetails';

type SingleDataProps = {
  limit?: number;
  msg: string;
  label: string;
  data: { value: string };
  setData: Function;
};

function SingleData({ label, data, setData, msg, limit = -1 }: SingleDataProps) {
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    if (limit !== -1) {
      value = value.slice(0, limit);
    }
    // @ts-ignore
    setData({ ...data, value });
  };

  return (
    <Common msg={msg}>
      <>
        <TextField
          rows={limit === -1 ? 1 : 3}
          multiline={limit !== -1}
          label={label}
          size="small"
          fullWidth
          margin="dense"
          value={data?.value || ''}
          onChange={handleValue}/>
        {limit !== -1 && <MultiLineDetails top={limit} data={data?.value || ''} />}
      </>
    </Common>
  );
}

export default SingleData;
