import Typography from '@mui/material/Typography';

interface MultiLineDetailsProps {
  top: number;
  data?: string;
};

function MultiLineDetails({ top, data = '' }: MultiLineDetailsProps) {
  const length = top - data.length;
  return (
    <Typography
      sx={{
        marginTop: '-7px',
        textAlign: 'end',
        paddingRight: '10px',
        fontSize: 'small',
        color: theme => theme.palette.text.disabled
      }}>
      {`${length} character${length !== 1 ? 's' : ''} left`}
    </Typography>
  );
}

export default MultiLineDetails;
