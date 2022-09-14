import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {
  DeleteOutlineRounded,
  Edit,
  LocalOffer,
  Public
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { sanitize } from "../../utils";
import Link from "next/link";
import format from "date-fns/format";
import * as QrHandler from "../../handlers/qrs";
import { useRouter } from "next/router";
import React from "react";
import Context from "../context/Context";
import Button from "@mui/material/Button";
import { QR_TYPE_ROUTE } from "./constants";

const QrList = ({ qrs }: any) => {
  // @ts-ignore
  const { setLoading } = React.useContext(Context);
  const router = useRouter();
  const handleDelete = async (qrId: string, userId: string) => {
    setLoading(true);
    const deleted = await QrHandler.remove({ id: qrId, userId: userId });
    if (deleted) {
      router.push("/").then(() => setLoading(false));
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" style={{ fontWeight: "bold" }}>My QR Codes</Typography>
      {
        qrs?.length > 0
          ? qrs.map((qr: any) => {
            const qrLink = sanitize.link(qr.shortLinkId || {});
            // @ts-ignore
            return (
              <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={3} key={qr.id}>
                <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
                  <Grid item xs={0.1}>
                    {/*<Checkbox />*/}
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
                    <Stack direction="column" spacing={0.8} justifyContent="flex-start" alignItems="flex-start">
                      <Typography variant="caption" style={{ color: "gray" }}>
                        <LocalOffer fontSize="inherit" /> {qr.isDynamic ? "Dynamic" : "Static"}
                      </Typography>
                      {qrLink.address ? <Typography variant="caption" style={{ color: "gray" }}>
                        {/*@ts-ignore*/}
                        <Public fontSize="inherit" /> <Link href={qrLink.link}>{qrLink.link}</Link>
                      </Typography> : <></>}
                      <Typography variant="caption" style={{ color: "gray" }}>
                        <Edit fontSize="inherit" /> Updated at: {format(new Date(qr.updatedAt), "do 'of' MMMM 'of' yyyy")}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    {qr.isDynamic ?
                      <Stack direction="column" spacing={1.2} justifyContent="flex-start" alignItems="center">
                        <Typography variant="h4" style={{ color: qrLink.visit_count > 0 ? "blue" : "red" }}>
                          {/*@ts-ignore*/}
                          {qrLink.visit_count}
                        </Typography>
                        <Typography variant="caption" style={{ color: "gray" }}>
                          Scans
                        </Typography>
                      </Stack> : ""}
                  </Grid>
                  <Grid item xs={2.8}>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center">
                      {/*<IconButton color="primary"><InfoOutlined /></IconButton>
                    <IconButton color="primary"><DownloadingRounded /></IconButton>
                    <IconButton color="primary"><PauseCircleOutlined /></IconButton>
                    <IconButton color="error"><CancelOutlined /></IconButton>*/}
                      <IconButton color="error" onClick={() => handleDelete(qr.id, qr.userId)}>
                        <DeleteOutlineRounded />
                      </IconButton>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            );
          })
          : <Alert severity="info" variant="outlined"
                   action={<Button size="small" variant="outlined"
                                   onClick={() => router.push(QR_TYPE_ROUTE)}>Check</Button>}>
            <AlertTitle>What? You still don&apos;t have any own QR?</AlertTitle>
            Take a look at our wonderful proposals that we have for you, surely
            some of them will be of great interest to you.
          </Alert>
      }
    </Stack>
  );
};

export default QrList;
