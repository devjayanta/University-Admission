'use client'

import {
    TextInput,
    PasswordInput,
    Button,
    Paper,
    Container,
    Title,
    Stack,
    Text,
    Center,
    Textarea
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Link from 'next/link';

export default function AnnouncementContent() {
    const form = useForm({
        initialValues: {
            announcement: '',
        },
    })

    const handleSubmit = (values) => {
        
    }

    return (
        <Container size={620} my={20}>
            <Title align="center" mb={20}>Announcement</Title>
            <Paper shadow="md" p={10} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack>
                        <Textarea label="Announcement" {...form.getInputProps('username')}  required />
                        <Center mt="md">
                            <Button type="submit">
                                Publish
                            </Button>
                        </Center>
                    </Stack>
                </form>
            </Paper>
        </Container>
    )
}