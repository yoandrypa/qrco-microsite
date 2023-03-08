import {GetStaticProps} from "next";
import Box from "@mui/material/Box";
import DangerousIcon from "@mui/icons-material/Dangerous";

import MainComponent from "../../components/MainComponent";
import Typography from "@mui/material/Typography";

export default function SampleMicrosite({data}: any) {
  if (data.error) {
    return (
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <DangerousIcon color="error" sx={{ mx: "auto", fontSize: "50px" }}/>
          <Typography sx={{ fontWeight: 'bold', mx: 'auto' }}>{"Ops! Something went wrong."}</Typography>
          <Typography sx={{ mx: 'auto' }}>{data.error}</Typography>
          <Typography
            sx={{ color: theme => theme.palette.text.disabled, mx: "auto" }}>
            {"Please, contact support by clicking "}
            <a target="_blank" href="mailto:info@ebanux.com"
               rel="noopener noreferrer"
               style={{ color: "royalblue" }}>{"here"}</a>
            {"."}
          </Typography>
        </Box>
      </Box>
    );
  }

  return <MainComponent newData={{samples: data}} />;
}

export const getStaticProps: GetStaticProps = async() => {
  let result:any;
  try {
    result = await import('../../json/filesIndex.json');
  } catch {
    result = {error: 'IO Error'};
  }

  // @ts-ignore
  if (!result.error) {
    try {
      // @ts-ignore
      result = JSON.parse(JSON.stringify(result));
    } catch {
      result = {error: 'Malformed sample file structure'};
    }
  }

  return {
    props: {
      data: result.files
    }
  };
};
