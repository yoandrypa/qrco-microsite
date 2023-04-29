import React from 'react'

import { useRouter } from "next/router";
import { IViewProps, ISectionData } from "../types";

import AfterDonation from "./AfterDonation";
import BeforeDonation from "./BeforeDonation";

export default function Form(props: IViewProps<ISectionData>) {
  const router = useRouter();

  const { thanks } = router.query;

  return thanks ? <AfterDonation {...props} /> : <BeforeDonation {...props} />;
}
