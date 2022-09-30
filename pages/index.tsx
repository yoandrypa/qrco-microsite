import components from "../libs/aws/components";
import * as UserHandler from "../handlers/users";
import * as QrHandler from "../handlers/qrs";
import { QR_TYPE_ROUTE } from "../components/qr/constants";
import QrHome from "../components/qr/QrHome";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../libs/aws/aws-exports";
import { useRouter } from "next/router";
import PleaseWait from "../components/PleaseWait";
import QrGen from "./qr/type";

Amplify.configure(awsExports);

export default function Index({ qrData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { qrs } = JSON.parse(qrData);

  console.log(qrs, qrData);

  const router = useRouter();
  if (router.isFallback) {
    return <PleaseWait />;
  }

  if (!Object.keys(qrData).length && !router.query.login && !router.query.qr_text) {
    debugger;

    return <QrGen />;
  }

  return (
    <Authenticator components={components}>
      {({ user }) => (
        <QrHome qrData={qrData} userInformation={user} />
      )}
    </Authenticator>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  res.setHeader(
    "Cache-Control",
    "private, s-maxage=10, stale-while-revalidate=59"
  );

  const getUserInfo = async () => {
    try {
      let userInfo = {};
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

  // @ts-ignore
  // if (!Boolean(userInfo) && !Boolean(query.login) && !Boolean(query.qr_text)) {
  //   return {
  //     redirect: {
  //       destination: QR_TYPE_ROUTE,
  //       permanent: false
  //     }
  //   };
  // }

  // @ts-ignore
  if (!userInfo?.userData) {
    return {
      props: {
        qrData: JSON.stringify({noUser: true}),
        revalidate: 1
      }
    };
  }

  // @ts-ignore
  const userData = JSON.parse(userInfo.userData as string);
  const userId = userData.UserAttributes[0].Value;
  let user = await UserHandler.find(userId);
  if (!user) {
    user = await UserHandler.create({ id: userId });
  }
  const qrs = await QrHandler.list({ userId: user.id });

  return {
    props: {
      qrData: JSON.stringify(qrs),
      revalidate: 10
    }
  };
};
