import {useEffect} from "react";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import Box from "@mui/material/Box";
import DangerousIcon from "@mui/icons-material/Dangerous";

import MainComponent from "../../components/MainComponent";
import Typography from "@mui/material/Typography";

export default function SampleMicrosite({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    if (window.top !== window) { // that is to say we are iframed!!!
      if (data.error) { // @ts-ignore
        window.top.postMessage( // @ts-ignore
          JSON.stringify({ error: true, message: data.error }), process.env.REACT_APP_QRCO_URL
        );
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (data.error) {
    return (
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
          <DangerousIcon color="error" sx={{mx: "auto", fontSize: "50px"}}/>
          <Typography sx={{fontWeight: 'bold', mx: 'auto'}}>{"Ops! Something went wrong."}</Typography>
          <Typography sx={{mx: 'auto'}}>{data.error}</Typography>
          <Typography
            sx={{color: theme => theme.palette.text.disabled, mx: "auto"}}>
            {"Please, contact support by clicking "}
            <a target="_blank" href="mailto:info@ebanux.com"
               rel="noopener noreferrer"
               style={{color: "royalblue"}}>{"here"}</a>
            {"."}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    // <Context.Provider value={{ containerDimensions }}>
      <MainComponent newData={{...data, isSample: true}}/>
    // </Context.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  // @ts-ignore
  let {type} = params;

  let result: any;

  if (type === 'filesIndex') {
    result = {error: 'Unable to process your request'}
  } else {
    try {
      result = await import(`../../json/${type}.json`);
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
  }

  return {
    props: {
      data: {...result, shortlinkurl: 'https://www.example.com'}
    }
  };
};
