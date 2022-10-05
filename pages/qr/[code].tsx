import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { QrDataModel } from "../../models/qr/QrDataModel";

import VCard from "../../components/qr/microsites/VCard";
import Web from "../../components/qr/microsites/Web";
import Business from "../../components/qr/microsites/Business";
import Coupons from "../../components/qr/microsites/Coupons";
import SocialInfo from "../../components/qr/microsites/SocialInfo";

// @ts-ignore
export default function Handler({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (data === "NO DATA") {
    return <>{"Ops! Unable to process your request."}</>;
  }

  const newData = JSON.parse(data);

  if (newData.qrType === "vcard+") {
    return (<VCard newData={newData} />);
  }

  if (newData.qrType === 'business') {
    return (<Business newData={newData} />);
  }

  if (newData.qrType === 'coupon') {
    return (<Coupons newData={newData} />);
  }

  if (newData.qrType === 'social') {
    return (<SocialInfo newData={newData} />);
  }

  if (newData.qrType === 'web') {
    return (<Web newData={newData} />);
  }

  return (
    <div>{"We are working on this. Come back soon."}</div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  // @ts-ignore
  const { code } = params;
  const data = await QrDataModel.get({ id: code });
  if (!data) {
    return { props: { data: "NO DATA" } };
  }

  return { props: { data: JSON.stringify(data) } };
};
