import {GetServerSideProps} from "next";

export default function Main () {
  return (<>Please wait</>);
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/sample",
    },
    props:{},
  };
};
