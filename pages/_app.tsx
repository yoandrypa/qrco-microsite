import type { AppProps } from "next/app";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "../styles/globals.css";
import awsExports from "../libs/aws/aws-exports";
import components from "../libs/aws/components";

Amplify.configure(awsExports);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator components={components}>
      {({ signOut, user }) => (
        <Component {...pageProps} signOut={signOut} user={user} />
      )}
    </Authenticator>
  );
}
