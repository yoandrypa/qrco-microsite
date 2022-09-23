import Common from "../helperComponents/Common";
import Button from "@mui/material/Button";
import React, { ChangeEvent, ReactNode, useState } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemAvatar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Delete, UploadRounded } from "@mui/icons-material";
import { humanDate } from "../../helpers/generalFunctions";
import { ALLOWED_FILE_EXTENSIONS, FILE_LIMITS, PRIMARY_LIGHT_COLOR } from "../../../consts";
import { formatBytes } from "../../../utils";

import PhotoIcon from "@mui/icons-material/Photo";
import MovieIcon from "@mui/icons-material/Movie";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import IconButton from "@mui/material/IconButton";
import Notifications from "../../notifications/Notifications";

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
    const fileSize = file.size / (1024 ** 2);
    // @ts-ignore
    if (fileSize > FILE_LIMITS[type].totalMbPerFile) {
      errors.push(`The file '${file.name}' exceeds the allowed size.`);
    }
  });

  return errors.join("\n");
};

const getIconByType = (type: string): ReactNode => {
  switch (type) {
    case "pdf":
      return <PictureAsPdfIcon />;
    case "image":
      return <PhotoIcon />;
    case "audio":
      return <VolumeUpIcon />;
    case "video":
      return <MovieIcon />;
  }
};

const AssetData = ({ type, data, setData }: AssetDataProps) => {
  const [alertMessage, setAlertMessage] = useState("");
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertMessage("");
  };

  const handleValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const tempo = { ...data };
    if (files?.length) {
      const filesToUpload = [...files];
      const errors = validateFile(filesToUpload, type, tempo["files"]?.length || 0);
      if (errors) {
        setAlertMessage(errors);
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
    }
    setData(tempo);
  };

  const handleDelete = (index: number) => {
    const tempo = { ...data };
    tempo["files"]?.splice(index, 1);
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
          <Divider textAlign="right">File list {data["files"]?.length || 0}/{FILE_LIMITS[type].totalFiles}</Divider>
          <List dense>
            {/*@ts-ignore*/}
            {(data && data["files"]) ? data["files"].map((file: File, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton color="error" edge="end" aria-label="delete file" onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: PRIMARY_LIGHT_COLOR }}>
                    {getIconByType(type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={file.name}
                              secondary={`Size: ${formatBytes(file.size)}, Last update: ${humanDate(file.lastModified)}`} />
              </ListItem>
            )) : null}
          </List>
        </Grid>
      </Grid>
      {alertMessage &&
        <Notifications severity="warning" message={alertMessage} onClose={handleClose} autoHideDuration={8000} />}
    </Common>
  );
};

export default AssetData;
