"use client";

import {
  Table,
  Paper,
  TextInput,
  Stack,
  Title,
  Group,
  ActionIcon,
  ScrollArea,
} from "@mantine/core";
import { IconEye, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const documents = [
  {
    id: 1,
    student: "Jayanta Poudel",
    type: "Passport",
    program: "Computer Science",
    link: "",
  },
  {
    id: 2,
    student: "Nabin Kaucha",
    type: "Citizenship",
    program: "Business Administration",
    link: "",
  },
  {
    id: 3,
    student: "Dilshad Ansari",
    type: "Passport",
    program: "Data Science",
    link: "",
  },
  {
    id: 4,
    student: "Jeevan Shrestha",
    type: "Citizenship",
    program: "BIT",
    link: "",
  },
];

export default function Documents() {
  const [search, setSearch] = useState("");

  const filtered = documents.filter(
    (doc) =>
      doc.student.toLowerCase().includes(search.toLowerCase()) ||
      doc.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack spacing="xl">
      <Paper shadow="md" p="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md" wrap="wrap">
          <Title order={5} c="#1971c2">
            Student Documents
          </Title>
          <TextInput
            placeholder="Search by student or document type..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </Group>

        <ScrollArea>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Student Name</Table.Th>
                <Table.Th>Document Type</Table.Th>
                <Table.Th>Applied Program</Table.Th>
                <Table.Th>View</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filtered.map((doc) => (
                <Table.Tr key={doc.id}>
                  <Table.Td>{doc.student}</Table.Td>
                  <Table.Td>{doc.type}</Table.Td>
                  <Table.Td>{doc.program}</Table.Td>
                  <Table.Td>
                    <ActionIcon
                      component="a"
                      href={doc.link}
                      target="_blank"
                      color="blue"
                      variant="light"
                    >
                      <IconEye size={18} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </Stack>
  );
}
