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
import IconButton from '@mui/material/IconButton';
import ForwardIcon from '@mui/icons-material/Forward';

import Image from "next/image";
import { SOCIALS } from "../../components/qr/constants";

const ButtonLink = prop => <IconButton target="_blank" component="a" {...prop} />;

// @ts-ignore
export default function Handler({ data }) {
  const newData = JSON.parse(data);

  const downloadFile = () => {
    SOCIALS.forEach((x: string) => {
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

  const renderSocials = (item: string, label: string) => {
    let value = newData[item] as string;
    value = value.slice(value.indexOf(':') + 1);

    let url = '' as string;
    switch (item) {
      case 'facebook': { url = 'https://www.facebook.com/'; break; }
      case 'twitter': { url = 'https://twitter.com/'; break; }
      case 'pinterest': { url = 'https://www.pinterest.com/'; break; }
      case 'whatsapp': { url = 'https://wa.me/'; break; }
      case 'telegram': { url = 'https://t.me/'; break; }
      case 'linkedin': { url = 'https://www.linkedin.com/in/'; break; }
      case 'instagram': { url = 'https://www.instagram.com/'; break; }
      case 'youtube': { url = 'https://www.youtube.com/'; break; }
    }

    url += value;

    return (
      <Grid item xs={12} style={{ paddingTop: 0 }}>
        <TextField
          label={label}
          size="small"
          fullWidth
          margin="dense"
          // @ts-ignore
          value={value}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><RenderIcon icon={item} enabled /></InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end"><ButtonLink href={url}><ForwardIcon /></ButtonLink></InputAdornment>
            )
          }}
        />
      </Grid>
    );
  }

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
          {newData.facebook && renderSocials('facebook', 'Facebook')}
          {newData.whatsapp && renderSocials('whatsapp', 'Whatsapp')}
          {newData.twitter && renderSocials('twitter', 'Twitter')}
          {newData.linkedin && renderSocials('linkedin', 'LinkedIn')}
          {newData.instagram && renderSocials('instagram', 'Instagram')}
          {newData.youtube && renderSocials('youtube', 'Youtube')}
          {newData.pinterest && renderSocials('pinterest', 'Pinterest')}
          {newData.telegram && renderSocials('telegram', 'Telegram')}
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
