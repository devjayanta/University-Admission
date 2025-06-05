"use client";

import { useState } from "react";
import {
    AppShell,
    Text,
    Group,
    Box,
    Title,
    Paper,
    Stack,
    SimpleGrid,
    NavLink,
    Container,
    Button,
    Avatar,
    rem,
    ThemeIcon
} from "@mantine/core";
import {
    IconUsers,
    IconFileText,
    IconSettings,
    IconLogout,
    IconDashboard,
    IconLayoutDashboard,
    IconSpeakerphone
} from "@tabler/icons-react";
import AnnouncementContent from "../../components/dashboard/AnnouncementContent";

function StatsBox({ title, value, icon }) {
    return (
        <Paper shadow="md" p="lg" radius="lg" withBorder>
            <Group align="center" gap="md">
                <ThemeIcon variant="light" color="blue" size="lg" radius="xl">
                    {icon}
                </ThemeIcon>
                <div>
                    <Text size="sm" c="dimmed">
                        {title}
                    </Text>
                    <Text size="xl" fw={700} mt={4}>
                        {value}
                    </Text>
                </div>
            </Group>
        </Paper>
    );
}

function DashboardContent() {
    return (
        <Stack>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                <StatsBox title="Total Students" value="1200" icon={<IconUsers size={20} />} />
                <StatsBox title="Total Applications" value="350" icon={<IconFileText size={20} />} />
                <StatsBox title="Active Courses" value="24" icon={<IconLayoutDashboard size={20} />} />
            </SimpleGrid>
        </Stack>
    );
}

function ApplicationsContent() {
    return <Text>Applications list will go here.</Text>;
}

function SettingsContent() {
    return <Text>Settings form will go here.</Text>;
}

export default function AdminPanel() {
    const [active, setActive] = useState("dashboard");

    const menuItems = [
        { label: "Dashboard", value: "dashboard", icon: <IconDashboard size={20} /> },
        { label: "Applications", value: "applications", icon: <IconFileText size={20} /> },
        { label: "Students", value: "students", icon: <IconUsers size={20} /> },
        { label: "Announcement", value: "announcement", icon: <IconSpeakerphone size={20} /> },
        { label: "Settings", value: "settings", icon: <IconSettings size={20} /> },
    ];

    const renderContent = () => {
        switch (active) {
            case "dashboard":
                return <DashboardContent />;
            case "applications":
                return <ApplicationsContent />;
            case "settings":
                return <SettingsContent />;
            case "announcement":
                return <AnnouncementContent />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <AppShell
            padding="md"
            navbar={{
                width: 260,
                breakpoint: "sm",
                collapsed: { mobile: false },
            }}
            header={{ height: 60 }}
        >
            <AppShell.Navbar p="md" withBorder style={{ backgroundColor: "#f0f4f8" }}>
                <AppShell.Section grow>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.value}
                            label={item.label}
                            leftSection={item.icon}
                            active={active === item.value}
                            onClick={() => setActive(item.value)}
                            variant={active === item.value ? "filled" : "light"}
                            styles={{
                                root: {
                                    borderRadius: rem(8),
                                    marginBottom: rem(10),
                                    padding: rem(12),
                                },
                                label: { fontSize: rem(15) },
                            }}
                        />
                    ))}
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Header p="md" style={{ backgroundColor: "#1971c2", color: "white" }}>
                <Group justify="space-between" align="center" style={{ height: "100%" }}>
                    <Text size="lg" fw={700} style={{ color: "white" }}>
                        Admin Panel
                    </Text>
                    <Group>
                        <Avatar src="https://i.pravatar.cc/40" alt="User" radius="xl" size="sm" />
                        <Text size="sm">Admin</Text>
                        <Button size="xs" color="red" leftSection={<IconLogout size={14} />}>
                            Logout
                        </Button>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Main>
                <Container size="xl">
                    <Box>
                        <Title order={4} mb="md">
                            {menuItems.find((m) => m.value === active)?.label}
                        </Title>
                        {renderContent()}
                    </Box>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
