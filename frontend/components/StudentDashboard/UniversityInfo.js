import { useEffect, useState } from "react";
import {
    Stack,
    Paper,
    Title,
    Select,
    TextInput,
    Card,
    Text,
    Divider,
    Badge,
    SimpleGrid,
    Group,
    Flex,
    rem,
} from "@mantine/core";
import { IconPlus, IconTrash, IconSearch, IconBuildings, IconMapPin, IconWorld, IconId, IconMap } from "@tabler/icons-react";
import GLoader from "../GLoader";
import { showAlert } from "../Alert";
import apiService from "@/app/http/ApiService";

export default function UniversityInfo() {
    const [universities, setUniversities] = useState([]);
    const [universitiesList, setUniversitiesList] = useState([]);
    const [universityId, setUniversityId] = useState("");
    const [university, setUniversity] = useState({});
    const [programs, setPrograms] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);


    const getUniversities = () => {
        apiService.universityGetAllList().then((response) => {
            setUniversities(response?.data?.data);
            setUniversitiesList(
                response?.data?.data?.map((c) => ({
                    value: c.id.toString(),
                    label: c.name,
                })) || []
            );
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getUniversities();
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleUniversityChange = (uId) => {
        setLoading(true);
        setUniversityId(uId);
        let universitydetails = universities?.find(u => u.id == Number(uId)) || {}
        setUniversity(universitydetails)
        setLoading(true);
        apiService.programGetByUniversityIdList({ UniversityId: Number(uId) }).then(response => {
            setPrograms(response?.data?.data);
        }).finally(() => {
            setLoading(false);
        })
    }

    const filtered = programs?.filter(
        (p) =>
            p?.name?.toLowerCase().includes(search.toLowerCase()) ||
            p?.universityName?.toLowerCase().includes(search.toLowerCase())
    );



    return (
        <Stack spacing="xl">
            <Paper shadow="lg" p="xl" radius="md" withBorder>
                <Title order={5} c="blue.9" mb="lg">
                    Explore University Details
                </Title>

                <Group justify="space-between" wrap="wrap" mb="md" gap="md">
                    <Select
                        label="Select University"
                        data={universitiesList}
                        value={universityId || ""}
                        onChange={(value) => handleUniversityChange(value)}
                        searchable
                        placeholder="Choose a university"
                        w={{ base: "100%", sm: "48%", md: "30%" }}
                    />
                </Group>
                {
                    universityId && (
                        <>
                            <Paper
                                shadow="sm"
                                radius="md"
                                p="md"
                                withBorder
                                mb="lg"
                                bg="gray.0"
                            >
                                <Stack gap="xs">
                                    <Group justify="space-between" align="center">
                                        <Group>
                                            <IconBuildings size={18} color="#1971c2" />
                                            <Title order={5} c="blue.9">{university?.name}</Title>
                                        </Group>
                                    </Group>
                                    <Group>
                                        <IconMap size={18} color="#2c3e50" />
                                        <Text size="sm">
                                            <strong>Country:</strong> {university?.country?.name}
                                        </Text>
                                    </Group>

                                    <Group>
                                        <IconMapPin size={18} color="#2c3e50" />
                                        <Text size="sm">
                                            <strong>Address:</strong> {university?.addressLine1}
                                        </Text>
                                    </Group>

                                    <Group>
                                        <IconWorld size={18} color="#2c3e50" />
                                        <Text size="sm">
                                            <strong>Website:</strong>{" "}
                                            <a href={university.webSite} target="_blank" c="blue.7">
                                                {university.webSite}
                                            </a>
                                        </Text>
                                    </Group>
                                </Stack>
                            </Paper>

                            <Flex
                                justify="space-between"
                                align="center"
                                direction={{ base: "column", sm: "row" }}
                                wrap="wrap"
                                gap="sm"
                                mb="md"
                            >
                                <Text fw={600} c="gray.7">
                                    Programs:{" "}
                                </Text>

                                <TextInput
                                    label="Search Programs"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name, requirement..."
                                    leftSection={<IconSearch size={18} stroke={1.5} color="red" />}
                                    w={{ base: "100%", sm: "48%", md: "30%" }}
                                />
                            </Flex>
                            <Divider my="xs" />

                            {filtered?.length > 0 ? (
                                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                                    {filtered.map((program) => (
                                        <Card
                                            shadow="sm"
                                            padding="md"
                                            radius="md"
                                            withBorder
                                            key={program.id}
                                            style={{ transition: "transform 0.2s ease", minHeight: "100%" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                        >
                                            <Stack spacing={6}>
                                                <Title order={6} c="blue.9" lineClamp={2}>
                                                    {program.name}
                                                </Title>
                                                <Text size="xs" c="dimmed">
                                                    {program.universityName}
                                                </Text>

                                                <Divider my={4} />

                                                <Text size="sm">
                                                    <strong>Fee:</strong> {program.fee}<br />
                                                    <strong>Language:</strong> {program.language}
                                                </Text>

                                                <Divider my={4} />

                                                <Text fw={600} size="sm">
                                                    Requirements:
                                                </Text>
                                                <Stack gap={4}>
                                                    {program.programRequirements.map((req, idx) => (
                                                        <Badge
                                                            key={idx}
                                                            color={req.isMandatory ? "red" : "gray"}
                                                            variant={req.isMandatory ? "filled" : "light"}
                                                            size="xs"
                                                        >
                                                            {req.name} {req.isMandatory ? "(Mandatory)" : "(Optional)"}
                                                        </Badge>
                                                    ))}
                                                </Stack>
                                            </Stack>
                                        </Card>

                                    ))}
                                </SimpleGrid>
                            ) : (
                                <Paper shadow="sm" radius="md" p="md" withBorder mt="lg" bg="red.1" style={{ textAlign: "center" }}>
                                    <Text c="red.7" fw={600} size="sm">
                                        No programs found!
                                    </Text>
                                </Paper>

                            )}
                        </>
                    )
                }
            </Paper>

            <GLoader opened={loading} />
        </Stack>
    );
}
