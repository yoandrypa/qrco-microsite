import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DangerousIcon from "@mui/icons-material/Dangerous";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { generateShortLink } from "../../utils";
import queries from "../../queries";
import * as VisitHandler from "../../handlers/visit";
import MainComponent from "../../components/MainComponent";
import MainMicrosite from "../../components/qr/microsites/MainMicrosite";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InfoIcon from "@mui/icons-material/Info";

const renderContactSupport = () => (
  <a target="_blank" href="mailto:info@ebanux.com" rel="noopener noreferrer"
     style={{ color: "royalblue" }}>{"here"}</a>
);

// @ts-ignore
export default function Handler ({
  data,
  code,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [route, setRoute] = useState<string>("");

  useEffect(() => {
    setRoute(window.location.href);
  }, []);

  if (["NO DATA", "NOT FOUND", "CLAIMABLE"].includes(data)) {
    return (
      <MainMicrosite data={{}}>
        <Box sx={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -65%)",
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            textAlign: "center",
          }}>
            {data === "NO DATA" ? (
              <>
                <DangerousIcon color="error"
                               sx={{ mx: "auto", fontSize: "50px" }}/>
                <Typography>{"Ops! Something went wrong and we are unable to process your request at this time."}</Typography>
                <Typography
                  sx={{ color: theme => theme.palette.text.disabled }}>
                  {"Please, contact support by clicking "}
                  {renderContactSupport()}
                  {"."}
                </Typography>
              </>
            ) : data === "NOT FOUND" ? (
              <>
                <EngineeringIcon color="info"
                                 sx={{ mx: "auto", mb: 2, fontSize: "50px" }}/>
                <Typography sx={{
                  fontWeight: "bold",
                  mb: 2,
                }}>{"Your request cannot be processed at this time."}</Typography>
                <Typography>{"The requested short URL is not ready, or it does not exist. Maybe you forgot to save your microsite's data."}</Typography>
                <Typography
                  sx={{ mb: 2 }}>{"Please, check your data and retry within a moment."}</Typography>
                {/*<Typography sx={{ color: theme => theme.palette.text.disabled, mt: 2 }}>*/}
                <Typography
                  sx={{ color: theme => theme.palette.text.disabled }}>
                  {"This is not an error."}
                </Typography>
                <Typography
                  sx={{ color: theme => theme.palette.text.disabled }}>
                  {"You can reach support by clicking "}
                  {renderContactSupport()}
                  {" for more information."}
                </Typography>
              </>
            ) : (
              <>
                <Typography sx={{ mt: 3 }}>
                  <InfoIcon color="info" fontSize="small" sx={{ mb: "-4px" }}/>
                  {`Alternatively, you can hit next button to claim this shortlink (${route}) as yours.`}
                </Typography>
                <Button variant="outlined" color="info" sx={{ mt: "10px" }}
                        startIcon={<ThumbUpIcon/>}
                        onClick={() => {
                          window.location.href = process.env.REACT_APP_QRCO_URL +
                            "/qr/type?address=" + code;
                        }}>
                  {"Claim Now!"}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </MainMicrosite>
    );
  }

  return <MainComponent newData={JSON.parse(data)}/>;
}

export const getServerSideProps: GetServerSideProps = async ({
  params, req,
}) => {
  // @ts-ignore
  const { code } = params;
  try {
    const link = await queries.link.getByAddress(code);
    if (link.claimable) {
      return { props: { data: "CLAIMABLE", code } };
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
      props: { data: "CLAIMABLE", code },
      // notFound: true,
    };
  }
};
