import components from "../libs/aws/components";
import * as UserHandler from "../handlers/users";
import * as QrHandler from "../handlers/qrs";
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

const noUser = 'noUser';

export default function Index({ qrData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  if (qrData === noUser && !router.query.login && !router.query.qr_text) {
    return <QrGen />;
  }

  if (router.isFallback) {
    return <PleaseWait />;
  }

  return (
    <Authenticator components={components}>
      {({ user }) => (
        <QrHome qrData={qrData !== noUser ? qrData : '{}'} userInformation={user} />
      )}
    </Authenticator>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
  if (!userInfo?.userData) {
    return {
      props: {
        qrData: noUser
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

  // @ts-ignore
  qrs.qrs = qrs.qrs.sort((itemA: QrDataType, itemB: QrDataType) => itemB.createdAt - itemA.createdAt);

  return {
    props: {
      qrData: JSON.stringify(qrs)
    }
  };
};
