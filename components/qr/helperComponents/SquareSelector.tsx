import {alpha} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RenderIcon from "./RenderIcon";
import Typography from "@mui/material/Typography";

interface SquareSelectorProps {
  selected: boolean;
  item: string;
  label: string;
  handleSelection: Function;
}

const SquareSelector = ({selected, item, label, handleSelection}: SquareSelectorProps) => {
  const beforeHandle = () => {
    handleSelection(item);
  };

  return (
    <Box sx={{ mr: 1, mb: 1 }}>
      <Button
        sx={{
          width: '95px',
          height: '60px',
          backgroundColor: theme => alpha(theme.palette.info.light, selected ? 0.25 : 0.1),
          '&:hover': {
            backgroundColor: theme => alpha(theme.palette.info.light, 0.4)
          }
        }}
        variant={selected ? 'outlined' : 'text'}
        onClick={beforeHandle}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ width: '100%', mx: 'auto' }}>
            <RenderIcon icon={item} enabled />
          </Box>
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
      </Button>
    </Box>
  );
};

export default SquareSelector;
