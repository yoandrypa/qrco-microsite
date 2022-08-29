import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface OptionsSelProps {
  handleData: Function;
  label: string;
  property: string;
  selected: string;
  options: { label: string; value: string; }[];
}

const OptionsSelector = ({ handleData, options, label, property, selected }: OptionsSelProps) => {
  const id = `${property}id`;

  return (
    <FormControl sx={{ m: 0, width: '100%' }} size="small">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        fullWidth
        value={selected}
        label={label}
        onChange={handleData(property)}
      >
        {options.map((x: { value: string; label: string }) => (
          <MenuItem key={`${id}${x.value}`} value={x.value}>{x.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OptionsSelector;
