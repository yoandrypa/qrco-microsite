import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import RenderIcon from './RenderIcon';

interface TypeSelectorProps {
  handleSelect: Function;
  label: string;
  description: string;
  icon: string;
  selected: boolean;
};

const TypeSelector = ({ handleSelect, label, description, icon, selected }: TypeSelectorProps) => {
  const beforeHandle = () => {
    handleSelect(icon);
  };

  return (
    <Box
      sx={{
        cursor: 'pointer',
        width: '100%',
        height: '95px',
        borderRadius: '5px',
        border: theme => `solid 1px ${theme.palette.text.disabled}`,
        backgroundColor: theme => alpha(theme.palette.info.light, selected ? 0.5 : 0.05),
        '&:hover': {
          backgroundColor: theme => alpha(theme.palette.info.light, 0.3)
        }
      }}
      onClick={beforeHandle}
    >
      <Box sx={{ display: 'flex', p: 1 }}>
        <Box sx={{ mt: '3px' }}>
          {<RenderIcon icon={icon} />}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', ml: 1 }}>
          <Typography sx={{ width: '100%', fontWeight: 'bold' }} variant="h6">
            {label}
          </Typography>
          <Typography sx={{ width: '100%', color: theme => theme.palette.text.disabled }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TypeSelector;