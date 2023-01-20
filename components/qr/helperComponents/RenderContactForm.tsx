/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import { TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

//@ts-ignore
import session from "@ebanux/ebanux-utils/sessionStorage";


interface ContactFormProps {
    title: string;
    messagePlaceholder: string;
    buttonText: string;
    email?: string;
    index: Number
}



function RenderContactForm({ title, buttonText, messagePlaceholder }: ContactFormProps) {
    const [name, setName] = useState<string>('');
    const [newMessage, setNewMessage] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');


    const handleClick = () => {
        //TODO
    }

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value)
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(event.target.value)
    }

    return (
        <Stack spacing={2} sx={{ m: 2 }}>
            <Typography>
                {title}
            </Typography>
            <TextField
                label='Your name'
                size='small'
                fullWidth
                placeholder='John Doe'
                value={name}
                onChange={handleNameChange}
            />
            <TextField
                label='Email'
                size='small'
                fullWidth
                placeholder='your@email.com'
                value={newEmail}
                onChange={handleEmailChange}
            />
            <TextField
                label='Message'
                size='small'
                multiline
                fullWidth
                placeholder={messagePlaceholder}
                rows={4}
                value={newMessage}
                onChange={handleMessageChange}
            />
            <LoadingButton variant='contained' onClick={handleClick}>
                {buttonText}
            </LoadingButton>
        </Stack>
    )
}

export default RenderContactForm