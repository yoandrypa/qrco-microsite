import Common from "../helperComponents/Common";
import Button from "@mui/material/Button";
import RenderIcon from "../helperComponents/RenderIcon";
import { ChangeEvent, useState } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemAvatar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { UploadRounded } from "@mui/icons-material";
import { humanDate } from "../../helpers/generalFunctions";
import { ALLOWED_FILE_EXTENSIONS, FILE_LIMITS } from "../../../consts";
import { CustomError, formatBytes } from "../../../utils";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export type AssetDataProps = {
  type: "image" | "video" | "pdf" | "audio";
  data: {
    files?: File[];
  };
  setData: Function;
}

const validateFile = (files: File[], type: string, total: number) => {
  let errors = [];
  // @ts-ignore
  if (files.length + total > FILE_LIMITS[type].totalFiles) {
    errors.push("The maximum number for this type of files has been reached.");
  }

  files.forEach(file => {
    const fileSize = parseFloat(formatBytes(file.size).split(" ")[0]);
    // @ts-ignore
    if (fileSize > FILE_LIMITS[type].totalMbPerFile) {
      errors.push(`The file '${file.name}' exceeds the allowed size.`);
    }
  });

  return errors.join("\n");
};

const AssetData = ({ type, data, setData }: AssetDataProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertMessage("");
    setOpenAlert(false);
  };

  const handleValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const tempo = { ...data };
    if (files?.length) {
      const filesToUpload = [...files];
      const errors = validateFile(filesToUpload, type, tempo["files"]?.length || 0);
      if (errors) {
        setAlertMessage(errors);
        setOpenAlert(true);
        return;
      }
      // @ts-ignore
      if (tempo["files"] && event.target.multiple) {
        const isAlreadyIncluded = (uploadedFile: File, fileToUpload: File) => {
          return uploadedFile.name === fileToUpload.name && uploadedFile.lastModified === fileToUpload.lastModified;
        };

        filesToUpload.forEach(async fileToUpload => {
          // @ts-ignore
          if (!tempo["files"].some(uploadedFile => isAlreadyIncluded(uploadedFile, fileToUpload))) {
            // @ts-ignore
            tempo["files"].push(fileToUpload);
          }
        });
      } else {
        // @ts-ignore
        tempo["files"] = [...filesToUpload];
      }
      // @ts-ignore
    } else if (tempo["files"]) {
      // @ts-ignore
      delete tempo["files"];
    }
    setData(tempo);
  };

  return (
    <Common
      msg={`${type.toUpperCase()} files.
      You can upload a maximum of ${FILE_LIMITS[type].totalFiles} file(s), where none can exceed ${FILE_LIMITS[type].totalMbPerFile} MBs.`}>
      <Grid container justifyContent="end">
        <Grid item xs={12} justifyContent="flex-end">
          <Button variant="outlined" component="label" startIcon={<UploadRounded />}>
            Upload a {type}
            <input id="assetFile"
              // @ts-ignore
                   onChange={handleValues}
                   hidden
                   accept={ALLOWED_FILE_EXTENSIONS[type]}
                   multiple={["image", "video"].includes(type)}
                   type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} paddingTop={1}>
          <Divider textAlign="left">Files list</Divider>
          <List>
            {/*@ts-ignore*/}
            {(data && data["files"]) ? data["files"].map((file: File, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <RenderIcon icon={type} enabled={true} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={file.name}
                              secondary={`Size: ${formatBytes(file.size)}, Last update: ${humanDate(file.lastModified)}`} />
              </ListItem>
            )) : null}
          </List>
        </Grid>
      </Grid>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Common>
  );
};

export default AssetData;
