import TextField from '@mui/material/TextField';

import Common from '../helperComponents/Common';
import MultiLineDetails from '../helperComponents/MultiLineDetails';

export type SMSDataProps = {
  data: {
    number?: string;
    message?: string;
  };
  setData: Function;
};

const SMSData = ({ data, setData }: SMSDataProps) => {
  const handleValues = (item: 'message' | 'number') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const tempo = { ...data };
    if (value.length) {
      tempo[item] = item === 'message' ? value.slice(0, 160) : value;
    } else if (tempo[item]) {
      delete tempo[item];
    }
    setData(tempo);
  };

  return (
    <Common msg="You can receive SMSs in the number you provide. Also you can enter a message up to 160 characters.">
      <>
        <TextField
          label="Number"
          size="small"
          fullWidth
          margin="dense"
          value={data?.number || ''}
          onChange={handleValues('number')} />
        <TextField
          label="Message"
          size="small"
          fullWidth
          margin="dense"
          value={data?.message || ''}
          onChange={handleValues('message')} />
        <MultiLineDetails top={160} data={data?.message || ''} />
      </>
    </Common>);
}

export default SMSData;