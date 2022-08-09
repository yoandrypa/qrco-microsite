import type { AppProps, AppContext } from "next/app";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../libs/aws/aws-exports";
import components from "../libs/aws/components";
import { initializeStore } from "../store";

Amplify.configure(awsExports);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator components={components}>
      {({ signOut, user }) => (
        <Component {...pageProps} signOut={signOut} user={user} store={initializeStore} />
      )}
    </Authenticator>
  );
}

export default MyApp;
