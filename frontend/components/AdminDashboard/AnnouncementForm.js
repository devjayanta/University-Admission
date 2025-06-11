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
  Pagination,
  ScrollArea
} from '@mantine/core';
import { IconTrash, IconEdit, IconSearch } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import GLoader from '../GLoader';
import { showAlert, showConfirmAlert } from '../Alert';

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const titleRef = useRef(null);

  const pageSize = 5;

  useEffect(() => {
    getPublishedAnnouncement()
  }, [])

  const handlePublish = () => {
    if (!title || !description) {
      showAlert("Enter all the required fields!!", 'info')
      return;
    }

    setLoading(true);
    if (editId) {
      apiService.announcementUpdate({ title, description }, { id: editId }).then(response => {
        if (response?.data?.success) {
          showAlert("Announcement updated!!", "success");
          handleReset();
          getPublishedAnnouncement();
        }
      }).finally(() => {
        setLoading(false);
      });
    }
    else {
      apiService.announcementCreate({ "title": title, "description": description }).then(response => {
        if (response?.data?.success) {
          showAlert("Announcement published Successfully!!", 'success');
          handleReset();
          getPublishedAnnouncement();
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const getPublishedAnnouncement = () => {
    setLoading(true);
    apiService.announcementList().then(response => {
      setAnnouncements(response?.data?.data ?? [])
    }).finally(() => {
      setLoading(false);
    });
  }

  const handleDelete = (id) => {
    showConfirmAlert(
      "Are you sure to delete?",
      () => {
        setLoading(true);
        apiService.announcementDelete({ id }).then((response) => {
          if (response?.data?.success) {
            showAlert("Deleted successfully", "success");
            getPublishedAnnouncement();
          }
        }).finally(() => {
          setLoading(false);
        })
      },
      () => {
        console.log("Delete cancelled");
      }
    );
  };

  const handleUpdate = (announcement) => {
    setEditId(announcement.id);
    setTitle(announcement.title);
    setDescription(announcement.description);
    setTimeout(() => {
      titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      titleRef.current?.focus();
    }, 200);
  };

  const handleReset = () => {
    setEditId(null);
    setTitle('');
    setDescription('');
  }

  const filtered = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize
  );

  return (
    <Stack spacing="xl">
      <Paper shadow="md" p="lg" radius="md" >
        <Title order={5} mb="md" c="#1971c2">
          Publish New Announcement
        </Title>
        <Stack>
          <TextInput
            label="Title"
            placeholder="Enter announcement title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            ref={titleRef}
            required
          />
          <Textarea
            label="Description"
            placeholder="Enter announcement details"
            minRows={4}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            required
          />
          <Group justify="flex-end">
            <Button color="blue" onClick={handlePublish}>
              {editId ? "Update" : "Publish"}
            </Button>
            <Button color="red" onClick={handleReset}>
              Reset
            </Button>
          </Group>
        </Stack>
      </Paper>

      <Paper shadow="sm" p="lg" radius="md" >
        <Group justify="space-between" mb="md" wrap="wrap">
          <Title order={5} c="#1971c2">
            Announcements List
          </Title>
          <TextInput
            placeholder="Search announcements..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </Group>

        <ScrollArea>
          <Table striped highlightOnHover withTableBorder verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Title</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Created At</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginated.length > 0 ? (
                paginated.map((a) => (
                  <Table.Tr key={a.id}>
                    <Table.Td>{a.title}</Table.Td>
                    <Table.Td>{a.description}</Table.Td>
                    <Table.Td>{a.createdAt.split('T')[0]}</Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Group gap="xs" justify="flex-end">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() => handleUpdate(a)}
                        >
                          <IconEdit size={18} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => handleDelete(a.id)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
                    No announcements found.
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>

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

    </Stack>
  );
}
