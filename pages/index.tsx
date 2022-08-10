import LinksTable from "../components/LinksTable";
import styles from "../styles/Home.module.css";
import { Box } from "@mui/material";
import { GetStaticProps } from "next";
import queries from "../queries";

export default function Index({ linksData }: any) {
  const [links, total] = JSON.parse(linksData)
  return (
    <Box className={styles.container}>
      {links && <LinksTable links={links} total={total}/>}
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const links = await queries.link.get({ user_id: { eq: "1234" } }, { limit: 10 });
  const linksData = JSON.stringify(links)

  return {
    props: { linksData }
  };
};
