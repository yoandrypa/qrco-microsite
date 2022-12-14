import React, { useState } from 'react'
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

interface ThankYouProps {
    qrData: any
}


function ThankYou({ }: ThankYouProps) {

    const [reviewMessage, setReviewMessage] = useState<string>('');
    const [isAnonymous, setisAnonymous] = useState<boolean>(false);
    const [loading, setIsLoading] = useState<boolean>(false);

    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReviewMessage(event.target.value)
    }

    const handleSwitchChange = () => {
        setisAnonymous(!isAnonymous)
    }

    const handleButtonClick = () => {
        setIsLoading(true)
    }

    return (
        <CardContent>
            <Typography variant="h5" textAlign={'center'}>Thanks for your support!</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Image width={100} height={100} alt='thanks' src='/images/thanks2.png'></Image>
            </Box>
            <Typography textAlign='center'>
                Would you want to say something nice?
            </Typography>
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
                    <FormControlLabel control={<Switch defaultChecked={isAnonymous} />} label="Make my comment anonymous" />
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

    )
}

export default ThankYou