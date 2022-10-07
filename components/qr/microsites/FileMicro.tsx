import {useEffect, useMemo, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import MainMicrosite from "./MainMicrosite";
import {getColors, handleDownloadFiles} from "./renderers/helper";
import {PDFViewer} from "@react-pdf/renderer";
import {download} from "../../../handlers/storage";
import {FileType} from "../types/types";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";

interface FileProps {
  newData: any;
}

export default function FileMicro({newData}: FileProps) {
  const [dataFile, setDataFile] = useState<any>(null);
  const colors = useMemo(() => (getColors(newData)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const getContent = async (item: string) => {
    const data = await download(item) as FileType;

    // const blob = await fetch(data.content).then(r => r.blob());

    setDataFile(data);
  }

  useEffect(() => {
    if (newData.files?.length) {
      getContent(newData.files[0].Key);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainMicrosite colors={colors} url={newData.shortlinkurl}>
      <Box sx={{width: '100%', textAlign: 'center', mt: '-35px', color: colors.s}}>
        <Typography>{newData.qrType.toUpperCase()}</Typography>
      </Box>
      {dataFile ? (
        <Button
          sx={{ mt: 2, width: '100%', color: colors.p, background: colors.s, '&:hover': {color: colors.s, background: colors.p} }}
          variant="outlined"
          onClick={() => handleDownloadFiles(dataFile)}
          startIcon={<DownloadIcon />}
        >
          {`Download ${newData.qrType}`}
        </Button>
      ) : (
        <Box sx={{width: '100%', textAlign: 'center', mt: 2, color: colors.p}}>
          <Typography>{'Please wait...'}</Typography>
        </Box>
      )}
    </MainMicrosite>
  );
}
