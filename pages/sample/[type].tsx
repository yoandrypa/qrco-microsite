import {GetServerSideProps, InferGetServerSidePropsType} from "next";

export default function SampleMicrosite({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (<>{`Work in progress, ${data}`}</>);
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  // @ts-ignore
  const {type} = params;
  return {
    props: {
      data: type
    }
  };
};
