import {GetServerSideProps} from "next";
import {DEVELOP} from "../components/qr/constants";
import {useEffect} from "react";
import PleaseWait from "../components/PleaseWait";

interface Props {
  redirect?: boolean;
}

export default function Main ({redirect}: Props) {
  useEffect(() => {
    if (redirect) {
      window.location.href = 'https://theqr.link/';
    }
  }, [redirect]);

  return (<PleaseWait redirecting={redirect} />);
}

export const getServerSideProps: GetServerSideProps = async () => {
  if (!DEVELOP) {
    return {
      props: {
        redirect: true
      }
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/sample"
    },
    props:{}
  };
};
