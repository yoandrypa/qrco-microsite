import React, { ReactPropTypes, useState } from 'react'
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch"
import Box from '@mui/material/Box'
import TextField from "@mui/material/TextField";
import Image from 'next/image';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FavoriteIcon from '@mui/icons-material/Favorite';;
import Notifications from './Notifications';

interface ThankYouProps {
    qrData: any
}


function ThankYou({ qrData }: ThankYouProps) {

    const [reviewMessage, setReviewMessage] = useState<string>('');
    const [isAnonymous, setisAnonymous] = useState<boolean>(false);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [reviewerName, setReviewerName] = useState<string>('')
    const [displayMessage, setDisplayMessage] = useState<null | string>(null)

    const microUrl = process.env.REACT_NODE_ENV == 'develop' ?
        'https://dev.a-qr.link/' :
        'https://a-qr.link/';

    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReviewMessage(event.target.value)
    }

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setisAnonymous(event.target.checked);
    };

    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReviewerName(event.target.value)
    }


    const handleButtonClick = async () => {
        setIsLoading(true)
        await sendThanksEmail(isAnonymous ? reviewerName : 'An Anonymous user', reviewMessage, qrData.email, `${qrData.shortlinkurl}`)
        window.location.href = qrData?.web || microUrl
    }

    async function sendThanksEmail(
        reviewerName: string,
        reviewerMessage: string,
        ownerEmail: string,
        shortLinkUrl: string
    ) {

        const data = {
            name: reviewerName,
            message: reviewerMessage,
            micrositeUrl: shortLinkUrl,
            email: qrData.email
        }

        const options = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(`${microUrl}/api/review`, options)
            if (!response.ok) {
                // TODO
                setDisplayMessage('Ops, there has been an error. Try again later.');

            } else {
                setDisplayMessage('Your message has been send!');
                const data = await response.json();

            }
        } catch (error: any) {
            //TODO
            console.error(error)
            setDisplayMessage('Ops, there has been an error. Try again later.');

        }


    }

    return (
        <>
            {displayMessage && <Notifications
                message={displayMessage}
                onClose={() => setDisplayMessage(null)}
                autoHideDuration={4000}
                severity='info'
                showProgress={true}
            />}
            <CardContent>
                <Typography variant="h5" textAlign={'center'}>Thanks for your support!</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <Image width={100} height={100} alt='thanks' src='/images/thanks2.png'></Image>
                </Box>
                <Typography textAlign='center'>
                    Would you want to say something nice?
                </Typography>
                {!isAnonymous && <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <TextField
                        label='Your name'
                        variant='outlined'
                        fullWidth
                        value={reviewerName}
                        size='small'
                        sx={{ mb: 1 }}
                        onChange={handleNameInputChange}
                    />
                </Box>}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <TextField
                        fullWidth
                        multiline
                        value={reviewMessage}
                        onChange={handleReviewChange}
                        placeholder="I was blown away by the generosity of everyone involved. Tnank you for making the difference in the world... "
                        rows={4}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked={isAnonymous} onChange={handleSwitchChange} />}
                            label="Make my comment anonymous"
                        />
                    </FormGroup>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <LoadingButton
                        startIcon={<FavoriteIcon />}
                        loading={loading}
                        variant="contained"
                        onClick={handleButtonClick}>
                        Send message
                    </LoadingButton>
                </Box>
            </CardContent >
        </>
    )
}

export default ThankYou