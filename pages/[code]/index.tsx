import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DangerousIcon from "@mui/icons-material/Dangerous";
import EngineeringIcon from '@mui/icons-material/Engineering';
import { generateShortLink } from "../../utils";
import queries from "../../queries";
import * as VisitHandler from "../../handlers/visit";
import MainComponent from "../../components/MainComponent";

// @ts-ignore
export default function Handler ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const renderContactSupport = () => (
    <a target="_blank" href="mailto:info@ebanux.com"
       rel="noopener noreferrer"
       style={{ color: "royalblue" }}>{"here"}</a>
  );

  if (['NO DATA', 'NOT FOUND'].includes(data)) {
    return (
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {data === 'NO DATA' ? (
            <>
              <DangerousIcon color="error" sx={{ mx: "auto", fontSize: "50px" }}/>
              <Typography>{"Ops! Something went wrong and we are unable to process your request at this time."}</Typography>
              <Typography
                sx={{ color: theme => theme.palette.text.disabled, mx: "auto" }}>
                {"Please, contact support by clicking "}
                {renderContactSupport()}
                {"."}
              </Typography>
            </>
          ) : (
            <>
              <EngineeringIcon color="info" sx={{ mx: "auto", fontSize: "50px" }}/>
              <Typography sx={{fontWeight: 'bold', mx: 'auto'}}>{"Your request cannot be processed at this time."}</Typography>
              <Typography sx={{mx: 'auto'}}>{"The requested short URL is not ready, or it does not exist. Maybe you forgot to save your microsite's data."}</Typography>
              <Typography sx={{mx: 'auto'}}>{"Please, check your data and retry within a moment."}</Typography>
              <Typography sx={{ color: theme => theme.palette.text.disabled, mx: "auto" }}>
                {"This is not an error, but you can reach support by clicking "}
                {renderContactSupport()}
                {" for more information."}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    );
  }

  return <MainComponent newData={JSON.parse(data)}/>;
}

export const getServerSideProps: GetServerSideProps = async ({
  params, req,
}) => {
  try {
    // @ts-ignore
    const { code } = params;
    const link = await queries.link.getByAddress(code);
    if (!link) {
      return { props: { data: "NO DATA" } };
    }

    if (link.paused) {
      return {
        redirect: {
          destination: "/" + code + "/paused",
          permanent: false,
        },
      };
    }

    // @ts-ignore
    let { userId, createdAt } = link;
    const qr = await queries.qr.getByShortLink({ userId, createdAt });

    if (!qr) {
      return { props: { data: "NO DATA" } };
    }

    Promise.all([
      // Create visit data
      VisitHandler.create({
        headers: req.headers,
        shortLinkId: qr.shortLinkId,
      }),

      // Increment the visit count
      queries.link.incrementVisit(userId, createdAt, link.visitCount),
    ]);

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
      props: { data: "NOT FOUND" }
      // notFound: true,
    };
  }
};
