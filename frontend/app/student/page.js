"use client";

import { useEffect, useState } from "react";
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
    Menu,
    ActionIcon,
    Badge,
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
    IconLibraryPlus,
    IconBell,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import UniversityInfo from "../../components/StudentDashboard/UniversityInfo";
import DashboardContent from "../../components/StudentDashboard/DashboardContent";
import ApplicationForm from "../../components/StudentDashboard/ApplicationForm";
import Announcements from "../../components/StudentDashboard/Announcements.js";

export default function AdminPanel() {
    const [user, setUser] = useState("");
    const [active, setActive] = useState("dashboard");
    const [mobileOpened, setMobileOpened] = useState(false);
    const [unreadCount, setUnreadContent] = useState(1)
    const isSmallScreen = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const payload = token.split('.')[1];
                        const decodedPayload = atob(payload);
                        const info = JSON.parse(decodedPayload);
                        setUser(info.FullName || '');
                    } catch (error) {
                        console.error('Failed to decode token:', error);
                    }
                }
            }
        }

    }, []);

    const menuItems = [
        { label: "Dashboard", value: "dashboard", icon: <IconDashboard size={20} /> },
        { label: "University Info", value: "universityinfo", icon: <IconBuildings size={20} /> },
        { label: "Application Form", value: "applicationform", icon: <IconFileText size={20} /> },
        { label: "Announcements", value: "announcement", icon: <IconSpeakerphone size={20} /> },
    ];

    const renderContent = () => {
        switch (active) {
            case "dashboard":
                return <DashboardContent />;
            case "universityinfo":
                return <UniversityInfo />;
            case "applicationform":
                return <ApplicationForm />;
            case "announcement":
                return <Announcements />;
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
                        {!isSmallScreen && <Text size="sm">{user}</Text>}

                        <ActionIcon
                            variant="subtle"
                            size="lg"
                            color="white"
                            onClick={() => router.push("/student/announcement")}
                            style={{ position: "relative" }}
                        >
                            <IconBell size={20} />
                            {unreadCount > 0 && (
                                <Badge
                                    color="red"
                                    size="xs"
                                    variant="filled"
                                    style={{ position: "absolute", top: -2, right: -2 }}
                                >
                                    {unreadCount}
                                </Badge>
                            )}
                        </ActionIcon>

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

            {/* <AppShell.Header p="md" style={{ backgroundColor: "#1971c2", color: "white" }}>
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
            </AppShell.Header> */}

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
