import {
  TextInput,
  Button,
  Paper,
  Table,
  Group,
  ActionIcon,
  Title,
  Stack,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { useState } from "react";
import GLoader from "../GLoader";
import apiService from '@/app/http/ApiService';

export default function DocumentViewerByUser() {
  const [username, setUsername] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!username.trim()) return;

    setLoading(true);
    apiService.userGetAllUserDocumentsByUserNameList({ UserName: username }).then((response) => {
      setDocuments(response?.data?.data || []);
    })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleViewDocument = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const handleReset = () => {
    setDocuments([]);
    setUsername("");
  }

  return (
    <Paper shadow="md" radius="md" p="lg" withBorder>
      <Stack>
        <Title order={4} c="blue.9">View Documents by Username</Title>

        <Group grow>
          <TextInput
            label="Enter Username"
            placeholder="example123"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <Group justify="flex-end" mt="lg">
            <Button variant="filled" color="blue" onClick={handleSearch} loading={loading}>
              Search
            </Button>
            <Button color="red" onClick={handleReset}>
              Reset
            </Button>
          </Group>
        </Group>

        {documents?.length > 0 && (
          <Table striped withBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Document Type</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {documents.map((doc, idx) => (
                <Table.Tr key={idx}>
                  <Table.Td>{doc.documentName}</Table.Td>
                  <Table.Td>
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => handleViewDocument(doc.value)}
                    >
                      <IconEye size={18} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Stack>

      <GLoader opened={loading} />
    </Paper>
  );
}
