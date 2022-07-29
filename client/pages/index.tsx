import React from "react";
import Router from "next/router";

import { REACT_DISALLOW_ANONYMOUS_LINKS } from "../consts";
import NeedToLogin from "../components/NeedToLogin";
import Extensions from "../components/Extensions";
import LinksTable from "../components/LinksTable";
import AppWrapper from "../components/AppWrapper";
import Shortener from "../components/Shortener";
import Features from "../components/Features";
import Footer from "../components/Footer";
//import { useStoreState } from "../store";

const Homepage = () => {
  const isAuthenticated = true; //useStoreState(s => s.auth.isAuthenticated);

  if (
    !isAuthenticated &&
    REACT_DISALLOW_ANONYMOUS_LINKS &&
    typeof window !== "undefined"
  ) {
    Router.push("/login");
    return null;
  }

  return (
    <AppWrapper>
      <Shortener />
      {!isAuthenticated && <NeedToLogin />}
      {isAuthenticated && <LinksTable />}
      <Features />
      <Extensions />
      <Footer />
    </AppWrapper>
  );
};

export default Homepage;
