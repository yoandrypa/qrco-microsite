import {ReactNode} from "react";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: ReactNode;
  showMe: boolean;
  key: string;
}

export default function TabPanel({children, showMe, key, ...other}: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={!showMe}
      id={`simple-tabpanel-${key}`}
      aria-labelledby={`simple-tab-${key}`}
      {...other}
    >
      {showMe && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
