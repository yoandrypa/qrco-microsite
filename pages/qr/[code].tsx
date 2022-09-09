import { GetServerSideProps } from "next";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../../components/qr/helperComponents/RenderIcon";
import { handleDesignerString } from "../../helpers/qr/helpers";
import { QrDataModel } from "../../models/qr/QrDataModel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Image from "next/image";

// @ts-ignore
export default function Handler({ data }) {
  const newData = JSON.parse(data);
  const downloadFile = () => {
    ['facebook', 'whatsapp', 'twitter', 'instagram', 'linkedin', 'pinterest', 'telegram', 'youtube'].forEach((x: string) => {
      if (newData[x]) {
        delete newData[x];
      }
    });

    const contents = handleDesignerString("vcard", newData, null);
    const file = new File([contents], "my vcard.vcf", {
      type: "text/plain"
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "460px" }}>
      <CardMedia title="Your title">
        <Image src="/qr/vcard+.png" height={220} width={460} alt="VCARD+" />
      </CardMedia>
      <CardContent>
        <Grid container spacing={1}>
          {newData.prefix && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Prefix" size="small" fullWidth margin="dense" value={newData.prefix} />
          </Grid>)}
          {newData.firstName && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="First name" size="small" fullWidth margin="dense" value={newData.firstName} />
          </Grid>)}
          {newData.lastName && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Last name" size="small" fullWidth margin="dense" value={newData.lastName} />
          </Grid>)}
          {newData.cell && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Cell number" size="small" fullWidth margin="dense" value={newData.cell} />
          </Grid>)}
          {newData.phone && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Phone number" size="small" fullWidth margin="dense" value={newData.phone} />
          </Grid>)}
          {newData.fax && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Fax" size="small" fullWidth margin="dense" value={newData.fax} />
          </Grid>)}
          {newData.organization && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Organization" size="small" fullWidth margin="dense" value={newData.organization} />
          </Grid>)}
          {newData.position && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Position" size="small" fullWidth margin="dense" value={newData.position} />
          </Grid>)}
          {newData.address && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Address" size="small" fullWidth margin="dense" value={newData.address} />
          </Grid>)}
          {newData.city && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="City" size="small" fullWidth margin="dense" value={newData.city} />
          </Grid>)}
          {newData.zip && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Zip code" size="small" fullWidth margin="dense" value={newData.zip} />
          </Grid>)}
          {newData.state && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="State/Province" size="small" fullWidth margin="dense" value={newData.state} />
          </Grid>)}
          {newData.country && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Country" size="small" fullWidth margin="dense" value={newData.country || ""} />
          </Grid>)}
          {newData.email && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Email" size="small" fullWidth margin="dense" value={newData.email} />
          </Grid>)}
          {newData.web && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField label="Web" size="small" fullWidth margin="dense" value={newData.web} />
          </Grid>)}
          {newData.facebook && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Facebook"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={newData.facebook}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><RenderIcon icon="facebook" enabled /></InputAdornment>
                )
              }}
            />
          </Grid>)}
          {newData.whatsapp && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Whatsapp"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={newData.whatsapp}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><RenderIcon icon="whatsapp" enabled /></InputAdornment>
                )
              }}
            />
          </Grid>)}
          {newData.twitter && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Twitter"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={newData.twitter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><RenderIcon icon="twitter" enabled /></InputAdornment>
                )
              }}
            />
          </Grid>)}
          {newData.linkedin && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="LinkedIn"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={newData.linkedin}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><RenderIcon icon="linkedin" enabled /></InputAdornment>
                )
              }}
            />
          </Grid>)}
          {newData.instagram && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Instagram"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={newData.instagram}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><RenderIcon icon="instagram" enabled /></InputAdornment>
                )
              }}
            />
          </Grid>)}{newData.youtube && (<Grid item xs={12} style={{ paddingTop: 0 }}>
          <TextField
            label="YouTube"
            size="small"
            fullWidth
            margin="dense"
            // @ts-ignore
            value={newData.youtube}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"><RenderIcon icon="youtube" enabled /></InputAdornment>
              )
            }}
          />
        </Grid>)}
          {newData.pinterest && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Pinterest"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={newData.pinterest}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><RenderIcon icon="pinterest" enabled /></InputAdornment>
                )
              }}
            />
          </Grid>)}
          {newData.telegram && (<Grid item xs={12} style={{ paddingTop: 0 }}>
            <TextField
              label="Telegram"
              size="small"
              fullWidth
              margin="dense"
              // @ts-ignore
              value={newData.telegram}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><RenderIcon icon="telegram" enabled /></InputAdornment>
                )
              }}
            />
          </Grid>)}
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="outlined" sx={{ mt: "10px" }} onClick={downloadFile}>Get Contact</Button>
      </CardActions>
    </Card>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  // @ts-ignore
  const { code } = params;

  // "code" is the id
  const data = await QrDataModel.get(code);
  return { props: { data: JSON.stringify(data) } };
};
