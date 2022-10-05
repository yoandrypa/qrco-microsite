import { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import {
  DeleteOutlineRounded,
  Edit, EditOutlined,
  ElectricBolt,
  Public
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { sanitize } from "../../utils";
import Link from "next/link";
import format from "date-fns/format";
import * as QrHandler from "../../handlers/qrs";
import { useRouter } from "next/router";
import Context from "../context/Context";
import RenderNewQrButton from "../renderers/RenderNewQrButton";
import RenderPreview from "./renderers/RenderPreview";
import { Modal } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const QrList = ({ qrs }: any) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteParams, setDeleteParams] = useState({ id: "", userId: "" });
  // @ts-ignore
  const { isLoading, setLoading, options, setOptions } = useContext(Context);
  const router = useRouter();

  const handleEdit = (qr: QrDataType) => {
    setLoading(true);
    setOptions({ ...options, ...qr, mode: "edit" });
    /*if (qr.isDynamic) {
      router.push("/qr/content").then(() => {
        setStep(1);
        setLoading(false);
      });
    } else {
      router.push("/qr/new").then(() => {
        setStep(2);
        setLoading(false);
      });
    }*/
  };

  const handleDelete = async () => {
    setLoading(true);
    const deleted = await QrHandler.remove(deleteParams);
    if (deleted) {
      setDeleteConfirm(false);
      router.push("/").then(() => {
        setDeleteParams({ id: "", userId: "" });
        setLoading(false);
      });
    }
  };

  const handleCancelDeletion = () => {
    setDeleteParams({ id: "", userId: "" });
    setDeleteConfirm(false);
  };

  const showConfirmationDialog = (qrId: string, userId: string) => {
    setDeleteParams({ id: qrId, userId: userId });
    setDeleteConfirm(true);
  };

  const renderQr = (qrOptions: any, value: string, name: string) => {
    const options = { ...qrOptions };

    if (!options.image?.trim().length) {
      options.image = null;
    }
    options.data = value;
    return (<RenderPreview qrDesign={options} name={name} />);
  };

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>My QR Codes</Typography>
        {
          qrs?.length > 0
            ? qrs.filter((qr: QrDataType) => deleteConfirm || qr.id !== deleteParams.id).map((qr: any) => {
              // @ts-ignore
              const qrLink = sanitize.link(qr.shortLinkId || {});

              // @ts-ignore
              return (
                <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={3} key={qr.id}>
                  <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Grid item xs={0.1}>
                      {/*<Checkbox />*/}
                    </Grid>
                    <Grid item xs={0.8}>
                      <Box sx={{ width: "70px" }}>
                        {!qr.qrOptionsId || !Object.keys(qr.qrOptionsId).length ? (
                          <Box sx={{ mt: 2, mb: 1.5 }}>
                            <Image src="/ebanuxQr.svg" width={55} height={55} alt={qr.qrName} />
                          </Box>
                        ) : (
                          <Box sx={{ mt: 1 }}>
                            {renderQr(qr.qrOptionsId, !qr.isDynamic ? qr.value : qr.qrOptionsId.data, qr.qrName)}
                          </Box>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={3.5}>
                      <Stack direction="column">
                        <Typography variant="subtitle2" style={{ color: "orange" }}>{qr.qrType}</Typography>
                        <Typography variant="h6" style={{ fontWeight: "bold" }}>{qr.qrName}</Typography>
                        <Typography variant="caption" style={{ color: "gray" }}>
                          Created at: {format(new Date(qr.createdAt), "MMM d, yyyy")}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={3.5}>
                      <Stack direction="column" spacing={0.8} justifyContent="flex-start" alignItems="flex-start">
                        <Typography variant="caption" style={{ color: "gray" }}>
                          <ElectricBolt fontSize="inherit" /> {qr.isDynamic ? "Dynamic" : "Static"}
                        </Typography>
                        {qrLink.address ? <Typography variant="caption" style={{ color: "gray" }}>
                          {/*@ts-ignore*/}
                          <Public fontSize="inherit" /> <Link href={qrLink.link}>{qrLink.link}</Link>
                        </Typography> : <></>}
                        <Typography variant="caption" style={{ color: "gray" }}>
                          <Edit fontSize="inherit" /> Updated at: {format(new Date(qr.updatedAt), "MMM d, yyyy")}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={1}>
                      {qr.isDynamic ?
                        <Stack direction="column" spacing={1.2} justifyContent="flex-start" alignItems="center">
                          <Typography variant="h4" style={{ color: qrLink.visitCount > 0 ? "blue" : "red" }}>
                            {/*@ts-ignore*/}
                            {qrLink.visitCount}
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
                        <IconButton color="primary" disabled={isLoading} onClick={() => handleEdit(qr)}>
                          <EditOutlined />
                        </IconButton>
                        <IconButton color="error" disabled={isLoading}
                                    onClick={() => showConfirmationDialog(qr.id, qr.userId)}>
                          <DeleteOutlineRounded />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })
            : <Grid container justifyContent="center" alignItems="center"
                    sx={{ height: "calc( 100vh - 200px );" }}>
              <Grid item>
                <Alert severity="info" variant="outlined"
                       action={<RenderNewQrButton />}
                       sx={{ width: 450, p: 5 }}
                >
                  There are no QR codes.
                </Alert>
              </Grid>
            </Grid>
        }
      </Stack>
      {deleteConfirm ?
        <Dialog
          sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
          maxWidth="xs"
          open={deleteConfirm}>
          <DialogTitle>Delete confirmation</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete the selected QR?</Typography>
            <Typography variant="caption" color="orange">This action can not be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCancelDeletion}>
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        : null}
    </>
  );
};

export default QrList;
