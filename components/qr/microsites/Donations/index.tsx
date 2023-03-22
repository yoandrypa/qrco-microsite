import React from "react";
import { useRouter } from "next/router";
import AfterDonation from "./AfterDonation";
import BeforeDonation from "./BeforeDonation";

import { DonationsProps } from "./types";

export default function DonationsInfo({ data }: DonationsProps) {
  const router = useRouter();

  const { thanks } = router.query;

  return thanks ? <AfterDonation data={data} /> : <BeforeDonation data={data} />;
}
