import React from "react";
import MainMicroSite from "../MainMicrosite";
import ThankYou from "../../helperComponents/ThankYou";

import { DonationsProps } from "./types";

export default function AfterDonation({ data }: DonationsProps) {
  return (
    <MainMicroSite data={data}>
      <ThankYou qrData={data} />
    </MainMicroSite>
  );
}
