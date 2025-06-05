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
import '@mantine/core/styles.css';
import Link from 'next/link';
import { httpLogin } from './http/httpUniversity';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {showAlert} from '../components/Alert';

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
    httpLogin({
      "username": values.username,
      "password": values.password
    }).then(response => {
      router.push('/admin');
    }).catch(error => {
      showAlert(error?.response?.data, 'info');
    }).finally(() => {
      setLoading(false);
    });
  }

    return (
      <Container size={420} my={40}>
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
    )
  }
