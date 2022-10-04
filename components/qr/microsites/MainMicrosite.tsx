import {ReactNode} from "react";
import Image from "next/image";

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {ColorTypes} from "../types/types";

interface MicrositesProps {
  children: ReactNode;
  colors?: ColorTypes;
}

export default function MainMicrosite({children, colors}: MicrositesProps) {
  return (
    <Card sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "460px"
    }}>
      <CardMedia title="Your title">
        {!colors ? (
          <Image src="/qr/vcard+.png" height={220} width={460} alt="VCARD+"/>
        ) : (
          <Box sx={{ width: '460px', height: '120px', background: colors.p }}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                '& .MuiFab-primary': {
                  backgroundColor: colors.s, color: colors.p,
                  '&:hover': { backgroundColor: colors.s, color: colors.p }
                }
              }}
              icon={<SpeedDialIcon />}
              FabProps={{
                sx: { bgcolor: colors.s, '&:hover': { bgcolor: 'secondary.main', color: colors.s } }
              }}
            >
            </SpeedDial>
          </Box>
        )}
      </CardMedia>
      {children}
    </Card>
  );
}
