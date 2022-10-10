import {DEFAULT_COLORS} from "../constants";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../helperComponents/RenderIcon";
import {downloadVCard, getColors} from "./renderers/helper";

interface VCardProps {
  newData: any;
}

export default function VCard({newData}: VCardProps) {
  function downloadFile() {
    downloadVCard({...newData});
  }

  return (
    <MainMicrosite colors={getColors(newData)} url={newData.shortlinkurl}>
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
