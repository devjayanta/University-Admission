import { useEffect, useState } from "react";
import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  Badge,
  Divider,
  Collapse,
  Pagination,
} from "@mantine/core";
import { IconSpeakerphone } from "@tabler/icons-react";
import apiService from "@/app/http/ApiService";
import dayjs from "dayjs";

export default function AnnouncementPanel() {
  const [opened, setOpened] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const handleToggle = (id) => {
    setOpened(opened === id ? null : id);
  };

  useEffect(() => {
    apiService.announcementList().then((response) => {
      const sorted = response?.data?.data?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setAnnouncements(sorted);
    });
  }, []);

  const paginatedAnnouncements = announcements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Paper shadow="md" p="lg" radius="md" >
      <Stack spacing="md">
        {paginatedAnnouncements.length > 0 ? (
          paginatedAnnouncements.map((item) => (
            <Paper
              key={item.id}
              p="md"
              radius="md"
              shadow="sm"
              style={{
                backgroundColor: "#f9fbfc",
                transition: "transform 0.2s ease",
                cursor: "pointer",
              }}
              onClick={() => handleToggle(item.id)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.01)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Group justify="space-between" align="start">
                <Title order={6} c="blue.7">
                  {item.title}
                </Title>
                <Group gap="xs">
                  {item.isNew && <Badge color="red">New</Badge>}
                  <Text size="xs" c="dimmed">
                    {dayjs(item.createdAt).format("MMM D, YYYY")}
                  </Text>
                </Group>
              </Group>

              <Collapse in={opened === item.id}>
                <Divider my="xs" />
                <Text size="sm" c="gray.8">
                  {item.description}
                </Text>
              </Collapse>
            </Paper>
          ))
        ) : (
          <Text ta="center" c="red">
            No announcements found
          </Text>
        )}

        {/* Pagination */}
        {announcements.length > itemsPerPage && (
          <Group justify="center" mt="sm">
            <Pagination
              total={Math.ceil(announcements.length / itemsPerPage)}
              value={currentPage}
              onChange={setCurrentPage}
              size="sm"
              color="blue"
            />
          </Group>
        )}
      </Stack>
    </Paper>
  );
}
