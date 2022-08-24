import TextField from "@mui/material/TextField";
import Common from "../helperComponents/Common";

type FacebookDataProps = {
  data: { message: string; };
  setData: Function;
};

function FacebookData({ data, setData }: FacebookDataProps) {
  const handleValues = (item: 'message') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const tempo = { ...data };
    if (value.length) {
      tempo[item] = value;
    } else if (tempo[item]) {
      // @ts-ignore
      delete tempo[item]; 
    }
    setData(tempo);
  };

  return (
    <Common msg="URL to be shared in your wall.">
      <TextField
        rows={3}
        multiline={true}
        label="Post"
        size="small"
        fullWidth
        margin="dense"
        value={data.message || ''}
        onChange={handleValues('message')} />
    </Common>
  );
}

export default FacebookData;
