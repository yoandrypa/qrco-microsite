import components from '../libs/aws/components';
import * as UserHandler from '../handlers/users';
import * as LinkHandler from '../handlers/links';
import * as DomainHandler from '../handlers/domains';

import {GetServerSideProps, InferGetServerSidePropsType} from 'next';

import Home from '../components/Home';

import {Amplify, Auth} from 'aws-amplify';
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../libs/aws/aws-exports';
import {QR_TYPE_ROUTE} from '../components/qr/constants';

Amplify.configure(awsExports);

export default function Index({ linksData, domainsData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Authenticator components={components}>
      {/* @ts-ignore */}
      {({ signOut, user }) => (
        <Home linksData={linksData} domainsData={domainsData} userInformation={user} />
      )}
      {/*{({ signOut, user }) => (<UserContext.Provider value={{ user, signOut }}>*/}
      {/*  <Home linksData={linksData} domainsData={domainsData} userInformation={userInfo} />*/}
      {/*</UserContext.Provider>)}*/}
    </Authenticator>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  let cookies = {};
  for (const [key, value] of Object.entries(req.cookies)) {
    // @ts-ignore
    cookies[key.split('.').pop()] = value;
  }
  // @ts-ignore
  if (!cookies.userData) {
    return {
      props: {
        linksData: JSON.stringify({}),
        domainsData: JSON.stringify([])
      }
    };
  }

  const getUserInfo = async () => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch {
      return null;
    }
  }

  let userInfo = null;
  if (query.login) {
    userInfo = await getUserInfo();
  }

  if (!Boolean(query.login) && !Boolean(userInfo)) {
    return {
      redirect: {
        destination: QR_TYPE_ROUTE,
        permanent: false
      }
    };
  }

  // @ts-ignore
  const userData = JSON.parse(cookies.userData as string);
  const userId = userData.UserAttributes[0].Value;
  let user = await UserHandler.find(userId);
  if (!user) {
    user = await UserHandler.create({ id: userId });
  }
  const links = await LinkHandler.list({ limit: 10, user_id: user.id });
  const domains = await DomainHandler.list({ user_id: user.id });

  return {
    props: {
      linksData: JSON.stringify(links),
      domainsData: JSON.stringify(domains),
      revalidate: 10
    }
  };
};
