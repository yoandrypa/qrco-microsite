import {GetServerSideProps, InferGetServerSidePropsType} from "next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DangerousIcon from "@mui/icons-material/Dangerous";
import {generateShortLink} from "../utils";
import queries from "../queries";
import MainComponent from "../components/MainComponent";

// @ts-ignore
export default function Handler ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (data === "NO DATA") {
    return (
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <DangerousIcon color="error" sx={{ mx: "auto", fontSize: "50px" }}/>
          <Typography>{"Ops! Something went wrong and we are unable to process your request at this time."}</Typography>
          <Typography
            sx={{ color: theme => theme.palette.text.disabled, mx: "auto" }}>
            {"Please, contact support by clicking "}
            <a target="_blank" href="mailto:info@ebanux.com"
               rel="noopener noreferrer"
               style={{ color: "royalblue" }}>{"here"}</a>
            {"."}
          </Typography>
        </Box>
      </Box>
    );
  }

  return <MainComponent newData={JSON.parse(data)} />
}

export const getServerSideProps: GetServerSideProps = async ({
  params
}) => {
  try {
    // @ts-ignore
    const { code } = params;
    const link = await queries.link.getByAddress(code);
    if (!link) {
      return { props: { data: "NO DATA" } };
    }

    // @ts-ignore
    let { userId, createdAt } = link;
    const qr = await queries.qr.getByShortLink({ userId, createdAt });

    if (!qr) {
      return { props: { data: "NO DATA" } };
    }

    // Increment the visit count
    queries.link.incrementVisit(userId, createdAt, link.visitCount);

    // @ts-ignore
    return {
      props: {
        data: JSON.stringify({
          ...qr,
          shortLinkId: link,
          shortlinkurl: generateShortLink(link.address,
            link.domain || process.env.REACT_APP_SHORT_URL_DOMAIN),
        }),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
