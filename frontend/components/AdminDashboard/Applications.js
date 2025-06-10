'use client';

import apiService from '@/app/http/ApiService';
import {
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Table,
  TextInput,
  Textarea,
  Title,
  ActionIcon,
  rem,
  Pagination,
  Grid,
} from '@mantine/core';
import { IconTrash, IconEdit, IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [activePage, setPage] = useState(1);

  const pageSize = 5;
  const filtered = students.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.passportNo.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize
  );

  useEffect(() => {
    apiService.userProcessGetAllList().then(response => {
      console.log(response?.data?.data)
    })
  }, [])


  return (
    <Stack spacing="xl">
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md" wrap="wrap">
          <Title order={5} c="#1971c2">
            Applications List
          </Title>
          <TextInput
            placeholder="Search application..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </Group>

        <Table striped highlightOnHover withTableBorder verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Passport No.</Table.Th>
              <Table.Th>Nationality</Table.Th>
              <Table.Th>Gender</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginated.length > 0 ? (
              paginated.map((a) => (
                <Table.Tr key={a.id}>
                  <Table.Td>{a.name}</Table.Td>
                  <Table.Td>{a.email}</Table.Td>
                  <Table.Td>{a.passport}</Table.Td>
                  <Table.Td>{a.natioinality}</Table.Td>
                  <Table.Td>{a.gender}</Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                  No applications found.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>

        {filtered.length > pageSize && (
          <Group justify="center" mt="md">
            <Pagination
              total={Math.ceil(filtered.length / pageSize)}
              value={activePage}
              onChange={setPage}
            />
          </Group>
        )}
      </Paper>
    </Stack>
  )

}