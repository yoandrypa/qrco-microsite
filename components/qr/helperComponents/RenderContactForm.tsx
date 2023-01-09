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
    const [newMessage, setNewMessage] = useState<string>(messagePlaceholder);


    const handleClick = () => {
        //TODO
    }

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value)
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
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
                label='Message'
                size='small'
                multiline
                fullWidth
                placeholder='Use this text as a placeholder for the message'
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