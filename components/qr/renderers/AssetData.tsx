import Common from "../helperComponents/Common";
import Button from "@mui/material/Button";
import RenderIcon from "../helperComponents/RenderIcon";
import { ChangeEvent } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemAvatar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { UploadRounded } from "@mui/icons-material";
import { humanDate } from "../../helpers/generalFunctions";

export type AssetDataProps = {
  type: "image" | "video" | "pdf" | "audio";
  data: {
    files?: File[];
  };
  setData: Function;
}

const limits = (type: string): string => {
  switch (type) {
    case "pdf":
      return "Up to 5 files or 50 MB";
    default:
      return "Up to N Files o M MB";
  }
};

const AssetData = ({ type, data, setData }: AssetDataProps) => {
  const handleValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const tempo = { ...data };
    if (files?.length) {
      const filesToUpload = [...files];
      // @ts-ignore
      if (tempo["files"]) {
        const isAlreadyIncluded = (uploadedFile: File, fileToUpload: File) => {
          return uploadedFile.name === fileToUpload.name && uploadedFile.lastModified === fileToUpload.lastModified;
        };

        filesToUpload.forEach(async fileToUpload => {
          // @ts-ignore
          if (!tempo["files"].some(uploadedFile => isAlreadyIncluded(uploadedFile, fileToUpload))) {
            //Upload to Storage
            //StorageHandler.upload([fileToUpload]);
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
    <Common msg={`${type.toUpperCase()} files. ${limits(type)}.`}>
      <Grid container justifyContent="end">
        <Grid item xs={12} justifyContent="flex-end">
          <Button variant="outlined" component="label" startIcon={<UploadRounded />}>
            Upload a {type}
            <input id="assetFile"
              // @ts-ignore
                   onChange={handleValues}
                   hidden
                   accept={type === "pdf" ? ".pdf" : type + "/*"}
                   multiple //={["image"].includes(type)}
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
                <ListItemText primary={file.name} secondary={`Last update: ${humanDate(file.lastModified)}`} />
              </ListItem>
            )) : null}
          </List>
        </Grid>
      </Grid>
    </Common>
  );
};

export default AssetData;
