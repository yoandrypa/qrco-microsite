import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { QrDataModel } from "../../models/qr/QrDataModel";

import VCard from "../../components/qr/microsites/VCard";
import Web from "../../components/qr/microsites/Web";
import Business from "../../components/qr/microsites/Business";

// @ts-ignore
export default function Handler({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (data === "NO DATA") {
    return <>{"Ops! Unable to process your request."}</>;
  }

  const newData = JSON.parse(data);

  switch (newData.qrType) {
    case "vcard+":
      return <VCard newData={newData} />;
    case "business":
      return <Business newData={newData} />;
    case "web":
      return <Web newData={newData} />;
    default:
      return <div>{"We are working on this. Come back soon."}</div>;
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  res.setHeader(
    "Cache-Control",
    "private, s-maxage=10, stale-while-revalidate=59"
  );

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
