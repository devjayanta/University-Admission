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
import Announcement from "../../components/AdminDashboard/AnnouncementForm";
import Students from "../../components/AdminDashboard/Students";
import Applications from "../../components/AdminDashboard/Applications";
import Programs from "../../components/AdminDashboard/Programs";
import University from "../../components/AdminDashboard/University";
import Documents from "../../components/AdminDashboard/Documents";
import AddProgram from "../../components/AdminDashboard/AddProgram";
import apiService from "../http/ApiService";
import GLoader from "@/components/GLoader";
import { useRouter } from "next/navigation";

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

function DashboardContent({ statistics }) {
    return (
        <Stack>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                <StatsBox title="Total Universtiries" value={statistics?.universityCount} icon={<IconUsers size={20} />} />
                <StatsBox title="Total Programs" value={statistics?.programCount} icon={<IconUsers size={20} />} />
                <StatsBox title="Total Students" value={statistics?.studentCount} icon={<IconUsers size={20} />} />
                <StatsBox title="Total Applications" value={statistics?.applicationCount} icon={<IconFileText size={20} />} />
                <StatsBox title="Total Approved Applications" value={statistics?.approvedApplicationCount} icon={<IconFileText size={20} />} />
                <StatsBox title="Total Rejected Applications" value={statistics?.rejectedApplicationCount} icon={<IconFileText size={20} />} />
            </SimpleGrid>
        </Stack>
    );
}

export default function AdminPanel() {
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState("dashboard");
    const [statistics, setStatistics] = useState(null);
    const [mobileOpened, setMobileOpened] = useState(false);
    const isSmallScreen = useMediaQuery("(max-width: 768px)");

    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        apiService.dashboardGetDashboardCountsList().then(response => {
            console.log("response", response?.data?.data)
            setStatistics(response?.data?.data);

        }).finally(() => {
            setLoading(false);
        })
    }, [])

    const menuItems = [
        { label: "Dashboard", value: "dashboard", icon: <IconDashboard size={20} /> },
        { label: "Announcement", value: "announcement", icon: <IconSpeakerphone size={20} /> },
        { label: "University", value: "university", icon: <IconBuildings size={20} /> },
        { label: "Add Program", value: "addprogram", icon: <IconLibraryPlus size={20} /> },
        { label: "Programs", value: "programs", icon: <IconSchool size={20} /> },
        { label: "Applications", value: "applications", icon: <IconFileText size={20} /> },
        { label: "Students", value: "students", icon: <IconUsers size={20} /> },
        { label: "Documents", value: "documents", icon: <IconScript size={20} /> },
    ];

    const renderContent = () => {
        switch (active) {
            case "dashboard":
                return <DashboardContent statistics={statistics} />;
            case "applications":
                return <Applications />;
            case "university":
                return <University />;
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

    const handleLogout = ()=>{
        router.push('/')
        localStorage.clear();
    }

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
                            Admin Panel
                        </Text>
                    </Group>
                    <Group gap="sm" wrap="wrap" justify="flex-end">
                        <Avatar src="https://i.pravatar.cc/40" alt="User" radius="xl" size="sm" />
                        {!isSmallScreen && <Text size="sm">Admin</Text>}
                        {isSmallScreen ? (
                            <Menu shadow="md" width={150}>
                                <Menu.Target>
                                    <Box style={{ cursor: "pointer" }}>
                                        <IconDotsVertical size={16} />
                                    </Box>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<IconLogout size={14} />} color="red" onClick={handleLogout}>
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <Button size="xs" color="red" leftSection={<IconLogout size={14} />} onClick={handleLogout}>
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

            <GLoader opened={loading} />
        </AppShell>
    );
}
