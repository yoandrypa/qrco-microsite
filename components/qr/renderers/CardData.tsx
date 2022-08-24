import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Common from '../helperComponents/Common';

type CardDataProps = {
  data: {
    prefix?: string;
    firstName?: string;
    lastName?: string;
    cell?: string;
    phone?: string;
    fax?: string;
    organization?: string;
    position?: string;
    address?: string;
    city?: string;
    zip?: string;
    state?: string;
    country?: string;
    email?: string;
    web?: string;
  };
  setData: Function;
};

export default function CardData({data, setData}: CardDataProps) {
  const handleValues = (item: 'prefix' | 'firstName' | 'lastName' | 'cell' | 'phone' | 'fax' |
    'organization' | 'position' | 'address' | 'city' | 'zip' | 'state' | 'country' | 'email' | 
    'web') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const tempo = { ...data };
    if (value.length) {
      tempo[item] = value;
    } else if (tempo[item]) {
      delete tempo[item];
    }
    setData(tempo);
  };

  return (
    <Common msg="Your contact details. Users can store your info or contact you right away.">
      <>
        <Typography sx={{ fontWeight: 'bold' }}>{'Presentation'}</Typography>
        <Grid container spacing={1}>
          <Grid item sm={2} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Prefix"
              size="small"
              fullWidth
              margin="dense"
              value={data.prefix || ''}
              onChange={handleValues('prefix')} />
          </Grid>
          <Grid item sm={5} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="First name"
              size="small"
              fullWidth
              margin="dense"
              value={data.firstName || ''}
              onChange={handleValues('firstName')} />
          </Grid>
          <Grid item sm={5} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Last name"
              size="small"
              fullWidth
              margin="dense"
              value={data.lastName || ''}
              onChange={handleValues('lastName')} />
          </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold' }}>{'Phones'}</Typography>
        <Grid container spacing={1}>
          <Grid item sm={4} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Cell number"
              size="small"
              fullWidth
              margin="dense"
              value={data.cell || ''}
              onChange={handleValues('cell')} />
          </Grid>
          <Grid item sm={4} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Phone number"
              size="small"
              fullWidth
              margin="dense"
              value={data.phone || ''}
              onChange={handleValues('phone')} />
          </Grid>
          <Grid item sm={4} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Fax"
              size="small"
              fullWidth
              margin="dense"
              value={data.fax || ''}
              onChange={handleValues('fax')} />
          </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold' }}>{'Organization'}</Typography>
        <Grid container spacing={1}>
          <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Organization"
              size="small"
              fullWidth
              margin="dense"
              value={data.organization || ''}
              onChange={handleValues('organization')} />
          </Grid>
          <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Position"
              size="small"
              fullWidth
              margin="dense"
              value={data.position || ''}
              onChange={handleValues('position')} />
          </Grid>
        </Grid>
        <Typography sx={{ fontWeight: 'bold' }}>{'Other info'}</Typography>
        <Grid container spacing={1}>
          <Grid item sm={8} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Address"
              size="small"
              fullWidth
              margin="dense"
              value={data.address || ''}
              onChange={handleValues('address')} />
          </Grid>
          <Grid item sm={4} xs={6} style={{ paddingTop: 0 }}>
            <TextField
              label="City"
              size="small"
              fullWidth
              margin="dense"
              value={data.city || ''}
              onChange={handleValues('city')} />
          </Grid>
          <Grid item sm={4} xs={6} style={{ paddingTop: 0 }}>
            <TextField
              label="Zip code"
              size="small"
              fullWidth
              margin="dense"
              value={data.zip || ''}
              onChange={handleValues('zip')} />
          </Grid>
          <Grid item sm={4} xs={6} style={{ paddingTop: 0 }}>
            <TextField
              label="State/Province"
              size="small"
              fullWidth
              margin="dense"
              value={data.state || ''}
              onChange={handleValues('state')} />
          </Grid>
          <Grid item sm={4} xs={6} style={{ paddingTop: 0 }}>
            <TextField
              label="Country"
              size="small"
              fullWidth
              margin="dense"
              value={data.country || ''}
              onChange={handleValues('country')} />
          </Grid>
          <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Email"
              size="small"
              fullWidth
              margin="dense"
              value={data.email || ''}
              onChange={handleValues('email')} />
          </Grid>
          <Grid item sm={6} xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Web"
              size="small"
              fullWidth
              margin="dense"
              value={data.web || ''}
              onChange={handleValues('web')} />
          </Grid>
        </Grid>
      </>
    </Common>
  );
}
