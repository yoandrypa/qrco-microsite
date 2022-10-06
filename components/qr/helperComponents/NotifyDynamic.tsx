import Tooltip from "@mui/material/Tooltip";
import BoltIcon from "@mui/icons-material/Bolt";

interface DynamicProps {
  styling?: object | undefined;
}

export default function NotifyDynamic({styling}: DynamicProps) {
  return (
    <Tooltip title="Dynamic QR">
      <BoltIcon sx={styling || { float: 'right' }} color="primary" />
    </Tooltip>
  );
}
