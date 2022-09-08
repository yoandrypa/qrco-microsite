import React from "react";
import { Heading, Image, useTheme } from "@aws-amplify/ui-react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const components = {
  Header() {
    return (
      <Stack direction="row" padding={ 2 } spacing={ 2 } alignItems="flex-end" justifyContent="center">
        <Image
          alt="Ebanux logo"
          src="/ebanuxQr.svg"
          height="12%"
          width="12%"
        />
        <Typography variant="h4" sx={ { fontWeight: "bold" } }>The QR Link</Typography>
      </Stack>
    );
  },
  SignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={ `${ tokens.space.xl } 0 0 ${ tokens.space.xl }` } level={ 5 }>
          Email
        </Heading>
      );
    }
  },
  SignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={ `${ tokens.space.xl } 0 0 ${ tokens.space.xl }` } level={ 5 }>
          Create a new account
        </Heading>
      );
    }
  }
};

export default components;
