import MainMicrosite from "./qr/microsites/MainMicrosite";

import Link from 'next/link'

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import pluralize from "pluralize";
import {DEFAULT_COLORS} from "./qr/constants";

const SamplesList = ({newData}: any) => (
  <MainMicrosite type="sample" colors={{ p: DEFAULT_COLORS.p, s: DEFAULT_COLORS.s }}>
    <Box sx={{ p: 2, width: '100%' }}>
      <Typography variant="h6">{'Example Microsites'}</Typography>
      <Typography sx={{ mb: 2, color: theme => theme.palette.text.disabled }}>{`${pluralize('microsite', newData.length, true)} found`}</Typography>
      <ul>
        {newData.map((x: string) => (
          <li key={`li${x}`} style={{ marginBottom: '7px' }}>
            <Link key={x} href={`/sample/${x}`}>{x}</Link>
          </li>
        ))}
      </ul>
    </Box>
  </MainMicrosite>
);

export default SamplesList;
