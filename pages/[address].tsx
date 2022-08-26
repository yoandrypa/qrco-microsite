import * as LinkHandler from "../handlers/links";
import { GetServerSideProps } from "next";

const Redirect = () => {
  return;
};

export default Redirect;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // @ts-ignore
  const { address } = params;
  const link = await LinkHandler.get(address);
  if (!link) {
    return {
      notFound: true,
    }
  } else {
    return {
      redirect: {
        destination: link.target,
        permanent: false,
      },
    }
  }
};
