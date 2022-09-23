import { GetServerSideProps } from "next";
import { QrDataModel } from "../../models/qr/QrDataModel";

import VCard from "../../components/qr/microsites/VCard";
import Web from "../../components/qr/microsites/Web";

// @ts-ignore
export default function Handler({ data }) {
  if (data === 'NO DATA') {
    return <>{'Ops! Unable to process your request.'}</>
  }

  const newData = JSON.parse(data);

  if (newData.qrType === 'vcard+') {
    return (<VCard newData={newData} />);
  }

  if (newData.qrType === 'web') {
    return (<Web newData={newData} />);
  }

  return (
    <div>{'We are working on this. Come back soon.'}</div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  // @ts-ignore
  const { code } = params;

  // "code" is the id
  const data = await QrDataModel.get(code);
  if (!data) {
    return { props: { data: 'NO DATA' }};
  }

  return { props: { data: JSON.stringify(data) } };
};
