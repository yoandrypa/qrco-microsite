import React from "react";
import qrSection from "./section";

import { IViewProps, IQrSetting, IQrData } from './types';

const componentId = 'sendMeMoney';

const setting: IQrSetting<IQrData> = {
  id: componentId,
  name: 'Send Me Money',
  renderView: ({ data, ...props }: IViewProps<IQrData>) => {
    return qrSection.renderView({
      data: data.custom[0].data, index: 0, ...props
    })
  },
};

export default setting;