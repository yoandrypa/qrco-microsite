import TextField from '@mui/material/TextField';
import Common from '../helperComponents/Common';

import MultiLineDetails from '../helperComponents/MultiLineDetails';

export type WhatsAppProps = {
  data: { number?: string, message?: string };
  setData: Function
};

function WhatsAppData({ data, setData }: WhatsAppProps) {
  const handleValues = (item: 'number' | 'message') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const tempo = { ...data };
    if (value.length) {
      tempo[item] = item !== 'number' ? value.slice(0, 500) : value || '';
    } else if (tempo[item]) {
      delete tempo[item];
    }
    setData(tempo);
  };

  return (
    <Common msg="Enter the message you will send through Whatsapp, up to 500 chatacters.">
      <>
        <TextField
          label="Number"
          size="small"
          required
          fullWidth
          margin="dense"
          value={data?.number || ''}
          onChange={handleValues('number')} />
        <TextField
          rows={3}
          multiline={true}
          label="Message"
          size="small"
          fullWidth
          margin="dense"
          value={data?.message || ''}
          onChange={handleValues('message')} />
        <MultiLineDetails top={500} data={data?.message || ''} />
      </>
    </Common>
  );
};

export default WhatsAppData;