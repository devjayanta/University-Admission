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
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { showAlert } from '../components/Alert';
import apiService from './http/ApiService';
import GLoader from '@/components/GLoader';
import { Footer, Header } from '@/components/Layout';

export default function LoginPage() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const handleSubmit = (values) => {
    setLoading(true);
    apiService.authenticationLoginCreate({ username: values.username, password: values.password }).then(response => {
      localStorage.setItem('token', response.data.data.token)
      router.push('/admin');
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container size={420} my={40} style={{ flex: 1 }}>
        <Title align="center" mb={20}>Login</Title>
        <Paper shadow="md" p={10} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput label="Username" {...form.getInputProps('username')} required />
              <PasswordInput label="Password" {...form.getInputProps('password')} required />
              <Center mt="md">
                <Button type="submit">
                  Login
                </Button>
              </Center>
              <Text align="center" mt="sm">
                Do not have an account?{' '}
                <Link href="/register" >
                  <u style={{ color: 'blue' }}> Go to Register</u>
                </Link>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Container>

      <Footer />

      <GLoader opened={loading} />
    </div>

  )
}
