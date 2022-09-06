import {GetServerSideProps} from "next";

// @ts-ignore
export default function Handler({ data }) {
  console.log(data)
  return (<>AAAA</>);
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const data = {};
  return { props: { data } };
}
