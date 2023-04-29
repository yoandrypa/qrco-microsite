import React from "react";
import qrSection from "./section";

import { IViewProps, IQrSetting, IQrData } from './types';

const setting: IQrSetting<IQrData> = {
  id: 'sendMeMoney',
  name: 'Send Me Money',
  renderView: ({ data, ...props }: IViewProps<IQrData>) => {
    return qrSection.renderView({
      data: data.custom[0].data, index: 0, ...props
    })
  },
};

export default setting;