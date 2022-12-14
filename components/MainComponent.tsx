import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Typography from "@mui/material/Typography";

import { handleDesignerString } from "../helpers/qr/helpers";
import { ASSETS, GALLERY } from "./helpers/generalFunctions";

const FileMicro = dynamic(() => import("./qr/microsites/FileMicro"));
const Donations = dynamic(() => import("./qr/microsites/Donations"));
const LinksMicro = dynamic(() => import("./qr/microsites/LinksMicro"));
const VCard = dynamic(() => import("./qr/microsites/VCard"));
const Images = dynamic(() => import("./qr/microsites/Images"));
const Business = dynamic(() => import("./qr/microsites/Business"));
const PetsId = dynamic(() => import("./qr/microsites/PetsId"));
const Coupons = dynamic(() => import("./qr/microsites/Coupons"));
const SocialInfo = dynamic(() => import("./qr/microsites/SocialInfo"));
const Web = dynamic(() => import("./qr/microsites/Web"));
const SamplesList = dynamic(() => import("./SamplesList"));

interface MainCompProps {
  newData: any;
}

export default function MainComponent({ newData }: MainCompProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(newData.isAnEmptyPreview === undefined ? newData : null);

  const iframed = useRef<boolean>(false);

  useEffect(() => {
    setLoading(false);

    if (window.top !== window) { // @ts-ignore
      window.top.postMessage( // @ts-ignore
        JSON.stringify({ readyForDuty: true }), process.env.REACT_APP_QRCO_URL
      );
      iframed.current = true;
    }

    const handler = (event: any) => {
      if (event.origin === process.env.REACT_APP_QRCO_URL) {
        try {
          const data = JSON.parse(event.data);
          if (data.previewData !== undefined) {
            setData(data.previewData);
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
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography sx={{ mx: "auto" }}>{"Loading..."}</Typography>
          <Typography sx={{
            color: theme => theme.palette.text.disabled,
            mx: "auto",
          }}>{"Please wait."}</Typography>
        </Box>
      </Box>
    );
  }

  if (data?.samples) {
    return <SamplesList newData={data.samples} />;
  }

  if (data?.qrType === "vcard+") {
    return <VCard newData={data} />;
  }

  if (GALLERY.includes(data?.qrType)) {
    return <Images newData={{ ...data, iframed: iframed.current }} />;
  }

  if (data?.qrType === "business") {
    return <Business newData={data} />;
  }

  if (data?.qrType === "coupon") {
    return <Coupons newData={data} />;
  }

  if (data?.qrType === "social") {
    return <SocialInfo newData={data} />;
  }

  if (["web", "twitter", "whatsapp", "facebook"].includes(data?.qrType)) {
    return <Web urlString={handleDesignerString(data.qrType, data)} />;
  }

  if (ASSETS.includes(data?.qrType)) {
    return <FileMicro newData={data} />;
  }

  if (['donation', 'donations'].includes(data?.qrType)) {
    return <Donations newData={data} />;
  }

  if (data?.qrType === "link") {
    return <LinksMicro newData={data} />;
  }

  if (newData.qrType === "petId") {
    return <PetsId newData={newData} />
  }

  return (
    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      {(!data && newData.isAnEmptyPreview) ? (
        <Typography sx={{ textAlign: 'center' }}>{'Preparing preview...'}</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <EngineeringIcon color="primary" sx={{ mx: "auto", fontSize: "50px" }} />
          <Typography sx={{ mx: "auto" }}>{"Work in progress."}</Typography>
          <Typography sx={{ color: theme => theme.palette.text.disabled, mx: "auto" }}>
            {"This is going to be ready very soon."}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
