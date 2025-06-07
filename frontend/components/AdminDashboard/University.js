import { useState } from "react";
import {
    Paper,
    Stack,
    TextInput,
    Button,
    Group,
    Title,
    Select,
    Table,
    Text,
    Checkbox,
    ActionIcon,
    rem,
} from "@mantine/core";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";

export default function UniversityForm() {
    const [university, setUniversity] = useState({ name: '', address: '', country: '', website: '' });
    const [programs, setPrograms] = useState([]);
    const [newProgram, setNewProgram] = useState({ name: '', level: '', fee: '', currency: '', language: '', requirements: [] });
    const [newRequirement, setNewRequirement] = useState({ name: '', isMandatory: false });

    const handleAddRequirement = () => {
        if (!newRequirement.name) return;
        setNewProgram(prev => ({
            ...prev,
            requirements: [...prev.requirements, newRequirement],
        }));
        setNewRequirement({ name: '', isMandatory: false });
    };

    const handleAddProgram = () => {
        if (!newProgram.name) return;
        setPrograms(prev => [...prev, newProgram]);
        setNewProgram({ name: '', level: '', fee: '', currency: '', language: '', requirements: [] });
    };

    return (
        <Stack spacing="xl">
            <Paper shadow="md" p="lg" radius="md" withBorder>
                <Title order={5} mb="md" c="#1971c2">
                    Add University
                </Title>
                <Stack>
                    <TextInput label="Name" value={university.name} onChange={(e) => setUniversity({ ...university, name: e.target.value })} />
                    <TextInput label="Address" value={university.address} onChange={(e) => setUniversity({ ...university, address: e.target.value })} />
                    <TextInput label="Country" value={university.country} onChange={(e) => setUniversity({ ...university, country: e.target.value })} />
                    <TextInput label="Website" value={university.website} onChange={(e) => setUniversity({ ...university, website: e.target.value })} />
                </Stack>
            </Paper>

            <Paper shadow="md" p="lg" radius="md" withBorder>
                <Title order={5} mb="md" c="#1971c2">
                    Add Programs
                </Title>
                <Stack>
                    <TextInput label="Program Name" value={newProgram.name} onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })} />
                    <TextInput label="Level" value={newProgram.level} onChange={(e) => setNewProgram({ ...newProgram, level: e.target.value })} />
                    <TextInput label="Fee" value={newProgram.fee} onChange={(e) => setNewProgram({ ...newProgram, fee: e.target.value })} />
                    <TextInput label="Currency" value={newProgram.currency} onChange={(e) => setNewProgram({ ...newProgram, currency: e.target.value })} />
                    <TextInput label="Language" value={newProgram.language} onChange={(e) => setNewProgram({ ...newProgram, language: e.target.value })} />

                    <Group align="end" grow>
                        <TextInput label="Requirement" value={newRequirement.name} onChange={(e) => setNewRequirement({ ...newRequirement, name: e.target.value })} />
                        <Checkbox label="Mandatory" checked={newRequirement.isMandatory} onChange={(e) => setNewRequirement({ ...newRequirement, isMandatory: e.currentTarget.checked })} />
                        <Button color="blue" leftSection={<IconPlus size={16} />} onClick={handleAddRequirement}>
                            Add Requirements
                        </Button>
                    </Group>

                    {newProgram.requirements.length > 0 && (
                        <Table striped withTableBorder highlightOnHover mt="md">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Mandatory</Table.Th>
                                    <Table.Th>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {newProgram.requirements.map((req, idx) => (
                                    <Table.Tr key={idx}>
                                        <Table.Td>{req.name}</Table.Td>
                                        <Table.Td>{req.isMandatory ? 'Yes' : 'No'}</Table.Td>
                                        <Table.Td>
                                            <ActionIcon color="red" variant="subtle" onClick={() => {
                                                setNewProgram(prev => ({
                                                    ...prev,
                                                    requirements: prev.requirements.filter((_, i) => i !== idx)
                                                }));
                                            }}>
                                                <IconTrash size={16} />
                                            </ActionIcon>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    )}

                    <Group justify="flex-end">
                        <Button color="blue" onClick={handleAddProgram} leftSection={<IconPlus size={16} />}>
                            Add Program
                        </Button>
                    </Group>
                </Stack>
            </Paper>

            {programs.length > 0 && (
                <Paper shadow="sm" p="lg" radius="md" withBorder>
                    <Title order={5} mb="md" c="#1971c2">
                        Program List
                    </Title>
                    <Table striped withTableBorder highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Level</Table.Th>
                                <Table.Th>Fee</Table.Th>
                                <Table.Th>Language</Table.Th>
                                <Table.Th>Requirements</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {programs.map((program, i) => (
                                <Table.Tr key={i}>
                                    <Table.Td>{program.name}</Table.Td>
                                    <Table.Td>{program.level}</Table.Td>
                                    <Table.Td>{program.fee} {program.currency}</Table.Td>
                                    <Table.Td>{program.language}</Table.Td>
                                    <Table.Td>
                                        <ul style={{ margin: 0, paddingLeft: rem(16) }}>
                                            {program.requirements.map((r, idx) => (
                                                <li key={idx}>{r.name} {r.isMandatory ? '(M)' : ''}</li>
                                            ))}
                                        </ul>
                                    </Table.Td>
                                    <Table.Td>
                                        <ActionIcon variant="subtle" color="blue"><IconEdit size={16} /></ActionIcon>
                                        <ActionIcon variant="subtle" color="red" onClick={() => setPrograms(p => p.filter((_, idx) => idx !== i))}><IconTrash size={16} /></ActionIcon>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            )}

            <Group justify="flex-end" mt="lg">
                <Button variant="filled" color="blue">Submit</Button>
            </Group>
        </Stack>
    );
}
