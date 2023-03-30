import React from "react";
import { useRouter } from "next/router";
import AfterDonation from "./AfterDonation";
import BeforeDonation from "./BeforeDonation";

import { DonationsProps } from "./types";

export default function DonationsInfo(props: DonationsProps) {
  const router = useRouter();

  const { thanks } = router.query;

  return thanks ? <AfterDonation {...props} /> : <BeforeDonation {...props} />;
}
