import {ReactNode} from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface MicrositesProps {
  children: ReactNode;
}

export default function MainMicrosite({children}: MicrositesProps) {
  return (
    <Card sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "460px"
    }}>
      <CardMedia title="Your title">
        <Image src="/qr/vcard+.png" height={220} width={460} alt="VCARD+"/>
      </CardMedia>
      {children}
    </Card>
  );
}
