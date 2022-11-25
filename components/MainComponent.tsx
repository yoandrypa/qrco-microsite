import VCard from "./qr/microsites/VCard";
import Images from "./qr/microsites/Images";
import Business from "./qr/microsites/Business";
import Coupons from "./qr/microsites/Coupons";
import SocialInfo from "./qr/microsites/SocialInfo";
import Web from "./qr/microsites/Web";
import {handleDesignerString} from "../helpers/qr/helpers";
import FileMicro from "./qr/microsites/FileMicro";
import Donations from "./qr/microsites/Donations";
import LinksMicro from "./qr/microsites/LinksMicro";
import Box from "@mui/material/Box";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Typography from "@mui/material/Typography";
import SamplesList from "./SamplesList";
import {useEffect, useState} from "react";
import {ASSETS, GALLERY} from "./helpers/generalFunctions";

interface MainCompProps {
  newData: any;
}

export default function MainComponent({newData}: MainCompProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [iframed, setIframed] = useState<boolean>(false);

  useEffect(() => {
    setIframed(window.top !== window);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
        <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
          <Typography sx={{mx: "auto"}}>{"Loading..."}</Typography>
          <Typography sx={{
            color: theme => theme.palette.text.disabled,
            mx: "auto",
          }}>{"Please wait."}</Typography>
        </Box>
      </Box>
    );
  }

  if (newData.samples) {
    return <SamplesList newData={newData.samples}/>;
  }

  if (newData.qrType === "vcard+") {
    return <VCard newData={newData}/>;
  }

  if (GALLERY.includes(newData.qrType)) {
    return <Images newData={{...newData, iframed}}/>;
  }

  if (newData.qrType === "business") {
    return <Business newData={newData}/>;
  }

  if (newData.qrType === "coupon") {
    return <Coupons newData={newData}/>;
  }

  if (newData.qrType === "social") {
    return <SocialInfo newData={newData}/>;
  }

  if (["web", "twitter", "whatsapp", "facebook"].includes(newData.qrType)) {
    return <Web urlString={handleDesignerString(newData.qrType, newData)}/>;
  }

  if (ASSETS.includes(newData.qrType)) {
    return <FileMicro newData={newData}/>;
  }

  if (newData.qrType === "donations") {
    return <Donations newData={newData}/>;
  }

  if (newData.qrType === "link") {
    return <LinksMicro newData={newData}/>;
  }

  return (
    <Box sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
        <EngineeringIcon color="primary" sx={{mx: "auto", fontSize: "50px"}}/>
        <Typography sx={{mx: "auto"}}>{"Work in progress."}</Typography>
        <Typography sx={{
          color: theme => theme.palette.text.disabled,
          mx: "auto",
        }}>{"This is going to be ready very soon."}</Typography>
      </Box>
    </Box>
  );
}
