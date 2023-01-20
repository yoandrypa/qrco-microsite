/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import { TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Notifications, { NotificationsProps } from './Notifications';
//@ts-ignore
import session from "@ebanux/ebanux-utils/sessionStorage";
import sendSESEmail from '../../../handlers/email';

interface ContactFormProps {
    title: string;
    messagePlaceholder: string;
    buttonText: string;
    email: string;
    index: Number;
    micrositeUrl: string
}



function RenderContactForm({ title, buttonText, messagePlaceholder, email, micrositeUrl }: ContactFormProps) {
    const [name, setName] = useState<string>('');
    const [newMessage, setNewMessage] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [newPhone, setNewPhone] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [notify, setNotify] = useState<NotificationsProps | null>(null);

    const handleClick = async () => {
        setIsLoading(true)
        const result = await sendSESEmail('info@ebanux.com', [email], 'new-contact-form-message-template', {
            contactEmail: newEmail,
            name: name,
            micrositeUrl: micrositeUrl,
            message: newMessage
        })
        if (result instanceof Error) {
            setNotify({
                message: `Ops, could not send the message. ${result.message}.`,
                severity: 'error',
                showProgress: false,
                title: 'Error',
                onClose: () => {
                    setNotify(null);
                    setIsLoading(false)
                }
            })
        } else {
            setNotify({
                message: `Great! Your message it's been sended successfully.`,
                severity: 'success',
                showProgress: true,
                title: 'Success',
                onClose: () => {
                    clearFields();
                    setNotify(null);
                }
            })

        }
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
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPhone(event.target.value)
    }

    const clearFields = () => {
        setName('');
        setNewEmail('');
        setNewPhone('');
        setNewMessage('');
    }



    return (
        <Stack spacing={2} sx={{ m: 2 }}>
            {notify && <Notifications
                message={notify.message}
                autoHideDuration={5000}
                severity={notify.severity}
                showProgress={true}
                title={notify.title}
                onClose={() => setNotify(null)}
            />}
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
                label='Your Email'
                size='small'
                fullWidth
                placeholder='your@email.com'
                value={newEmail}
                onChange={handleEmailChange}
            />
            <TextField
                label='Your Phone'
                size='small'
                fullWidth
                placeholder='+1 123 456 34'
                value={newPhone}
                onChange={handlePhoneChange}
                type='number'
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
            <LoadingButton loading={isLoading} variant='contained' onClick={handleClick}>
                {buttonText}
            </LoadingButton>
        </Stack>
    )
}

export default RenderContactForm