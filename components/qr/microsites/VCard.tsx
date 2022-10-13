import {useMemo} from "react";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import {downloadVCard, getColors} from "./renderers/helper";

import {ColorTypes} from "../types/types";

import RenderField from "./renderers/RenderField";

interface VCardProps {
  newData: any;
}

export default function VCard({newData}: VCardProps) {
  function downloadFile() {
    downloadVCard({...newData});
  }

  const colors = useMemo(() => (getColors(newData)), []) as ColorTypes; // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainMicrosite colors={colors} url={newData.shortlinkurl}>
      <CardContent>
        <Grid container spacing={1}>
          {newData.prefix && <RenderField label="Prefix" value={newData.prefix}/>}
          {newData.firstName && <RenderField label="First name"value={newData.firstName}/>}
          {newData.lastName && <RenderField label="Last name" value={newData.lastName}/>}
          {newData.cell && <RenderField label="Cell number" value={newData.cell} icon="cell" color={newData.secondary} />}
          {newData.phone && <RenderField label="Phone number" value={newData.phone} icon="phone" color={newData.secondary} />}
          {newData.fax && <RenderField label="Fax" value={newData.fax}/>}
          {newData.organization && <RenderField label="Organization" value={newData.organization}/>}
          {newData.position && <RenderField label="Position" value={newData.position}/>}
          {newData.address && <RenderField label="Address" value={newData.address} icon="location" color={newData.secondary} />}
          {newData.city && <RenderField label="City" value={newData.city}/>}
          {newData.zip && <RenderField label="Zip code" value={newData.zip}/>}
          {newData.state && <RenderField label="State/Province" value={newData.state}/>}
          {newData.country && <RenderField label="Country" value={newData.country || ""}/>}
          {newData.email && <RenderField label="Email" value={newData.email}/>}
          {newData.web && <RenderField label="Web" value={newData.web}/>}
          <RenderSocials newData={newData} />
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="outlined" sx={{mt: "10px"}} onClick={downloadFile}>Get Contact</Button>
      </CardActions>
    </MainMicrosite>
  );
}
