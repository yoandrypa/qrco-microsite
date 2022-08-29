import React, { useState } from "react";
import { IntlProvider } from "react-intl";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../libs/aws/aws-exports";
import components from "../libs/aws/components";
import * as UserHandler from "../handlers/users";
import * as LinkHandler from "../handlers/links";
import * as DomainHandler from "../handlers/domains";

Amplify.configure(awsExports);

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { MAIN_CONFIG } from "../consts";
import { themeConfig } from "../utils/theme";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Home from "../components/Home";
import { UserContext } from "../utils/contexts";

export default function Index({ linksData, domainsData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [mainConfig, setMainConfig] = useState(MAIN_CONFIG);
  const [messages, setMessages] = useState(undefined);
  const { locale, theme } = mainConfig;
  // @ts-ignore
  const mainTheme = createTheme(themeConfig(theme));

  return (
    <Authenticator components={components}>
      {({ signOut, user }) => (
        <ThemeProvider theme={mainTheme}>
          {/*@ts-ignore*/}
          <IntlProvider locale={locale} messages={messages}>
            {/*@ts-ignore*/}
            <UserContext.Provider value={{ user, signOut }}>
              <Home linksData={linksData} domainsData={domainsData} />
            </UserContext.Provider>
          </IntlProvider>
        </ThemeProvider>
      )}
    </Authenticator>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let cookies = {};
  for (const [key, value] of Object.entries(req.cookies)) {
    // @ts-ignore
    cookies[key.split(".").pop()] = value;
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
