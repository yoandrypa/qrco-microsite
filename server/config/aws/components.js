import React from "react";
import { Heading, Image, View, useTheme } from "@aws-amplify/ui-react";

const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Ebanux logo"
          src="/images/ebanux.svg"
          height="50%"
          width="50%"
        />
      </View>
    );
  },
  SignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={5}
        >
          Email
        </Heading>
      );
    }
  },
  SignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={5}
        >
          Create a new account
        </Heading>
      );
    }
  }
};

export default components;
