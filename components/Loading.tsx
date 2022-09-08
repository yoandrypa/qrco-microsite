import Context from "./context/Context";
import React, { useContext } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
  //@ts-ignore
  const { loading } = useContext(Context);
   return (<Backdrop
     sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={loading}
   >
     <CircularProgress color="inherit" />
   </Backdrop>)
};

export default Loading;
