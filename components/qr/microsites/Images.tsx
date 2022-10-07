import Image from "next/image";

import Box from "@mui/material/Box";

import MainMicrosite from "./MainMicrosite";
import { getColors } from "./renderers/helper";
import { download } from "../../../handlers/storage";
import { useEffect, useState } from "react";

interface ImageProps {
  newData: any;
}

function Images({ newData }: ImageProps) {
  const [imageUrl, setImageUrl] = useState<any>("/");

  const getContent = async (key: string) => {
    try {
      const data = await download(key);
      console.debug({ data });

      // @ts-ignore
      setImageUrl(data);

    } catch (e) {
      console.log({ "error": e });
    }
  };

  useEffect(() => {
    if (newData.files?.length) {
      getContent(newData.files[0].Key);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainMicrosite colors={getColors(newData)} url={newData.shortlinkurl}>
      <Box sx={{ width: "100px", height: "100px", position: "relative" }}>
        <Image src={imageUrl} alt="Current Image" layout="fill" />
      </Box>
    </MainMicrosite>
  );
}

export default Images;
