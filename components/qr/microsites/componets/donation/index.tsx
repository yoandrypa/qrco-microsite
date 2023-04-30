import React from "react";
import dynamic from "next/dynamic";

import { IViewProps, IQrSetting, IQrData } from './types';
import { iFrameDetected } from "@ebanux/ebanux-utils/utils";

const Custom = dynamic(() => import("../../../microsites/Custom"));

const setting: IQrSetting<IQrData> = {
  id: 'donation',
  name: 'Donation',
  renderView: ({ data }: IViewProps<IQrData>) => {
    return <Custom newData={{ ...data, iframed: iFrameDetected() }} />;
  },
};

export default setting;