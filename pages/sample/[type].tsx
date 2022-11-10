import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import path from "path";
import {promises as fs} from "fs";
import Box from "@mui/material/Box";
import DangerousIcon from "@mui/icons-material/Dangerous";

import MainComponent from "../../components/MainComponent";
import Typography from "@mui/material/Typography";

export default function SampleMicrosite({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

  return <MainComponent newData={data}/>;
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  // @ts-ignore
  const {type} = params;

  let result = {};
  let fileContents = "";

  try {
    const directory = path.join(process.cwd(), '/public/json');
    fileContents = await fs.readFile(`${directory}/${type}`, 'utf8');
  } catch {
    result = {error: 'IO Error'};
  }
  if (fileContents !== "") {
    try {
      result = JSON.parse(fileContents);
    } catch {
      result = {error: 'Malformed sample file structure'};
    }
  }

  return {
    props: {
      data: {...result, shortlinkurl: 'https://www.example.com'}
    }
  };
};
