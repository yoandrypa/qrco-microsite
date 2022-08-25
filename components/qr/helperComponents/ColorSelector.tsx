// @ts-nocheck

import { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import { ColorPicker } from '@programmerraj/rc-color-picker';

const hex = /^#?([0-9A-Fa-f]{3}){1,2}$/;

const handleValue = (value: string): string => {
  let result = (' ' + value).slice(1, 7);
  if (!result.startsWith('#')) {
    result = `#${result}`;
  }
  return result;
};

interface ColorSelProps {
  color: string | undefined | null;
  label: string;
  property: string;
  handleData: Function;
};

const ColorSelector = ({ color, handleData, label, property }: ColorSelProps) => {
  const [value, setValue] = useState(color || '#000000');
  const ref = useRef(null);
  const cursorPos = useRef<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    cursorPos.current = event.target.selectionStart || 0;
    setValue(handleValue(event.target.value));
  };

  const handlePaste = ({ clipboardData }) => {
    const text = clipboardData.getData('text/plain');
    if (text.length && hex.test(value)) {
      setValue(handleValue(text));
    }
  };

  useEffect(() => {
    if (color !== value) {
      setValue(color);
    }
    if (ref.current) {
      ref.current.selectionStart = cursorPos.current;
      ref.current.selectionEnd = cursorPos.current;
    }
  }, [color]);

  useEffect(() => {
    let val = '';
    if (value.length) {
      val = (' ' + value).slice(1);
    }
    if (val.length && val !== color && hex.test(val)) {
      handleData(property)(val);
    }
  }, [value]);

  return (
    <TextField
      size="small"
      fullWidth
      margin="dense"
      variant="outlined"
      label={label}
      value={value.slice(1)}
      onChange={handleChange}
      onPaste={handlePaste}
      inputProps={{ ref }}
      error={!hex.test(value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Typography>#</Typography>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end" sx={{ mt: '5px', mr: '-5px' }}>
            <ColorPicker
              animated
              color={color}
              onChange={handleData(property)}
              mode="RGB"
              enableAlpha={false}
            />
          </InputAdornment>
        )
      }}
    />
  );
};

export default ColorSelector;
