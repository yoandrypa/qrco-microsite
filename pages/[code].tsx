import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { generateShortLink } from "../utils";
import queries from "../queries";
import * as VisitHandler from "../handlers/visit";
import MainComponent from "../components/MainComponent";
const requestIp = require('request-ip');

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

  return <MainComponent newData={JSON.parse(data)}/>;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
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

    const req = {
      headers: {
        host: 'd32vn0qhsmxsop.cloudfront.net',
        'cloudfront-is-mobile-viewer': 'false',
        'cloudfront-is-tablet-viewer': 'true',
        'cloudfront-is-smarttv-viewer': 'false',
        'cloudfront-is-desktop-viewer': 'false',
        'cloudfront-is-ios-viewer': 'false',
        'cloudfront-is-android-viewer': 'false',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'cloudfront-forwarded-proto': 'https',
        'x-forwarded-for': '1.0.32.179, 64.252.68.20',
        'user-agent': 'Amazon CloudFront',
        via: '2.0 f7c749b4d9ba39d7629c0f2f434dfc76.cloudfront.net (CloudFront), 1.1 3542174e2d71e2c3dffc0069aa7cbb34.cloudfront.net (CloudFront)',
        'accept-encoding': 'gzip',
        dnt: '1',
        'upgrade-insecure-requests': '1',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'cloudfront-viewer-country': 'CH',
        'x-amplify-isreverseproxy': 'true',
        'x-forwarded-host': 'dev.a-qr.link',
        'cloudfront-viewer-http-version': '1.1',
        'cloudfront-viewer-address': '64.252.68.20:34818',
        'cloudfront-viewer-tls': 'TLSv1.2:ECDHE-RSA-AES128-GCM-SHA256:fullHandshake',
        'cloudfront-viewer-asn': '14618'
      }
    }

    Promise.all([
      // Create visit data
      VisitHandler.create({
        headers: req.headers,
        //realIP: requestIp.getClientIp(req),
        //referrer: req.headers.referer,
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
      notFound: true,
    };
  }
};
