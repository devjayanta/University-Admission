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
    ThemeIcon,
    Burger,
    Menu
} from "@mantine/core";
import {
    IconUsers,
    IconFileText,
    IconSettings,
    IconLogout,
    IconDashboard,
    IconLayoutDashboard,
    IconSpeakerphone,
    IconDotsVertical,
    IconSchool,
    IconBuildings,
    IconScript,
    IconLibraryPlus
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import Announcement from "../../components/AdminDashboard/Announcement";
import Students from "../../components/AdminDashboard/Students";
import Applications from "../../components/AdminDashboard/Applications";
import Programs from "../../components/AdminDashboard/Programs";
import UniversityInfo from "../../components/StudentDashboard/UniversityInfo";
import Documents from "../../components/AdminDashboard/Documents";
import AddProgram from "../../components/AdminDashboard/AddProgram";

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
                <StatsBox title="New Applications" value="24" icon={<IconLayoutDashboard size={20} />} />
            </SimpleGrid>
        </Stack>
    );
}



function SettingsContent() {
    return <Text>Settings form will go here.</Text>;
}

export default function AdminPanel() {
    const [active, setActive] = useState("dashboard");
    const [mobileOpened, setMobileOpened] = useState(false);
    const isSmallScreen = useMediaQuery("(max-width: 768px)");

    const menuItems = [
        { label: "University Info", value: "universityinfo", icon: <IconBuildings size={20} /> },
        { label: "Announcement", value: "announcement", icon: <IconSpeakerphone size={20} /> },
        { label: "Add Program", value: "addprogram", icon: <IconLibraryPlus size={20} /> },
        { label: "Programs", value: "programs", icon: <IconSchool size={20} /> },
        { label: "Applications", value: "applications", icon: <IconFileText size={20} /> },
        { label: "Students", value: "students", icon: <IconUsers size={20} /> },
        { label: "Documents", value: "documents", icon: <IconScript  size={20} /> },
    ];

    const renderContent = () => {
        switch (active) {
            case "universityinfo":
                return <UniversityInfo />;
            case "dashboard":
                return <DashboardContent />;
            case "applications":
                return <Applications />;
            case "addprogram":
                return <AddProgram />;
            case "announcement":
                return <Announcement />;
            case "students":
                return <Students />
            case "programs":
                return <Programs />
            case "documents":
                return <Documents />
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
                collapsed: { mobile: !mobileOpened },
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
                            onClick={() => {
                                setActive(item.value);
                                setMobileOpened(false);
                            }}
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
                <Group justify="space-between" align="center" style={{ height: "100%" }} wrap="wrap">
                    <Group>
                        <Burger
                            opened={mobileOpened}
                            onClick={() => setMobileOpened((o) => !o)}
                            hiddenFrom="sm"
                            size="sm"
                            color="white"
                        />
                        <Text size="lg" fw={700} style={{ color: "white" }}>
                            Student Panel
                        </Text>
                    </Group>
                    
                    <Group gap="sm" wrap="wrap" justify="flex-end">
                        <Avatar src="https://i.pravatar.cc/40" alt="User" radius="xl" size="sm" />
                        {!isSmallScreen && <Text size="sm">Student</Text>}
                        {isSmallScreen ? (
                            <Menu shadow="md" width={150}>
                                <Menu.Target>
                                    <Box style={{ cursor: "pointer" }}>
                                        <IconDotsVertical size={16} />
                                    </Box>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<IconLogout size={14} />} color="red">
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <Button size="xs" color="red" leftSection={<IconLogout size={14} />}>
                                Logout
                            </Button>
                        )}
                    </Group>

                </Group>
            </AppShell.Header>

            <AppShell.Main>
                <Container size="xl">
                    <Box mb="xl">
                        <Group
                            pb="xs"
                            mb="md"
                            align="center"
                            style={{
                                borderBottom: '2px solid #1971c2',
                                display: 'inline-flex',
                            }}
                        >
                            <Box mr="xs" c="#1971c2">
                                {menuItems.find((m) => m.value === active)?.icon}
                            </Box>
                            <Title order={4} style={{ color: '#1971c2' }}>
                                {menuItems.find((m) => m.value === active)?.label}
                            </Title>
                        </Group>

                        <Box mt="md">{renderContent()}</Box>
                    </Box>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
