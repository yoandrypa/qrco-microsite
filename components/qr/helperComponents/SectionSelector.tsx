import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import UploadIcon from '@mui/icons-material/Upload';
import { alpha } from '@mui/material/styles';

import Notifications from '../../../components/notifications/Notifications';

interface SectionSelectorProps {
  handleSelect: Function;
  isUpload?: boolean | false;
  label?: string | '';
  isFrame?: boolean | false;
  icon?: string | null;
  selected: boolean;
}

const SectionSelector = ({ label, handleSelect, icon, selected, isUpload, isFrame }: SectionSelectorProps) => {
  const fileInput = useRef<any>();
  const [error, setError] = useState<boolean>(false);

  const renderIcon = () => {
    if (isUpload) {
      return <UploadIcon />
    } else if (icon === null) {
      return <DoNotDisturbIcon />
    } else {
      return <Box component="img" src={icon} sx={{ width: '30px' }} />
    }
  };

  const handler = (f: Blob | MediaSource) => {
    if (f) {
      const reader = new FileReader();
      // @ts-ignore
      reader.readAsDataURL(f);
      reader.onloadend = e => {
        // @ts-ignore
        if (e.total <= 30720) {
          // @ts-ignore
          handleSelect('image', { fileContents: e.target.result, file: URL.createObjectURL(f) }, !isUpload ? icon : null);
        } else {
          setError(true);
        }
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

  // @ts-ignore
  const onLoadFile = ({ target }) => {
    const f = target.files[0];
    handler(f);
    fileInput.current.value = '';
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
      {error && (
        <Notifications onClose={() => { setError(false); }} message="The selected file is larger than 30 kilobytes." />
      )}
    </Box>
  );
};

export default SectionSelector;
