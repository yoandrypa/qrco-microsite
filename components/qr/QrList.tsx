import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  CancelOutlined,
  DeleteOutlineRounded,
  DownloadingRounded,
  Edit,
  InfoOutlined,
  LocalOffer,
  PauseCircleOutlined, PhonelinkSetupRounded,
  Public
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { sanitize } from "../../utils";
import Link from "next/link";
import format from "date-fns/format";

const QrList = ({ qrs }: any) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h6" style={{ fontWeight: "bold" }}>My QR Codes</Typography>
      {
        qrs ? qrs.map((qr: any) => {
          const qrLink = sanitize.link(qr.shortLinkId || {});
          // @ts-ignore
          return (
            <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={3} key={qr.id}>
              <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
                <Grid item xs={0.5}>
                  <Checkbox />
                </Grid>
                <Grid item xs={0.8}>
                  <Box mt={2} mb={1.5} sx={{ width: 60, height: 60 }}>
                    <Image src="/ebanuxQr.svg" width={55} height={55} alt={qr.qrName} />
                  </Box>
                </Grid>
                <Grid item xs={3.5}>
                  <Stack direction="column">
                    <Typography variant="subtitle2" style={{ color: "orange" }}>{qr.qrType}</Typography>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>{qr.qrName}</Typography>
                    <Typography variant="caption" style={{ color: "gray" }}>Created
                      at: {format(new Date(qr.createdAt), "do 'of' MMMM 'of' yyyy")}</Typography>
                  </Stack>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={3.5}>
                  <Stack direction="column" spacing={0.8}>
                    <Typography variant="caption" style={{ color: "gray" }}>
                      <LocalOffer fontSize="inherit" /> {qr.isDynamic ? "Dynamic" : "Static"}
                    </Typography>
                    <Typography variant="caption" style={{ color: "gray" }}>
                      {/*@ts-ignore*/}
                      <Public fontSize="inherit" /> <Link href={qrLink.link}>{qrLink.link}</Link>
                    </Typography>
                    <Typography variant="caption" style={{ color: "gray" }}>
                      <Edit fontSize="inherit" /> Updated at: {format(new Date(qr.updatedAt), "do 'of' MMMM 'of' yyyy")}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <Stack direction="column" spacing={1.2} justifyContent="flex-start" alignItems="center">
                    <Typography variant="h4" style={{ color: "red" }}>
                      {/*@ts-ignore*/}
                      {qrLink.visit_count}
                    </Typography>
                    <Typography variant="caption" style={{ color: "gray" }}>
                      Scans
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2.6}>
                  <Stack direction="row" justifyContent="flex-end" alignItems="center">
                    <IconButton color="primary"><InfoOutlined /></IconButton>
                    <IconButton color="primary"><DownloadingRounded /></IconButton>
                    <IconButton color="primary"><PauseCircleOutlined /></IconButton>
                    <IconButton color="error"><CancelOutlined /></IconButton>
                    <IconButton color="error"><DeleteOutlineRounded /></IconButton>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          );
        }) : ""
      }
    </Stack>
  );
};

export default QrList;
