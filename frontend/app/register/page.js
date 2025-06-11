'use client'

import {
  TextInput,
  PasswordInput,
  Select,
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
import GLoader from '../../components/GLoader';
import { showAlert } from '../../components/Alert';
import { useState, useEffect } from 'react';
import swal from "sweetalert";
import { useRouter } from 'next/navigation';
import apiService from '../http/ApiService';
import { Footer, Header } from '@/components/Layout';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      username: '',
      firstname: '',
      middlename: '',
      lastname: '',
      password: '',
      confirmPassword: '',
      email: '',
      country: '',
      passportno: '',
      gender: '',
    },

    validate: {
      password: (value) => (value.length < 6 ? 'Password too short' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  })


  const handleSubmit = (values) => {
    setLoading(true);
    apiService.authenticationRegisterCreate({
      "username": values.username,
      "firstName": values.firstname,
      "middleName": values.middlename,
      "lastName": values.lastname,
      "password": values.password,
      "passportNo": values.passportno,
      "nationalityId": 147,
      "gender": values.gender,
      "email": values.email
    }).then(response => {
      console.log("response", response)
      if (response.data?.success) {
        showAlert('Successfully Registered!!', 'success');
        router.push('/');
      }
    }).catch(error => {
      showAlert(error?.response?.data, 'info');
    }).finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    const fetchCountries = () => {
      apiService.commonGetAllCountriesList()
        .then(response => setCountries(response?.data?.data?.map(c => ({ value: c.id.toString(), label: c.name }))))
    }

    fetchCountries();
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container size={420} my={40} style={{ flex: 1 }}>
        <Title align="center" mb={20}>Register</Title>
        <Paper shadow="md" p={10} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput label="Username" {...form.getInputProps('username')} required />
              <TextInput label="First Name" {...form.getInputProps('firstname')} required />
              <TextInput label="Middle Name" {...form.getInputProps('middlename')} />
              <TextInput label="Last Name" {...form.getInputProps('lastname')} required />
              <PasswordInput label="Password" {...form.getInputProps('password')} required />
              <PasswordInput
                label="Confirm Password"
                {...form.getInputProps('confirmPassword')}
                required
              />
              <TextInput
                label="Email"
                type="email"
                placeholder="jayanta@gmail.com"
                {...form.getInputProps('email')}
                required
              />
              <Select
                label="Country"
                data={countries}
                {...form.getInputProps('country')}
                required
                placeholder="Select country"
              />
              <TextInput label="Passport No" {...form.getInputProps('passportno')} required />
              <Select
                label="Gender"
                data={['Male', 'Female', 'Other']}
                {...form.getInputProps('gender')}
                required
                placeholder="Select gender"
              />
              <Center mt="md">
                <Button type="submit">
                  Register
                </Button>
              </Center>
              <Text align="center" mt="sm">
                Already have an account?{' '}
                <Link href="/">
                  <u style={{ color: 'blue' }}>Go to Login</u>
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
