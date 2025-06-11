import { useEffect, useState } from "react";
import {
    Paper,
    Stack,
    TextInput,
    Button,
    Group,
    Title,
    Select,
    Table,
    Checkbox,
    ActionIcon,
    ScrollArea,
    SimpleGrid
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import GLoader from "../GLoader";
import { showAlert } from "../Alert";
import apiService from "@/app/http/ApiService";

export default function UniversityForm() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newProgram, setNewProgram] = useState({
        universityId: "",
        name: "",
        level: "",
        duration: "",
        fee: "",
        currency: "",
        language: "",
        programRequirements: [],
    });
    const [newRequirement, setNewRequirement] = useState({
        name: "",
        isMandatory: false,
        type: "",
        value: "",
    });

    const levels = ["Bachelor", "Master", "PhD"];
    const levelOptions = levels.map((level) => ({
        value: level,
        label: level,
    }));

    const reqTypes = [{ value: "Bool", label: "True/False" }, { value: "Str", label: "Text" }, { value: "Num", label: "Number" }, { value: "File", label: "File" }]

    const getUniversities = () => {
        apiService.universityGetAllList().then((response) => {
            setUniversities(
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

    const handleAddRequirement = () => {
        if (!newRequirement.name) return;

        setNewProgram((prev) => ({
            ...prev,
            programRequirements: [...prev.programRequirements, newRequirement],
        }));
        handleResetNewRequirement();
    };

    const handleSave = async () => {
        if (!newProgram.universityId || !newProgram.name || !newProgram.level) {
            showAlert("Please fill all required fields", "info");
            return;
        }

        setLoading(true);
        apiService.programCreate(newProgram).then(response => {
            if (response?.data?.success) {
                showAlert("Program saved successfully!", "success");
                handleReset();
            }
        }).finally(() => {
            setLoading(false);
        })
    };

    const handleReset = () => {
        setNewProgram({
            universityId: null,
            name: "",
            level: null,
            fee: "",
            programRequirements: [],
        });
    }

    const handleResetNewRequirement = () => {
        setNewRequirement({ name: "", isMandatory: false, type: null, value: "", });
    }

    return (
        <Stack spacing="xl">
            <Paper shadow="md" p="lg" radius="md" >
                <Title order={5} mb="md" c="#1971c2">
                    Add Program
                </Title>
                <Stack>
                    <Select
                        label="University"
                        data={universities}
                        value={newProgram.universityId}
                        onChange={(value) =>
                            setNewProgram({ ...newProgram, universityId: value || "" })
                        }
                        withAsterisk
                        searchable
                        placeholder="Select University"
                    />
                    <TextInput
                        label="Program Name"
                        value={newProgram.name}
                        onChange={(e) =>
                            setNewProgram({ ...newProgram, name: e.target.value })
                        }
                        withAsterisk
                    />
                    <Select
                        label="Level"
                        data={levelOptions}
                        value={newProgram.level}
                        onChange={(value) =>
                            setNewProgram({ ...newProgram, level: value || "" })
                        }
                        placeholder="Select level"
                        searchable
                        withAsterisk
                    />
                    <TextInput
                        label="Duration (Semester/Year)"
                        value={newProgram.duration}
                        onChange={(e) =>
                            setNewProgram({ ...newProgram, duration: e.target.value })
                        }
                    />
                    <TextInput
                        label="Fee"
                        value={newProgram.fee}
                        onChange={(e) =>
                            setNewProgram({ ...newProgram, fee: e.target.value })
                        }
                    />
                    <TextInput
                        label="Currency"
                        value={newProgram.currency}
                        onChange={(e) =>
                            setNewProgram({ ...newProgram, currency: e.target.value })
                        }
                    />
                    <TextInput
                        label="Language"
                        value={newProgram.language}
                        onChange={(e) =>
                            setNewProgram({ ...newProgram, language: e.target.value })
                        }
                    />

                    <Paper shadow="md" p="lg" radius="md">
                        <Title order={6} mb="md" c="blue.7">
                            Add Requirement
                        </Title>

                        <SimpleGrid
                            cols={{ base: 1, sm: 2, md: 2, lg: 3 }}
                            spacing="md"
                            verticalSpacing="md"
                        >
                            <TextInput
                                label="Requirement"
                                value={newRequirement.name}
                                onChange={(e) =>
                                    setNewRequirement({ ...newRequirement, name: e.target.value })
                                }
                                radius="md"
                            />

                            <Select
                                label="Type"
                                data={reqTypes}
                                value={newRequirement.type}
                                onChange={(value) =>
                                    setNewRequirement({ ...newRequirement, type: value || "" })
                                }
                                placeholder="Select type"
                                radius="md"
                            />

                            <TextInput
                                label="Required Value (e.g., GPA, GRE, IELTS)"
                                value={newRequirement.value}
                                onChange={(e) =>
                                    setNewRequirement({ ...newRequirement, value: e.target.value })
                                }
                                radius="md"
                            />
                        </SimpleGrid>

                        <Group mt="md" justify="space-between" align="center">
                            <Checkbox
                                label="Mandatory"
                                checked={newRequirement.isMandatory}
                                onChange={(e) =>
                                    setNewRequirement({
                                        ...newRequirement,
                                        isMandatory: e.currentTarget.checked,
                                    })
                                }
                                color="blue"
                                radius="md"
                            />

                            <Button
                                color="blue"
                                leftSection={<IconPlus size={16} />}
                                onClick={handleAddRequirement}
                                radius="md"
                            >
                                Add Requirement
                            </Button>
                        </Group>
                    </Paper>

                    <ScrollArea>
                        {newProgram.programRequirements.length > 0 && (
                            <Table striped withTableBorder highlightOnHover mt="md">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Name</Table.Th>
                                        <Table.Th>Type</Table.Th>
                                        <Table.Th>Type</Table.Th>
                                        <Table.Th>Value</Table.Th>
                                        <Table.Th>Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {newProgram.programRequirements.map((req, idx) => (
                                        <Table.Tr key={idx}>
                                            <Table.Td>{req.name}</Table.Td>
                                            <Table.Td>
                                                {reqTypes?.find(rq => rq.value === req.type)?.label || "-"}
                                            </Table.Td>
                                            <Table.Td>{req.value || "-"}</Table.Td>
                                            <Table.Td>{req.isMandatory ? "Yes" : "No"}</Table.Td>
                                            <Table.Td>
                                                <ActionIcon
                                                    color="red"
                                                    variant="subtle"
                                                    onClick={() =>
                                                        setNewProgram((prev) => ({
                                                            ...prev,
                                                            programRequirements:
                                                                prev.programRequirements.filter(
                                                                    (_, i) => i !== idx
                                                                ),
                                                        }))
                                                    }
                                                >
                                                    <IconTrash size={16} />
                                                </ActionIcon>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        )}
                    </ScrollArea>

                    <Group justify="flex-end" mt="lg">
                        <Button variant="filled" color="blue" onClick={handleSave}>
                            Save
                        </Button>
                    </Group>
                </Stack>
            </Paper>

            <GLoader opened={loading} />
        </Stack>
    );
}
