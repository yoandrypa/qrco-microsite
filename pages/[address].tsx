import * as LinkHandler from "../handlers/links";
import { GetServerSideProps } from "next";
import requestIp from "request-ip";

const Redirect = () => {
  return;
};

export default Redirect;

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ params = {}, req }) => {
  try {
    // @ts-ignore
    params.realIP = requestIp.getClientIp(req);
    const redirectUrl: string | undefined = await LinkHandler.redirect(params, req);
    if (redirectUrl === "/404") {
      return {
        notFound: true
      };
    }
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false
      }
    };

  } catch (e) {
    throw e;
  }
};
