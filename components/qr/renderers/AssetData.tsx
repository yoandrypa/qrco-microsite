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
import * as StorageHandler from "../../../handlers/storage";

export type AssetDataProps = {
  type: "image" | "video" | "pdf" | "audio";
  data: {
    images?: string[];
    videos?: File[];
    pdfs?: File[];
    audios?: File[];
  };
  setData: Function;
}

const AssetData = ({ type, data, setData }: AssetDataProps) => {
  const handleValues = (item: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const tempo = { ...data };
    if (files?.length) {
      const filesToUpload = [...files];
      // @ts-ignore
      if (tempo[item]) {
        const isAlreadyIncluded = (uploadedFile: File, fileToUpload: File) => {
          return uploadedFile.name === fileToUpload.name && uploadedFile.lastModified === fileToUpload.lastModified;
        };

        filesToUpload.forEach(async fileToUpload => {
          // @ts-ignore
          if (!tempo[item].some(uploadedFile => isAlreadyIncluded(uploadedFile, fileToUpload))) {
            //Upload to Storage
            StorageHandler.upload([fileToUpload]);
            // @ts-ignore
            tempo[item].push({
              name: fileToUpload.name,
              lastModified: fileToUpload.lastModified
            });
          }
        });
      } else {
        // @ts-ignore
        tempo[item] = [...filesToUpload].map(file => {
          return {
            name: file.name,
            lastModified: file.lastModified
          };
        });
      }
      // @ts-ignore
    } else if (tempo[item]) {
      // @ts-ignore
      delete tempo[item];
    }
    setData(tempo);
  };

  return (
    <Common msg={`Your ${type} details. Users can store your ${type}s you right away.`}>
      <Grid container justifyContent="end">
        <Grid item xs={12} justifyContent="flex-end">
          <Button variant="outlined" component="label" startIcon={<UploadRounded />}>
            Upload some {type}
            <input id="assetFile"
              // @ts-ignore
                   onChange={handleValues(`${type}s`)}
                   hidden
                   accept={type === "pdf" ? ".pdf" : type + "/*"}
                   multiple={["image"].includes(type)}
                   type="file" />
          </Button>
        </Grid>
        <Grid item xs={12} paddingTop={1}>
          <Divider textAlign="left">Files list</Divider>
          <List>
            {/*@ts-ignore*/}
            {(data && data[`${type}s`]) ? data[`${type}s`].map((file: File, index) => (
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
