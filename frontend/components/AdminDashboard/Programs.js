"use client";

import {
  Card,
  Text,
  Title,
  SimpleGrid,
  Stack,
  TextInput,
  Group,
  Paper,
  Badge,
  Divider,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const programs = [
  {
    id: 1,
    name: "Computer Science",
    university: "Tribhuvan University",
    fee: 12000,
    currency: "NPR",
    language: "English",
    requirements: [
      { name: "TOEFL", isMandatory: true },
      { name: "GPA above 3.0", isMandatory: false },
    ],
  },
  {
    id: 2,
    name: "Business Administration",
    university: "Pokhara University",
    fee: 15000,
    currency: "NPR",
    language: "English",
    requirements: [{ name: "IELTS", isMandatory: true }],
  },
  {
    id: 3,
    name: "Data Science",
    university: "Kathmandu University",
    fee: 20000,
    currency: "USD",
    language: "English",
    requirements: [
      { name: "GRE", isMandatory: true },
      { name: "Math Background", isMandatory: false },
    ],
  },
  {
    id: 4,
    name: "BIT",
    university: "Purbanchal University",
    fee: 10000,
    currency: "NPR",
    language: "English",
    requirements: [
      { name: "GPA 2.9 above", isMandatory: true },
      { name: "Math Background", isMandatory: false },
    ],
  },
];

export default function ProgramCards() {
  const [search, setSearch] = useState("");

  const filtered = programs.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.university.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack spacing="xl">
      <Paper shadow="md" p="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md" wrap="wrap">
          <Title order={5} c="#1971c2">
            All Programs
          </Title>
          <TextInput
            placeholder="Search by program or university..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
          {filtered.map((program) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={program.id}
            >
              <Stack>
                <Title order={5} c="#1971c2">
                  {program.name}
                </Title>
                <Text size="sm" c="dimmed">
                  {program.university}
                </Text>

                <Divider my="sm" />

                <Text size="sm">
                  <strong>Fee:</strong> {program.fee} {program.currency}
                </Text>
                <Text size="sm">
                  <strong>Language:</strong> {program.language}
                </Text>

                <Divider my="sm" />

                <Text fw={600} size="sm">
                  Requirements:
                </Text>
                <Stack gap={4}>
                  {program.requirements.map((req, idx) => (
                    <Badge
                      key={idx}
                      color={req.isMandatory ? "red" : "gray"}
                      variant={req.isMandatory ? "filled" : "light"}
                      size="sm"
                    >
                      {req.name} {req.isMandatory ? "(Mandatory)" : "(Optional)"}
                    </Badge>
                  ))}
                </Stack>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Paper>
    </Stack>
  );
}
