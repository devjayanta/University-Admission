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
import { useEffect, useState } from "react";
import GLoader from '../GLoader';
import apiService from "@/app/http/ApiService";


export default function ProgramCards() {
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiService.programGetAllList().then(response => {
      setPrograms(response?.data?.data);
    }).finally(() => {
      setLoading(false);
    })
  }, [])


  const filtered = programs?.filter(
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

        {
          filtered?.length > 0 ? (
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
                      {program.universityName}
                    </Text>

                    <Divider my="sm" />

                    <Text size="sm">
                      <strong>Fee:</strong> {program.fee}
                    </Text>

                    <Divider my="sm" />

                    <Text fw={600} size="sm">
                      Requirements:
                    </Text>
                    <Stack gap={4}>
                      {program.programRequirements.map((req, idx) => (
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
          )
            :
            (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                No programs found!!
              </SimpleGrid>
            )
        }


      </Paper>

      <GLoader opened={loading} />

    </Stack>
  );
}
