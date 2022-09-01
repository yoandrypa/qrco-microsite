import { useEffect, useState } from 'react';

import components from '../libs/aws/components';
import * as UserHandler from '../handlers/users';
import * as LinkHandler from '../handlers/links';
import * as DomainHandler from '../handlers/domains';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import Home from '../components/Home';
import { UserContext } from '../utils/contexts';

import { Amplify, Auth, Hub } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../libs/aws/aws-exports';
import { QR_TYPE_ROUTE } from '../components/qr/constants';

Amplify.configure(awsExports);

export default function Index({ linksData, domainsData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    const updateUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setIsLogged(Boolean(user));
      } catch {
        setIsLogged(false);
      }
    }
    Hub.listen('auth', updateUser);
    updateUser();
    return () => Hub.remove('auth', updateUser);
  }, []);

  useEffect(() => {
    if (isLogged !== null && !isLogged) {
      router.push(QR_TYPE_ROUTE);
    }
  }, [isLogged]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLogged === null || !isLogged) {
    return <>Please wait...</>
  }

  return (
    <Authenticator components={components}>
      {/* @ts-ignore */}
      {({ signOut, user }) => (<UserContext.Provider value={{ user, signOut }}>
        <Home linksData={linksData} domainsData={domainsData} />
      </UserContext.Provider>)}
    </Authenticator>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
