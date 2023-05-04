import {GetServerSideProps, InferGetServerSidePropsType} from "next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {generateShortLink} from "../../utils";
import queries from "../../queries";
import {create, getLocation} from "../../handlers/visit";
import MainComponent from "../../components/MainComponent";
import MainMicrosite from "../../components/qr/microsites/MainMicrosite";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Divider from "@mui/material/Divider";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import {
  // os
  android, chromeos, tizen, ios, windows, macos, linux,
  // form
  tv, phone, tablet, laptop, desktop, hybrid,
  // browsers
  chrome, firefox, edge, samsungBrowser, opera, safari, ie // @ts-ignore
} from 'platform-detect';

import dynamic from "next/dynamic";

const InfoIcon = dynamic(() => import('@mui/icons-material/Info'));
const DangerousIcon = dynamic(() => import('@mui/icons-material/Dangerous'));
const EnterSecretCode = dynamic(() => import("../../components/qr/helperComponents/EnterSecretCode"));

const renderContactSupport = (message: string) => (
  <a target="_blank" href="mailto:info@ebanux.com" rel="noopener noreferrer" style={{ color: "royalblue", zIndex: 1000 }}>{message}</a>
);

// @ts-ignore
export default function Handler ({ data, code, locked, headers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [route, setRoute] = useState<string>("");
  const [proceed, setProceed] = useState<boolean>(!Boolean(locked));

  useEffect(() => {

    console.log(headers);

    console.log(android, chromeos, tizen, ios, windows, macos, linux);
    console.log(chrome, firefox, edge, samsungBrowser, opera, safari, ie);
    console.log(tv, phone, tablet, laptop, desktop, hybrid)

    setRoute(window.location.href.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (locked !== undefined && !proceed) {
    return (
      <MainMicrosite data={{foregndImg: 'logo.png', backgndImg: 'banner.png', layout: 'gradient', noInfoGradient: true}}>
        <Box sx={{ width: 'calc(100% - 70px)', height: 'calc(100vh - 330px)', ml: '35px', mt: '35px' }}>
          <EnterSecretCode locked={locked} setProceed={setProceed} />
        </Box>
        <Divider sx={{mt: 3}} />
        <Box sx={{display: 'flex', my: '5px', width: '100%', justifyContent: 'center'}}>
          <ContactSupportIcon sx={{color: theme => theme.palette.primary.dark}}/>
          {renderContactSupport('info@ebanux.com')}
        </Box>
      </MainMicrosite>
    );
  }

  const renderCommon = (firstLine: string, secondLine: string) => (
    <Box>
      <Typography sx={{display: 'inline', color: theme => theme.palette.info.dark}}>
        {firstLine}
      </Typography>
      <Typography sx={{display: 'inline', color: theme => theme.palette.info.dark, fontWeight: 'bold'}}>
        {route}
      </Typography>
      <Typography sx={{display: 'inline', color: theme => theme.palette.info.dark}}>
        {secondLine}
      </Typography>
    </Box>
  );

  const renderClaimNow = (adjust?: boolean) => (
    <Box sx={{textAlign: 'center', width: '100%'}}>
      <Button size="large" variant="outlined" sx={{ ml: adjust ? '-35px' : 'unset', mt: "20px", color: theme => theme.palette.info.dark }} startIcon={<ThumbUpIcon/>}
              onClick={() => window.location.href = process.env.REACT_APP_QRCO_URL + "/qr/type?address=" + code}>
        {"Claim Now!"}
      </Button>
    </Box>
  );

  const renderSteps = () => {
    const link = route.slice(0, route.lastIndexOf('/'));
    return (
      <>
        {renderClaimNow(true)}
        <Typography sx={{mt: 2}}>
          {`By claiming this QRLynk you can customize the microsite and the content. This is a one-time process and it\'s free${data === 'PRE-GENERATED' ? '' : ' in the case of your first QRLynk'}.`}
        </Typography>
        <Typography sx={{mt: 2}}>
          {'To claim your QRLynk, follow these steps:'}
        </Typography>
        <ol>
          <li><Typography>Press the CLAIM NOW button</Typography></li>
          <li><Typography>Register in QRLynk or log in</Typography></li>
          <li><Typography>Select the type of QRLynk that best suits your use case</Typography></li>
          <li><Typography>Enter the content to share and customize the design of your microsite</Typography></li>
          <li><Typography>Customize the QR code</Typography></li>
          <li><Typography>Press SAVE to complete the process</Typography></li>
        </ol>
        <Box sx={{mt: 2}}>
          <Typography sx={{display: 'inline'}}>
            {'You can manage all of your QRLynks by visiting this URL '}
          </Typography>
          <Typography sx={{display: 'inline'}}>
            <a target="_blank" href={link} rel="noopener noreferrer" style={{color: "royalblue"}}>{link}</a>
          </Typography>
          <Typography sx={{display: 'inline'}}>
            {'.'}
          </Typography>
        </Box>
        <Typography sx={{mt: 2}}>
          Claim your QRLynk now to get started!
        </Typography>
      </>
    );
  };

  const renderNoData = () => (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box sx={{display: 'flex'}}>
        <DangerousIcon sx={{color: theme => theme.palette.error.dark}} fontSize="large" />
        <Box sx={{ml: 1}}>
          <Typography fontSize="24px" sx={{color: theme => theme.palette.error.dark, display: 'inline'}}>
            Something went wrong
          </Typography>
          <Typography sx={{mt: 2, color: theme => theme.palette.info.dark }} fontSize="20px">
            We are sorry! We are unable to process your request at this time.
          </Typography>
          <Typography sx={{mt: 2, color: theme => theme.palette.info.dark }} fontSize="20px">
            Try the following:
          </Typography>
          <ul>
            <li><Typography fontSize="20px" sx={{color: theme => theme.palette.info.dark}}>Check your connections</Typography></li>
            <li><Typography fontSize="20px" sx={{color: theme => theme.palette.info.dark}}>Retry within few minutes</Typography></li>
          </ul>
          <Typography
            fontSize="20px"
            sx={{color: theme => theme.palette.text.disabled, mt: '60px'}}>
            {"Please, contact support by clicking "}
            {renderContactSupport('here')}
            {". Or write an email to "}
            {renderContactSupport('info@ebanux.com')}
            {"."}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderPreGen = () => (
    <Box sx={{ width: "100%" }}>
      <Box sx={{display: 'flex'}}>
        <InfoIcon sx={{color: theme => theme.palette.info.dark}} fontSize="large" />
        <Box sx={{ml: 1, color: theme => theme.palette.info.dark}}>
          {renderCommon( 'You have successfully scanned a QR code (', ') associated with a QRLynk product.')}
          {renderSteps()}
        </Box>
      </Box>
      {renderClaimNow()}
    </Box>
  );

  const renderClaimable = () => (
    <Box sx={{ width: "100%" }}>
      <Box sx={{display: 'flex'}}>
        <InfoIcon sx={{color: theme => theme.palette.info.dark}} fontSize="large" />
        <Box sx={{ml: 1, color: theme => theme.palette.info.dark}}>
          {renderCommon('The QR Link you are trying to access (', ') does not exist. However, you can claim it as yours.')}
          {renderSteps()}
        </Box>
      </Box>
      {renderClaimNow()}
    </Box>
  );

  const renderKind = () => {
    if (data === 'PRE-GENERATED') {
      return renderPreGen();
    }
    if (data === 'CLAIMABLE') {
      return renderClaimable();
    }
    return renderNoData();
  }

  if (["NO DATA", "CLAIMABLE", "PRE-GENERATED"].includes(data)) {
    return (
      <MainMicrosite data={{foregndImg: 'logo.png', backgndImg: 'banner.png', layout: 'gradient', noInfoGradient: true}}>
        <Box sx={{ width: 'calc(100% - 40px)', ml: '20px', mt: '20px' }}>
          {renderKind()}
        </Box>
        <Divider sx={{mt: 3}} />
        <Box sx={{display: 'flex', my: '5px', width: '100%', justifyContent: 'center'}}>
          <ContactSupportIcon sx={{color: theme => theme.palette.primary.dark}}/>
          {renderContactSupport('info@ebanux.com')}
        </Box>
      </MainMicrosite>
    );
  }

  return <MainComponent newData={JSON.parse(data)}/>;
}

export const getServerSideProps: GetServerSideProps = async ({ params, req}) => {
  // @ts-ignore
  const { code } = params;
  try {
    let link = await queries.link.getByAddress(code);

    if (!link) {
      link = await queries.preGenerated.get(code);
      if (link) {
        return {
          props: { data: "PRE-GENERATED", code }
        };
      }
      return {
        props: { data: "CLAIMABLE", code }
      };
    } else if (link.claimable === true) {
      return {
        props: { data: "CLAIMABLE", code }
      };
    }

    if (link.paused) {
      return {
        redirect: { destination: "/" + code + "/paused", permanent: false }
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
      create({ headers: req.headers, shortLinkId: qr.shortLinkId }),

      // Increment the visit count
      queries.link.incrementVisit(userId, createdAt, link.visitCount)
    ]);

    const location = await getLocation(req.headers);

    // queries.link.incrementVisit(userId, createdAt, link.visitCount);

    if (typeof qr.custom === 'string') {
      qr.custom = JSON.parse(qr.custom);
    }

    // @ts-ignore
    return {
      props: {
        data: JSON.stringify({
          ...qr, shortLinkId: link, shortlinkurl: generateShortLink(link.address, link.domain || process.env.REACT_APP_SHORT_URL_DOMAIN)
        }),
        headers: req.headers, location,
        locked: qr.secretOps?.includes('l') ? qr.secret : null
      }
    };
  } catch (e: any) {
    return {
      props: { data: "CLAIMABLE", code }
      // notFound: true,
    };
  }
};
