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
    rem,
    ScrollArea
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
        fee: "",
        programRequirements: [],
    });
    const [newRequirement, setNewRequirement] = useState({
        name: "",
        isMandatory: false,
        type: "Bool"
    });

   

    const levels = ["Bachelor", "Master", "PhD"];
    const levelOptions = levels.map((level) => ({
        value: level,
        label: level,
    }));

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
        setNewRequirement({ name: "", isMandatory: false });
    };

    const handleSave = async () => {
        if (!newProgram.universityId || !newProgram.name || !newProgram.level) {
            showAlert("Please fill all required fields", "info");
            return;
        }

        setLoading(true);
        apiService.programCreate(newProgram).then(response=>{
            showAlert("Program saved successfully!", "success");
            handleReset();
        }).finally(()=>{
            setLoading(false);
        })
    };

    const handleReset = () => {
        setNewProgram({
            universityId: "",
            name: "",
            level: "",
            fee: "",
            programRequirements: [],
        });
    }

    return (
        <Stack spacing="xl">
            <Paper shadow="md" p="lg" radius="md" withBorder>
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
                        required
                        searchable
                        placeholder="Select University"
                    />
                    <TextInput
                        label="Program Name"
                        value={newProgram.name}
                        onChange={(e) =>
                            setNewProgram({ ...newProgram, name: e.target.value })
                        }
                        required
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
                        required
                    />
                    <TextInput
                        label="Fee"
                        value={newProgram.fee}
                        onChange={(e) =>
                            setNewProgram({ ...newProgram, fee: e.target.value })
                        }
                    />

                    <Group align="end" grow>
                        <TextInput
                            label="Requirement"
                            value={newRequirement.name}
                            onChange={(e) =>
                                setNewRequirement({ ...newRequirement, name: e.target.value })
                            }
                        />
                        <Checkbox
                            label="Mandatory"
                            checked={newRequirement.isMandatory}
                            onChange={(e) =>
                                setNewRequirement({
                                    ...newRequirement,
                                    isMandatory: e.currentTarget.checked,
                                })
                            }
                        />
                        <Button
                            color="blue"
                            leftSection={<IconPlus size={16} />}
                            onClick={handleAddRequirement}
                        >
                            Add Requirement
                        </Button>
                    </Group>

                    <ScrollArea>
                        {newProgram.programRequirements.length > 0 && (
                            <Table striped withTableBorder highlightOnHover mt="md">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Name</Table.Th>
                                        <Table.Th>Mandatory</Table.Th>
                                        <Table.Th>Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {newProgram.programRequirements.map((req, idx) => (
                                        <Table.Tr key={idx}>
                                            <Table.Td>{req.name}</Table.Td>
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
