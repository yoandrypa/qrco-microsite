import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';

interface ExpanderProps {
  expand: string | null;
  setExpand: (expander: string | null) => void;
  item: string;
  title: string;
}

const Expander = ({expand, setExpand, item, title}: ExpanderProps) => {
  const handleExpand = () => {
    if (expand === item) {
      setExpand(null);
    } else {
      setExpand(item);
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <Typography>{title}</Typography>
      <IconButton onClick={handleExpand} size="small">
        {expand === item ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
      </IconButton>
    </Box>
  );
}

export default Expander;
