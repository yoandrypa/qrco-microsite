import Image from "next/image";

import Box from "@mui/material/Box";

import MainMicrosite from "./MainMicrosite";
import {getColors} from "./renderers/helper";

interface ImageProps {
  newData: any;
}

function Images({newData}: ImageProps) {
  console.log(newData);

  return (
    <MainMicrosite colors={getColors(newData)} url={newData.shortlinkurl}>
      <Box sx={{ width: '100px', height: '100px', position: 'relative' }}>
        <Image src={newData.files[0].Location} alt="Current Image" layout="fill" />
      </Box>
    </MainMicrosite>
  );
}

export default Images;
