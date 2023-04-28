import React from "react";
import dynamic from "next/dynamic";

import { IViewProps, IQrSetting, ISectionData } from './types';

const Form = dynamic(() => import('./form'));

const setting: IQrSetting<ISectionData> = {
  id: 'sendMeMoney',
  name: 'Send Me Money',
  renderView: (props: IViewProps<ISectionData>) => <Form {...props} />,
};

export default setting;