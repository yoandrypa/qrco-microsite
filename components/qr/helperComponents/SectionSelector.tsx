// @ts-nocheck

import { useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import UploadIcon from '@mui/icons-material/Upload';
import { alpha } from '@mui/material/styles';

interface SectionSelectorProps {
  handleSelect: Function;
  isUpload?: boolean | false;
  label?: string | '';
  isFrame?: boolean | false;
  icon?: string | null;
  selected: boolean;
};

const SectionSelector = ({ label, handleSelect, icon, selected, isUpload, isFrame }: SectionSelectorProps) => {
  const fileInput = useRef<any>();

  const renderIcon = () => {
    if (isUpload) {
      return <UploadIcon />
    } else if (icon === null) {
      return <DoDisturbIcon />
    } else {
      return <Box component="img" src={icon} sx={{ width: '30px' }} />
    }
  };

  const handler = (f: Blob | MediaSource) => {
    if (f) {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onloadend = (e) => {
        handleSelect('image', { fileContents: e.target.result, file: URL.createObjectURL(f) }, !isUpload ? icon : 'external');
      };
    }
  }

  const beforeHandle = () => {
    if (!isUpload) {
      if (icon) {
        if (!isFrame) {
          fetch(icon)
            .then(response => response.text())
            .then(data => {
              const blob = new Blob([data], { type: 'image/svg+xml' });
              handler(blob);
            });
        } else {
          handleSelect('image', icon);
        }
      } else {
        handleSelect('image', null);
      }
    } else {
      fileInput.current.click();
    }
  };

  const onLoadFile = ({ target }) => {
    const f = target.files[0];
    handler(f);
    fileInput.ref.value = '';
  };

  return (
    <Box>
      <Button
        sx={{
          width: '50px',
          height: '60px',
          backgroundColor: theme => alpha(theme.palette.info.light, selected ? 0.25 : 0.1),
          '&:hover': {
            backgroundColor: theme => alpha(theme.palette.info.light, 0.4)
          }
        }}
        variant={selected ? 'outlined' : 'text'}
        onClick={beforeHandle}
      >
        {isUpload && <input ref={fileInput} accept="image/*" type="file" style={{ display: 'none' }} onChange={onLoadFile} />}
        {renderIcon()}
      </Button>
      <Typography sx={{
        width: '100%',
        textAlign: 'center',
        fontWeight: selected ? 'bold' : 'normal',
        fontSize: 'small',
        fontVariantCaps: 'all-petite-caps'
      }}>
        {label}
      </Typography>
    </Box>
  );
};

export default SectionSelector;
