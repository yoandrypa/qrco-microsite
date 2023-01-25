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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const renderContactSupport = () => (
  <a target="_blank" href="mailto:info@ebanux.com" rel="noopener noreferrer"
     style={{ color: "royalblue" }}>{"here"}</a>
);

// @ts-ignore
export default function Handler ({
  data,
  code,
  preGenerated,
  userId,
  createdAt,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [route, setRoute] = useState<string>("");

  useEffect(() => {
    setRoute(window.location.href);
  }, []);

  if (["NO DATA", "CLAIMABLE"].includes(data)) {
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
            ) : preGenerated ? (
              <Box sx={{ width: "400px" }}>
                <Alert severity="info" variant="outlined" sx={{ mt: 10 }}>
                  <AlertTitle>
                    <Typography align="justify">
                      Congratulations! You have successfully scanned a QR code
                      associated with a QRLynk product.
                    </Typography>
                  </AlertTitle>
                  <Typography align="justify" variant="body2" sx={{ mt: 2 }}>
                    {`By claiming this QR Link (${route}), you can
                      personalize the microsite and customize its content. This is
                      a one-time process and it's free. Once you claim the QR
                      Link, you will have full control over its content and
                      appearance. Claim now to get started!`}
                  </Typography>
                </Alert>
                <Button variant="outlined" color="info" sx={{ mt: "20px" }}
                        size="small"
                        startIcon={<ThumbUpIcon/>}
                        onClick={() => {
                          window.location.href = process.env.REACT_APP_QRCO_URL +
                            "/qr/type?address=" + code +
                            "&userId=" + userId +
                            "&createdAt=" + createdAt;
                        }}>
                  {"Claim Now!"}
                </Button>
              </Box>
            ) : (
              <Box sx={{ width: "400px" }}>
                <Alert severity="info" variant="outlined" sx={{ mt: 10 }}>
                  <AlertTitle>
                    <Typography align="justify">
                      {`The QR Link (${route}) you are trying to access does not currently exist.`}
                    </Typography>
                  </AlertTitle>
                  <Typography align="justify" variant="body2" sx={{ mt: 2 }}>
                    However, you have the opportunity to claim it and create a
                    personalized microsite for it. By claiming this QR Link, you
                    can customize its content and appearance. This is a one-time
                    process, but you might need to purchase a plan that includes
                    the number of Dynamic QR codes you want to claim. Claim now
                    to get started!
                  </Typography>
                </Alert>
                <Button variant="outlined" color="info" sx={{ mt: "20px" }}
                        size="small"
                        startIcon={<ThumbUpIcon/>}
                        onClick={() => {
                          window.location.href = process.env.REACT_APP_QRCO_URL +
                            "/qr/type?address=" + code;
                        }}>
                  {"Claim Now!"}
                </Button>
              </Box>
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
    let link = await queries.link.getByAddress(code);

    if (!link) {
      link = queries.preGenerated.get(code);
      if (link) {
        return {
          props: {
            data: "PRE-GENERATED",
            code,
          },
        };
      }
      return {
        props: {
          data: "CLAIMABLE",
          code,
        },
      };
    } else if (link.claimable === true) {
      return {
        props: {
          data: "CLAIMABLE",
          code,
        },
      };
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
      props: { data: "CLAIMABLE", code, preGenerated: false },
      // notFound: true,
    };
  }
};
