import {GetServerSideProps, InferGetServerSidePropsType} from "next";

import Box from "@mui/material/Box";

import VCard from "../components/qr/microsites/VCard";
import Web from "../components/qr/microsites/Web";
import Business from "../components/qr/microsites/Business";
import Coupons from "../components/qr/microsites/Coupons";
import SocialInfo from "../components/qr/microsites/SocialInfo";
import FileMicro from "../components/qr/microsites/FileMicro";
import Images from "../components/qr/microsites/Images";
import Donations from "../components/qr/microsites/Donations"
import {generateShortLink} from "../utils";
import queries from "../queries";
import {handleDesignerString} from "../helpers/qr/helpers";

// @ts-ignore
export default function Handler({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (data === "NO DATA") {
        return <>{"Ops! Unable to process your request."}</>;
    }

    const newData = JSON.parse(data);

    if (newData.qrType === "vcard+") {
        return (<VCard newData={newData}/>);
    }

    if (newData.qrType === "image") {
        return (<Images newData={newData}/>);
    }

    if (newData.qrType === 'business') {
        return (<Business newData={newData}/>);
    }

    if (newData.qrType === 'coupon') {
        return (<Coupons newData={newData}/>);
    }

    if (newData.qrType === 'social') {
        return (<SocialInfo newData={newData}/>);
    }

    if (['web', 'twitter', 'whatsapp', 'facebook'].includes(newData.qrType)) {
        return (<Web urlString={handleDesignerString(newData.qrType, newData)}/>);
    }

    if (['pdf', 'audio', 'video'].includes(newData.qrType)) {
        return (<FileMicro newData={newData}/>);
    }

    if (newData.qrType === 'donations') {
        return (<Donations newData={newData}/>);
    }

    return (
        <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            {"We are working on this. Come back soon."}
        </Box>
    );
}

export const getServerSideProps: GetServerSideProps = async ({params, req}) => {
    try {
        // @ts-ignore
        const {code} = params;
        const link = await queries.link.getByAddress(code)
        if (!link) {
            return {props: {data: "NO DATA"}};
        }

        // @ts-ignore
        const qr = await queries.qr.getByShortLink(link.id)

        if (!qr) {
            return {props: {data: "NO DATA"}};
        }

        // Increment the visit count
        queries.link.incrementVisit(link.id, link.visitCount);

        // @ts-ignore
        return {
            props: {
                data: JSON.stringify({
                    ...qr,
                    shortLinkId: link,
                    shortlinkurl: generateShortLink(link.address, link.domain || process.env.REACT_APP_SHORT_URL_DOMAIN)
                })
            }
        };
    } catch {
        return {
            notFound: true
        }
    }
};
