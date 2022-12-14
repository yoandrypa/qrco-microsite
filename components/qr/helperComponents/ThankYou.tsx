import React from 'react'
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch"
import Box from '@mui/material/Box'
import TextField from "@mui/material/TextField";
import Image from 'next/image';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ChangeEventHandler } from 'react';

interface ThankYouProps {
    setReviewMessage: Function,
    reviewMessage: string,
    isAnonymous: boolean,
    setIsAnonymous: Function
}


function ThankYou({ setReviewMessage, reviewMessage, setIsAnonymous, isAnonymous }: ThankYouProps) {



    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReviewMessage(event.target.value)
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
        </CardContent>
    )
}

export default ThankYou