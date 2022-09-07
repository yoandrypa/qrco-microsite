import {GetServerSideProps} from 'next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../../components/qr/helperComponents/RenderIcon";
import {handleDesignerString} from "../../helpers/qr/helpers";

// @ts-ignore
export default function Handler({ data }) {
  const downloadFile = () => {
    const newData = JSON.parse(JSON.stringify(data));
    if (newData.facebook) { delete newData.facebook; }
    if (newData.whatsapp) { delete newData.whatsapp; }
    if (newData.twitter) { delete newData.twitter; }
    if (newData.linkedin) { delete newData.linkedin; }
    if (newData.pinterest) { delete newData.pinterest; }
    if (newData.telegram) { delete newData.telegram; }

    const contents = handleDesignerString('vcard', newData, null);
    const file = new File([contents], 'my vcard.vcf', {
      type: 'text/plain'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Box sx={{ border: 'solid 1px #e3d7d7', borderRadius: '5px', p: 2, maxWidth: '400px' }}>
        <Grid container spacing={1}>
          {data.prefix && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Prefix"
              size="small"
              fullWidth
              margin="dense"
              value={data.prefix}/>
          </Grid>)}
          {data.firstName && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="First name"
              size="small"
              fullWidth
              margin="dense"
              value={data.firstName}/>
          </Grid>)}
          {data.lastName && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Last name"
              size="small"
              fullWidth
              margin="dense"
              value={data.lastName}/>
          </Grid>)}
          {data.cell && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Cell number"
              size="small"
              fullWidth
              margin="dense"
              value={data.cell}/>
          </Grid>)}
          {data.phone && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Phone number"
              size="small"
              fullWidth
              margin="dense"
              value={data.phone}/>
          </Grid>)}
          {data.fax && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Fax"
              size="small"
              fullWidth
              margin="dense"
              value={data.fax}/>
          </Grid>)}
          {data.organization && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Organization"
              size="small"
              fullWidth
              margin="dense"
              value={data.organization}/>
          </Grid>)}
          {data.position && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Position"
              size="small"
              fullWidth
              margin="dense"
              value={data.position}/>
          </Grid>)}
          {data.address && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Address"
              size="small"
              fullWidth
              margin="dense"
              value={data.address}/>
          </Grid>)}
          {data.city && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="City"
              size="small"
              fullWidth
              margin="dense"
              value={data.city} />
          </Grid>)}
          {data.zip && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Zip code"
              size="small"
              fullWidth
              margin="dense"
              value={data.zip}/>
          </Grid>)}
          {data.state && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="State/Province"
              size="small"
              fullWidth
              margin="dense"
              value={data.state}/>
          </Grid>)}
          {data.country && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Country"
              size="small"
              fullWidth
              margin="dense"
              value={data.country || ''} />
          </Grid>)}
          {data.email && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Email"
              size="small"
              fullWidth
              margin="dense"
              value={data.email}/>
          </Grid>)}
          {data.web && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Web"
              size="small"
              fullWidth
              margin="dense"
              value={data.web}/>
          </Grid>)}
          {data.facebook && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Facebook"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={data.facebook}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RenderIcon icon="facebook" enabled/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>)}
          {data.whatsapp && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Whatsapp"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={data.whatsapp}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RenderIcon icon="whatsapp" enabled/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>)}
          {data.twitter && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Twitter"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={data.twitter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RenderIcon icon="twitter" enabled/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>)}
          {data.linkedin && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="LinkedIn"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={data.linkedin}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RenderIcon icon="linkedin" enabled/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>)}
          {data.pinterest && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Pinterest"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={data.pinterest}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RenderIcon icon="pinterest" enabled/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>)}
          {data.telegram && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Telegram"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={data.telegram}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RenderIcon icon="telegram" enabled/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>)}
        </Grid>
        <Button variant="outlined" sx={{ mt: '10px' }} onClick={downloadFile}>Get Contact</Button>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const data = {
    firstName: 'Test',
    organization: 'Cenit/Ebanux',
    cell: '1234567890'
  };
  return { props: { data } };
}
