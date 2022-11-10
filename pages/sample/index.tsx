import {GetServerSideProps, InferGetServerSidePropsType} from "next";
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

  return (
    <MainComponent newData={{samples: data}} />
  );
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  let result = {};
  try {
    const directory = process.cwd() + '/json';
    result = await fs.readdir(directory);
  } catch (error) {
    console.log(error);
    result = {error: 'IO Error'};
  }

  return {
    props: {
      data: result
    }
  };
};
