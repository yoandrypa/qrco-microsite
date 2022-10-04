import {DEFAULT_COLORS, SOCIALS} from "../constants";
import {handleDesignerString} from "../../../helpers/qr/helpers";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../helperComponents/RenderIcon";

interface VCardProps {
  newData: any;
}

export default function VCard({newData}: VCardProps) {
  const downloadFile = () => {
    SOCIALS.forEach((x: string) => {
      if (newData[x]) {
        delete newData[x];
      }
    });

    const contents = handleDesignerString("vcard", newData);
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
    <MainMicrosite colors={{ p: newData.primary || DEFAULT_COLORS.p, s: newData.secondary || DEFAULT_COLORS.s }}>
      <CardContent>
        <Grid container spacing={1}>
          {newData.prefix && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Prefix" size="small" fullWidth margin="dense" value={newData.prefix}/>
          </Grid>)}
          {newData.firstName && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="First name" size="small" fullWidth margin="dense" value={newData.firstName}/>
          </Grid>)}
          {newData.lastName && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Last name" size="small" fullWidth margin="dense" value={newData.lastName}/>
          </Grid>)}
          {newData.cell && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Cell number"
              size="small"
              fullWidth
              margin="dense"
              value={newData.cell}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RenderIcon icon="cell" enabled color={newData.secondary || DEFAULT_COLORS.s}/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>)}
          {newData.phone && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Phone number"
              size="small"
              fullWidth
              margin="dense"
              value={newData.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RenderIcon icon="phone" enabled color={newData.secondary || DEFAULT_COLORS.s}/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>)}
          {newData.fax && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Fax" size="small" fullWidth margin="dense" value={newData.fax}/>
          </Grid>)}
          {newData.organization && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Organization" size="small" fullWidth margin="dense" value={newData.organization}/>
          </Grid>)}
          {newData.position && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Position" size="small" fullWidth margin="dense" value={newData.position}/>
          </Grid>)}
          {newData.address && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField
              label="Address"
              size="small"
              fullWidth
              margin="dense"
              value={newData.address}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RenderIcon icon="location" enabled color={newData.secondary || DEFAULT_COLORS.s}/>
                  </InputAdornment>
                )
              }}
            />
          </Grid>)}
          {newData.city && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="City" size="small" fullWidth margin="dense" value={newData.city}/>
          </Grid>)}
          {newData.zip && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Zip code" size="small" fullWidth margin="dense" value={newData.zip}/>
          </Grid>)}
          {newData.state && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="State/Province" size="small" fullWidth margin="dense" value={newData.state}/>
          </Grid>)}
          {newData.country && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Country" size="small" fullWidth margin="dense" value={newData.country || ""}/>
          </Grid>)}
          {newData.email && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Email" size="small" fullWidth margin="dense" value={newData.email}/>
          </Grid>)}
          {newData.web && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Web" size="small" fullWidth margin="dense" value={newData.web}/>
          </Grid>)}
          <RenderSocials newData={newData} />
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="outlined" sx={{mt: "10px"}} onClick={downloadFile}>Get Contact</Button>
      </CardActions>
    </MainMicrosite>
  );
}
