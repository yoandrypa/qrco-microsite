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

  const [data, setData] = useState<any>(newData.isAnEmptyPreview === undefined ? newData : null);

  useEffect(() => {
    if (window.top !== window) { // @ts-ignore
      window.top.postMessage( // @ts-ignore
        JSON.stringify({readyForDuty: true}), process.env.REACT_APP_QRCO_URL
      );
      setIframed(true);
    }
    setLoading(false);

    const handler = (event: any) => {
      if (event.origin === process.env.REACT_APP_QRCO_URL) {
        try {
          const data = JSON.parse(event.data)
          if (data.previewData !== undefined) {
            const {previewData} = data;
            setData(previewData);
          }
        } catch (e) {
          console.error(e)
        }
      }
    }

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
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

  if (data?.samples) {
    return <SamplesList newData={data.samples}/>;
  }

  if (data?.qrType === "vcard+") {
    return <VCard newData={data}/>;
  }

  if (GALLERY.includes(data?.qrType)) {
    return <Images newData={{...data, iframed}}/>;
  }

  if (data?.qrType === "business") {
    return <Business newData={data}/>;
  }

  if (data?.qrType === "coupon") {
    return <Coupons newData={data}/>;
  }

  if (data?.qrType === "social") {
    return <SocialInfo newData={data}/>;
  }

  if (["web", "twitter", "whatsapp", "facebook"].includes(data?.qrType)) {
    return <Web urlString={handleDesignerString(data.qrType, data)}/>;
  }

  if (ASSETS.includes(data?.qrType)) {
    return <FileMicro newData={data}/>;
  }

  if (data?.qrType === "donations") {
    return <Donations newData={data}/>;
  }

  if (data?.qrType === "link") {
    return <LinksMicro newData={data}/>;
  }

  return (
    <Box sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      {(!data && newData.isAnEmptyPreview) ? (
        <Typography sx={{textAlign: 'center'}}>{'Preparing preview...'}</Typography>
      ) : (
      <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
        <EngineeringIcon color="primary" sx={{mx: "auto", fontSize: "50px"}}/>
        <Typography sx={{mx: "auto"}}>{"Work in progress."}</Typography>
        <Typography sx={{
          color: theme => theme.palette.text.disabled,
          mx: "auto",
        }}>{"This is going to be ready very soon."}</Typography>
      </Box>
      )}
    </Box>
  );
}
