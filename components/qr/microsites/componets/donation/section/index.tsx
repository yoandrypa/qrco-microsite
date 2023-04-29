import React from "react";
import dynamic from "next/dynamic";

import { IViewProps, IQrSetting, ISectionData } from './types';

const Form = dynamic(() => import('./form'));

const setting: IQrSetting<ISectionData> = {
  id: 'donation',
  name: 'Donation',
  renderView: (props: IViewProps<ISectionData>) => <Form {...props} />,
};

export default setting;