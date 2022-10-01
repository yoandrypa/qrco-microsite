import { GetServerSideProps } from "next";
import { QrDataModel } from "../../models/qr/QrDataModel";

import VCard from "../../components/qr/microsites/VCard";
import Web from "../../components/qr/microsites/Web";
import Business from "../../components/qr/microsites/Business";
import Coupons from "../../components/qr/microsites/Coupons";
import SocialInfo from "../../components/qr/microsites/SocialInfo";

// @ts-ignore
export default function Handler({ data }) {
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

  // "code" is the id
  const getUserInfo = async (): Promise<{
    userData: string;
  } | null> => {
    try {
      let userInfo = { userData: "" };
      for (const [key, value] of Object.entries(req.cookies)) {
        // @ts-ignore
        userInfo[key.split(".").pop()] = value;
      }
      // @ts-ignore
      if (!userInfo.userData) {
        return null;
      }
      return userInfo;
    } catch (e) {
      return null;
    }
  };
  const userInfo = await getUserInfo();

  if (!userInfo?.userData) {
    return { props: { data: "NO DATA" } };
  }
  const userData = JSON.parse(userInfo.userData as string);
  const userId = userData.UserAttributes[0].Value;
  const data = await QrDataModel.get({ id: code, userId });
  if (!data) {
    return { props: { data: "NO DATA" } };
  }

  return { props: { data: JSON.stringify(data) } };
};
