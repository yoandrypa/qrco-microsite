import React from "react";
import dynamic from "next/dynamic";

import { IViewProps, IQrSetting, ISectionData } from './types';

const Form = dynamic(() => import('./form'));

const setting: IQrSetting<ISectionData> = {
  id: 'contact',
  name: 'Contact',
  renderView: (props: IViewProps<ISectionData>) => <Form {...props} />,
};

export default setting;