import {useMemo} from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import {getColors} from "./renderers/helper";
import {ColorTypes} from "../types/types";

interface DonationsProps {
  newData: any;
}

export default function DonationsInfo({newData}: DonationsProps) {
  const colors = useMemo(() => (getColors(newData)), []) as ColorTypes; // eslint-disable-line react-hooks/exhaustive-deps

  return (
  //TODO
   <CardContent>
        <Grid container spacing={1}>
        
        </Grid>
     </CardContent>
  
  );
}
