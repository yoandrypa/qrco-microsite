import React, { useState } from "react";
import { IntlProvider } from "react-intl";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../libs/aws/aws-exports";
import components from "../libs/aws/components";

Amplify.configure(awsExports);

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { MAIN_CONFIG } from "../consts";
import { themeConfig } from "../utils/theme";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import queries from "../queries";
import Home from "../components/Home";

export default function Index({ linksData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [mainConfig, setMainConfig] = useState(MAIN_CONFIG);
  const [messages, setMessages] = useState(null);
  const { locale, theme } = mainConfig;
  // @ts-ignore
  const mainTheme = createTheme(themeConfig(theme));

  return (
    <Authenticator components={components}>
      {({ signOut, user }) => (
        <ThemeProvider theme={mainTheme}>
          {/*@ts-ignore*/}
          <IntlProvider locale={locale} messages={messages}>
            <Home user={user} signOut={signOut} linksData={linksData} />
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
    return { props: {} };
  }
  // @ts-ignore
  const userData = JSON.parse(cookies.userData as string);
  const userId = userData.UserAttributes[0].Value;
  const links = await queries.link.get({ user_id: { eq: userId } }, { limit: 10 });
  const linksData = JSON.stringify(links);

  return {
    props: {
      linksData,
      revalidate: 10
    }
  };
};
