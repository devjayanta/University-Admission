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
  Modal
} from '@mantine/core';
import { IconSearch, IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import GLoader from '../GLoader';
import { useDisclosure } from '@mantine/hooks';
import { showAlert, showConfirmAlert } from '../Alert';

export default function Students() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const [rejectedId, setRejectedId] = useState(null);
  const [rejectedMessage, setRejectedMessage] = useState("");


  const pageSize = 5;
  const filtered = applications?.filter(
    (a) =>
      a?.universityName?.toLowerCase().includes(search.toLowerCase()) ||
      a?.userName?.toLowerCase().includes(search.toLowerCase()) ||
      a?.universityProgramName?.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize
  );

  const getApplicationList = () => {
    apiService.userProcessGetAllList().then(response => {
      setApplications(response?.data?.data);
    })
  }

  useEffect(() => {
    setLoading(true);
    getApplicationList();
    setLoading(false)
  }, [])


  const handleApprove = (aid) => {
    showConfirmAlert(
      "Are you sure to approve?",
      () => {
        setLoading(true);
        apiService.userProcessApproveProcessCreate({
          "id": aid,
          "remarks": "Your Application is Approved!!"
        }).then((response) => {
          showAlert("Approved successfully", "success");
          getApplicationList();
        }).finally(() => {
          setLoading(false);
        })
      },
      () => {
        console.log("cancelled");
      }
    );
  };

  const handleReject = (id) => {
    setRejectedId(id);
    open();
  };

  const submitRejection = () => {
    if (!rejectedMessage.trim()) return;

    setLoading(true);
    apiService.userProcessRejectProcessCreate(
      {
        "id": rejectedId,
        "remarks": rejectedMessage
      }).then(() => {
        showAlert("Successfully Rejected!!", 'success');
        getApplicationList();
        setRejectedMessage("");
        setRejectedId(null);
        close();
      }).finally(() => {
        setLoading(false);
      })
  };



  return (
    <Stack spacing="xl">
      <Paper shadow="sm" p="lg" radius="md" >
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

        <p style={{ marginTop: -10 }}>
          You can view a student's documents by username from the Documents menu.
        </p>

        <Table
          striped
          highlightOnHover
          withTableBorder
          verticalSpacing="sm"
          horizontalSpacing="md"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User Name</Table.Th>
              <Table.Th>Applied University</Table.Th>
              <Table.Th>Applied Program</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginated.length > 0 ? (
              paginated.map((a) => (
                <Table.Tr key={a.id}>
                  <Table.Td>{a.userName}</Table.Td>
                  <Table.Td>{a.universityName}</Table.Td>
                  <Table.Td>{a.universityProgramName}</Table.Td>
                  <Table.Td>
                    {
                      a.status == null ? (
                        <Group gap="xs">
                          <ActionIcon
                            color="green"
                            variant="light"
                            onClick={() => handleApprove(a.id)}
                            title='Approve'
                          >
                            <IconThumbUp size={18} />
                          </ActionIcon>
                          <ActionIcon
                            color="red"
                            variant="light"
                            title='Reject'
                            onClick={() => handleReject(a.id)}
                          >
                            <IconThumbDown size={18} />
                          </ActionIcon>
                        </Group>
                      ) :
                        <>
                          {a.status}
                        </>
                    }

                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4} style={{ textAlign: "center" }}>
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

      <GLoader opened={loading} />

      <Modal
        opened={opened}
        onClose={close}
        title="Enter the reason for rejection:"
        centered
        size="lg"
      >
        <Stack>
          <Textarea
            placeholder="Type reason..."
            value={rejectedMessage}
            onChange={(e) => setRejectedMessage(e.target.value)}
            autosize
            minRows={3}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button color="red" onClick={submitRejection}>
              Submit Rejection
            </Button>
          </Group>
        </Stack>
      </Modal>

    </Stack>
  )

}