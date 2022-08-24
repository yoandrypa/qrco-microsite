import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Object } from 'aws-sdk/clients/s3';

import Common from '../helperComponents/Common';

type TwitterDataProps = {
  data: {
    text?: string;
    via?: string;
    hashtags?: string;
    url?: string;
  };
  setData: Function;
};

export const availableTwittChars = (data: {text?: string; via?: string; hashtags?: string; url?: string;}) => {
  return 280 - ((data.text || '').length + (data.via ? `@${data.via}` : '').length +
    (data.url || '').length + (data.hashtags ? data.hashtags.split(',').map((x: string) => `#${x}`).join(' ') : '').length);
}

const TwitterData = ({ data, setData }: TwitterDataProps) => {
  const handleValues = (item: 'text' | 'via' | 'hashtags' | 'url') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const tempo = { ...data };
    if (value.length) {
      tempo[item] = value;
    } else if (tempo[item]) {
      delete tempo[item];
    }
    setData(tempo);
  };

  const renderAvailability = () => {
    const total = availableTwittChars(data);
    if (total < 0) {
      return <Typography color="error">Too many characters, the total amount of characters must be 280</Typography>
    }

    return <Typography>{`${total} available character${total !== 1 ? 's' : 0}`}</Typography>;
  };

  return (
    <Common msg="You can post a tweet with a link, an user's reference and a list of hashtags.">
      <>
        <TextField
          label="Text"
          size="small"
          fullWidth
          margin="dense"
          value={data.text || ''}
          onChange={handleValues('text')} />
        <TextField
          label="Mention username (do not include the @ symbol)"
          size="small"
          fullWidth
          margin="dense"
          value={data.via || ''}
          onChange={handleValues('via')} />
        <TextField
          label="Hashtags (comma separated, do not include the # symbol)"
          size="small"
          fullWidth
          margin="dense"
          value={data.hashtags || ''}
          onChange={handleValues('hashtags')} />
        <TextField
          label="URL"
          size="small"
          fullWidth
          margin="dense"
          value={data.url || ''}
          onChange={handleValues('url')} />
        {renderAvailability()}
      </>
    </Common>);
};


export default TwitterData;
